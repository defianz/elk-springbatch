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
const get_distribution_1 = require("../lib/errors/distribution/get_distribution");
const get_error_group_1 = require("../lib/errors/get_error_group");
const get_error_groups_1 = require("../lib/errors/get_error_groups");
const input_validation_1 = require("../lib/helpers/input_validation");
const setup_request_1 = require("../lib/helpers/setup_request");
const ROOT = '/api/apm/services/{serviceName}/errors';
const defaultErrorHandler = (err) => {
    // eslint-disable-next-line
    console.error(err.stack);
    throw boom_1.default.boomify(err, { statusCode: 400 });
};
function initErrorsApi(core) {
    const { server } = core.http;
    server.route({
        method: 'GET',
        path: ROOT,
        options: {
            validate: {
                query: input_validation_1.withDefaultValidators({
                    sortField: joi_1.default.string(),
                    sortDirection: joi_1.default.string()
                })
            },
            tags: ['access:apm']
        },
        handler: req => {
            const setup = setup_request_1.setupRequest(req);
            const { serviceName } = req.params;
            const { sortField, sortDirection } = req.query;
            return get_error_groups_1.getErrorGroups({
                serviceName,
                sortField,
                sortDirection,
                setup
            }).catch(defaultErrorHandler);
        }
    });
    server.route({
        method: 'GET',
        path: `${ROOT}/{groupId}`,
        options: {
            validate: {
                query: input_validation_1.withDefaultValidators()
            },
            tags: ['access:apm']
        },
        handler: req => {
            const setup = setup_request_1.setupRequest(req);
            const { serviceName, groupId } = req.params;
            return get_error_group_1.getErrorGroup({ serviceName, groupId, setup }).catch(defaultErrorHandler);
        }
    });
    function distributionHandler(req) {
        const setup = setup_request_1.setupRequest(req);
        const { serviceName, groupId } = req.params;
        return get_distribution_1.getDistribution({ serviceName, groupId, setup }).catch(defaultErrorHandler);
    }
    server.route({
        method: 'GET',
        path: `${ROOT}/{groupId}/distribution`,
        options: {
            validate: {
                query: input_validation_1.withDefaultValidators()
            },
            tags: ['access:apm']
        },
        handler: distributionHandler
    });
    server.route({
        method: 'GET',
        path: `${ROOT}/distribution`,
        options: {
            validate: {
                query: input_validation_1.withDefaultValidators()
            },
            tags: ['access:apm']
        },
        handler: distributionHandler
    });
}
exports.initErrorsApi = initErrorsApi;
