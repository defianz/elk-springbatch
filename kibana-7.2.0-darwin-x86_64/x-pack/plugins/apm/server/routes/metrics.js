"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const boom_1 = tslib_1.__importDefault(require("boom"));
const joi_1 = tslib_1.__importDefault(require("joi"));
const input_validation_1 = require("../lib/helpers/input_validation");
const setup_request_1 = require("../lib/helpers/setup_request");
const get_metrics_chart_data_by_agent_1 = require("../lib/metrics/get_metrics_chart_data_by_agent");
const defaultErrorHandler = (err) => {
    // eslint-disable-next-line
    console.error(err.stack);
    throw boom_1.default.boomify(err, { statusCode: 400 });
};
function initMetricsApi(core) {
    const { server } = core.http;
    server.route({
        method: 'GET',
        path: `/api/apm/services/{serviceName}/metrics/charts`,
        options: {
            validate: {
                query: input_validation_1.withDefaultValidators({
                    agentName: joi_1.default.string().required()
                })
            },
            tags: ['access:apm']
        },
        handler: async (req) => {
            const setup = setup_request_1.setupRequest(req);
            const { serviceName } = req.params;
            // casting approach recommended here: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/25605
            const { agentName } = req.query;
            return await get_metrics_chart_data_by_agent_1.getMetricsChartDataByAgent({
                setup,
                serviceName,
                agentName
            }).catch(defaultErrorHandler);
        }
    });
}
exports.initMetricsApi = initMetricsApi;
