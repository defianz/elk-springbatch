"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const querystring_1 = tslib_1.__importDefault(require("querystring"));
const constants_1 = require("../../common/constants");
const route_config_factories_1 = require("./lib/route_config_factories");
const getStaticFeatureConfig = (getRouteConfig, featureId) => getRouteConfig(() => featureId);
const BASE_GENERATE = `${constants_1.API_BASE_URL}/generate`;
function registerLegacy(server, handler, handleError) {
    const getRouteConfig = route_config_factories_1.getRouteConfigFactoryReportingPre(server);
    function createLegacyPdfRoute({ path, objectType }) {
        const exportTypeId = 'printablePdf';
        server.route({
            path,
            method: 'POST',
            config: getStaticFeatureConfig(getRouteConfig, exportTypeId),
            handler: async (request, h) => {
                const message = `The following URL is deprecated and will stop working in the next major version: ${request.url.path}`;
                server.log(['warning', 'reporting', 'deprecation'], message);
                try {
                    const savedObjectId = request.params.savedId;
                    const queryString = querystring_1.default.stringify(request.query);
                    return await handler(exportTypeId, {
                        objectType,
                        savedObjectId,
                        queryString,
                    }, request, h);
                }
                catch (err) {
                    throw handleError(exportTypeId, err);
                }
            },
        });
    }
    createLegacyPdfRoute({
        path: `${BASE_GENERATE}/visualization/{savedId}`,
        objectType: 'visualization',
    });
    createLegacyPdfRoute({
        path: `${BASE_GENERATE}/search/{savedId}`,
        objectType: 'search',
    });
    createLegacyPdfRoute({
        path: `${BASE_GENERATE}/dashboard/{savedId}`,
        objectType: 'dashboard',
    });
}
exports.registerLegacy = registerLegacy;
