"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const boom_1 = tslib_1.__importDefault(require("boom"));
const rison_node_1 = tslib_1.__importDefault(require("rison-node"));
const constants_1 = require("../../common/constants");
const route_config_factories_1 = require("./lib/route_config_factories");
const BASE_GENERATE = `${constants_1.API_BASE_URL}/generate`;
function registerGenerate(server, handler, handleError) {
    const getRouteConfig = route_config_factories_1.getRouteConfigFactoryReportingPre(server);
    // generate report
    server.route({
        path: `${BASE_GENERATE}/{exportType}`,
        method: 'POST',
        config: getRouteConfig(request => request.params.exportType),
        handler: async (request, h) => {
            const { exportType } = request.params;
            let response;
            try {
                // @ts-ignore
                const jobParams = rison_node_1.default.decode(request.query.jobParams);
                response = await handler(exportType, jobParams, request, h);
            }
            catch (err) {
                throw handleError(exportType, err);
            }
            return response;
        },
    });
    // show error about GET method to user
    server.route({
        path: `${BASE_GENERATE}/{p*}`,
        method: 'GET',
        config: getRouteConfig(),
        handler: () => {
            const err = boom_1.default.methodNotAllowed('GET is not allowed');
            err.output.headers.allow = 'POST';
            return err;
        },
    });
}
exports.registerGenerate = registerGenerate;
