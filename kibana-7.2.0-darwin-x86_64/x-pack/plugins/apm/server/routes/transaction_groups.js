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
const charts_1 = require("../lib/transactions/charts");
const distribution_1 = require("../lib/transactions/distribution");
const get_top_transactions_1 = require("../lib/transactions/get_top_transactions");
const defaultErrorHandler = (err) => {
    // eslint-disable-next-line
    console.error(err.stack);
    throw boom_1.default.boomify(err, { statusCode: 400 });
};
function initTransactionGroupsApi(core) {
    const { server } = core.http;
    server.route({
        method: 'GET',
        path: '/api/apm/services/{serviceName}/transaction_groups/{transactionType}',
        options: {
            validate: {
                query: input_validation_1.withDefaultValidators({
                    query: joi_1.default.string()
                })
            },
            tags: ['access:apm']
        },
        handler: req => {
            const { serviceName, transactionType } = req.params;
            const setup = setup_request_1.setupRequest(req);
            return get_top_transactions_1.getTopTransactions({
                serviceName,
                transactionType,
                setup
            }).catch(defaultErrorHandler);
        }
    });
    server.route({
        method: 'GET',
        path: `/api/apm/services/{serviceName}/transaction_groups/{transactionType}/charts`,
        options: {
            validate: {
                query: input_validation_1.withDefaultValidators()
            },
            tags: ['access:apm']
        },
        handler: req => {
            const setup = setup_request_1.setupRequest(req);
            const { serviceName, transactionType } = req.params;
            return charts_1.getChartsData({
                serviceName,
                transactionType,
                setup
            }).catch(defaultErrorHandler);
        }
    });
    server.route({
        method: 'GET',
        path: `/api/apm/services/{serviceName}/transaction_groups/charts`,
        options: {
            validate: {
                query: input_validation_1.withDefaultValidators()
            },
            tags: ['access:apm']
        },
        handler: req => {
            const setup = setup_request_1.setupRequest(req);
            const { serviceName } = req.params;
            return charts_1.getChartsData({
                serviceName,
                setup
            }).catch(defaultErrorHandler);
        }
    });
    server.route({
        method: 'GET',
        path: `/api/apm/services/{serviceName}/transaction_groups/{transactionType}/{transactionName}/charts`,
        options: {
            validate: {
                query: input_validation_1.withDefaultValidators()
            },
            tags: ['access:apm']
        },
        handler: req => {
            const setup = setup_request_1.setupRequest(req);
            const { serviceName, transactionType, transactionName } = req.params;
            return charts_1.getChartsData({
                serviceName,
                transactionType,
                transactionName,
                setup
            }).catch(defaultErrorHandler);
        }
    });
    server.route({
        method: 'GET',
        path: `/api/apm/services/{serviceName}/transaction_groups/{transactionType}/{transactionName}/distribution`,
        options: {
            validate: {
                query: input_validation_1.withDefaultValidators({
                    transactionId: joi_1.default.string().default(''),
                    traceId: joi_1.default.string().default('')
                })
            },
            tags: ['access:apm']
        },
        handler: req => {
            const setup = setup_request_1.setupRequest(req);
            const { serviceName, transactionType, transactionName } = req.params;
            const { transactionId, traceId } = req.query;
            return distribution_1.getDistribution(serviceName, transactionName, transactionType, transactionId, traceId, setup).catch(defaultErrorHandler);
        }
    });
}
exports.initTransactionGroupsApi = initTransactionGroupsApi;
