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
const get_environments_1 = require("../lib/ui_filters/get_environments");
const defaultErrorHandler = (err) => {
    // eslint-disable-next-line
    console.error(err.stack);
    throw boom_1.default.boomify(err, { statusCode: 400 });
};
function initUIFiltersApi(core) {
    const { server } = core.http;
    server.route({
        method: 'GET',
        path: '/api/apm/ui_filters/environments',
        options: {
            validate: {
                query: input_validation_1.withDefaultValidators({
                    serviceName: joi_1.default.string()
                })
            },
            tags: ['access:apm']
        },
        handler: req => {
            const setup = setup_request_1.setupRequest(req);
            const { serviceName } = req.query;
            return get_environments_1.getEnvironments(setup, serviceName).catch(defaultErrorHandler);
        }
    });
}
exports.initUIFiltersApi = initUIFiltersApi;
