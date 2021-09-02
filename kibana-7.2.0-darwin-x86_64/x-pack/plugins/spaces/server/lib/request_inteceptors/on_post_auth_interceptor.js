"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const boom_1 = tslib_1.__importDefault(require("boom"));
const errors_1 = require("../errors");
const get_space_selector_url_1 = require("../get_space_selector_url");
const spaces_url_parser_1 = require("../spaces_url_parser");
function initSpacesOnPostAuthRequestInterceptor(server) {
    const serverBasePath = server.config().get('server.basePath');
    const xpackMainPlugin = server.plugins.xpack_main;
    server.ext('onPostAuth', async function spacesOnPostAuthHandler(request, h) {
        const path = request.path;
        const isRequestingKibanaRoot = path === '/';
        const isRequestingApplication = path.startsWith('/app');
        // if requesting the application root, then show the Space Selector UI to allow the user to choose which space
        // they wish to visit. This is done "onPostAuth" to allow the Saved Objects Client to use the request's auth scope,
        // which is not available at the time of "onRequest".
        if (isRequestingKibanaRoot) {
            try {
                const spacesClient = server.plugins.spaces.spacesClient.getScopedClient(request);
                const spaces = await spacesClient.getAll();
                const config = server.config();
                const basePath = config.get('server.basePath');
                const defaultRoute = config.get('server.defaultRoute');
                if (spaces.length === 1) {
                    // If only one space is available, then send user there directly.
                    // No need for an interstitial screen where there is only one possible outcome.
                    const space = spaces[0];
                    const destination = spaces_url_parser_1.addSpaceIdToPath(basePath, space.id, defaultRoute);
                    return h.redirect(destination).takeover();
                }
                if (spaces.length > 0) {
                    // render spaces selector instead of home page
                    const app = server.getHiddenUiAppById('space_selector');
                    return (await h.renderApp(app, { spaces })).takeover();
                }
            }
            catch (error) {
                return errors_1.wrapError(error);
            }
        }
        // This condition should only happen after selecting a space, or when transitioning from one application to another
        // e.g.: Navigating from Dashboard to Timelion
        if (isRequestingApplication) {
            let spaceId = '';
            let space;
            try {
                const spacesClient = server.plugins.spaces.spacesClient.getScopedClient(request);
                spaceId = spaces_url_parser_1.getSpaceIdFromPath(request.getBasePath(), serverBasePath);
                server.log(['spaces', 'debug'], `Verifying access to space "${spaceId}"`);
                space = await spacesClient.get(spaceId);
            }
            catch (error) {
                server.log(['spaces', 'error'], `Unable to navigate to space "${spaceId}", redirecting to Space Selector. ${error}`);
                // Space doesn't exist, or user not authorized for space, or some other issue retrieving the active space.
                return h.redirect(get_space_selector_url_1.getSpaceSelectorUrl(server.config())).takeover();
            }
            // Verify application is available in this space
            // The management page is always visible, so we shouldn't be restricting access to the kibana application in any situation.
            const appId = path.split('/', 3)[2];
            if (appId !== 'kibana' && space && space.disabledFeatures.length > 0) {
                server.log(['spaces', 'debug'], `Verifying application is available: "${appId}"`);
                const allFeatures = xpackMainPlugin.getFeatures();
                const isRegisteredApp = allFeatures.some(feature => feature.app.includes(appId));
                if (isRegisteredApp) {
                    const enabledFeatures = allFeatures.filter(feature => !space.disabledFeatures.includes(feature.id));
                    const isAvailableInSpace = enabledFeatures.some(feature => feature.app.includes(appId));
                    if (!isAvailableInSpace) {
                        server.log(['spaces', 'error'], `App ${appId} is not enabled within space "${spaceId}".`);
                        return boom_1.default.notFound();
                    }
                }
            }
        }
        return h.continue;
    });
}
exports.initSpacesOnPostAuthRequestInterceptor = initSpacesOnPostAuthRequestInterceptor;
