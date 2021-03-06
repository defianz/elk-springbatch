"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const boom_1 = tslib_1.__importDefault(require("boom"));
const apm_telemetry_1 = require("../lib/apm_telemetry");
const input_validation_1 = require("../lib/helpers/input_validation");
const setup_request_1 = require("../lib/helpers/setup_request");
const get_service_1 = require("../lib/services/get_service");
const get_services_1 = require("../lib/services/get_services");
const ROOT = '/api/apm/services';
const defaultErrorHandler = (err) => {
    // eslint-disable-next-line
    console.error(err.stack);
    throw boom_1.default.boomify(err, { statusCode: 400 });
};
function initServicesApi(core) {
    const { server } = core.http;
    server.route({
        method: 'GET',
        path: ROOT,
        options: {
            validate: {
                query: input_validation_1.withDefaultValidators()
            },
            tags: ['access:apm']
        },
        handler: async (req) => {
            const setup = setup_request_1.setupRequest(req);
            const services = await get_services_1.getServices(setup).catch(defaultErrorHandler);
            // Store telemetry data derived from services
            const agentNames = services.items.map(({ agentName }) => agentName);
            const apmTelemetry = apm_telemetry_1.createApmTelementry(agentNames);
            apm_telemetry_1.storeApmTelemetry(server, apmTelemetry);
            return services;
        }
    });
    server.route({
        method: 'GET',
        path: `${ROOT}/{serviceName}`,
        options: {
            validate: {
                query: input_validation_1.withDefaultValidators()
            },
            tags: ['access:apm']
        },
        handler: req => {
            const setup = setup_request_1.setupRequest(req);
            const { serviceName } = req.params;
            return get_service_1.getService(serviceName, setup).catch(defaultErrorHandler);
        }
    });
}
exports.initServicesApi = initServicesApi;
