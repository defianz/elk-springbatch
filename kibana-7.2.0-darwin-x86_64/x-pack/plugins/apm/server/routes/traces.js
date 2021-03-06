"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const boom_1 = tslib_1.__importDefault(require("boom"));
const input_validation_1 = require("../lib/helpers/input_validation");
const setup_request_1 = require("../lib/helpers/setup_request");
const get_top_traces_1 = require("../lib/traces/get_top_traces");
const get_trace_1 = require("../lib/traces/get_trace");
const ROOT = '/api/apm/traces';
const defaultErrorHandler = (err) => {
    // eslint-disable-next-line
    console.error(err.stack);
    throw boom_1.default.boomify(err, { statusCode: 400 });
};
function initTracesApi(core) {
    const { server } = core.http;
    // Get trace list
    server.route({
        method: 'GET',
        path: ROOT,
        options: {
            validate: {
                query: input_validation_1.withDefaultValidators()
            },
            tags: ['access:apm']
        },
        handler: req => {
            const setup = setup_request_1.setupRequest(req);
            return get_top_traces_1.getTopTraces(setup).catch(defaultErrorHandler);
        }
    });
    // Get individual trace
    server.route({
        method: 'GET',
        path: `${ROOT}/{traceId}`,
        options: {
            validate: {
                query: input_validation_1.withDefaultValidators()
            },
            tags: ['access:apm']
        },
        handler: req => {
            const { traceId } = req.params;
            const setup = setup_request_1.setupRequest(req);
            return get_trace_1.getTrace(traceId, setup).catch(defaultErrorHandler);
        }
    });
}
exports.initTracesApi = initTracesApi;
