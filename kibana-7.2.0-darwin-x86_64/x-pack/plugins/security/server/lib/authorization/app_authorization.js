"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const boom_1 = tslib_1.__importDefault(require("boom"));
const lodash_1 = require("lodash");
class ProtectedApplications {
    constructor(xpackMainPlugin) {
        this.xpackMainPlugin = xpackMainPlugin;
        this.applications = null;
    }
    shouldProtect(appId) {
        // Currently, once we get the list of features we essentially "lock" additional
        // features from being added. This is enforced by the xpackMain plugin. As such,
        // we wait until we actually need to consume these before getting them
        if (this.applications == null) {
            this.applications = new Set(lodash_1.flatten(this.xpackMainPlugin.getFeatures().map(feature => feature.app)));
        }
        return this.applications.has(appId);
    }
}
function initAppAuthorization(server, xpackMainPlugin, authorization) {
    const { actions, checkPrivilegesDynamicallyWithRequest, mode } = authorization;
    const protectedApplications = new ProtectedApplications(xpackMainPlugin);
    const log = (msg) => server.log(['security', 'app-authorization', 'debug'], msg);
    server.ext('onPostAuth', async (request, h) => {
        const { path } = request;
        // if the path doesn't start with "/app/", just continue
        if (!path.startsWith('/app/')) {
            return h.continue;
        }
        // if we aren't using RBAC, just continue
        if (!mode.useRbacForRequest(request)) {
            return h.continue;
        }
        const appId = path.split('/', 3)[2];
        if (!protectedApplications.shouldProtect(appId)) {
            log(`not authorizing - "${appId}" isn't a protected application`);
            return h.continue;
        }
        const checkPrivileges = checkPrivilegesDynamicallyWithRequest(request);
        const appAction = actions.app.get(appId);
        const checkPrivilegesResponse = await checkPrivileges(appAction);
        log(`authorizing access to "${appId}"`);
        // we've actually authorized the request
        if (checkPrivilegesResponse.hasAllRequested) {
            log(`authorized for "${appId}"`);
            return h.continue;
        }
        log(`not authorized for "${appId}"`);
        return boom_1.default.notFound();
    });
}
exports.initAppAuthorization = initAppAuthorization;
