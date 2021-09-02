"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const boom_1 = tslib_1.__importDefault(require("boom"));
const index_pattern_1 = require("../lib/index_pattern");
const ROOT = '/api/apm/index_pattern';
const defaultErrorHandler = (err) => {
    // eslint-disable-next-line
    console.error(err.stack);
    throw boom_1.default.boomify(err, { statusCode: err.status || 500 });
};
function initIndexPatternApi(core) {
    const { server } = core.http;
    server.route({
        method: 'GET',
        path: ROOT,
        options: {
            tags: ['access:apm']
        },
        handler: async (req) => {
            return await index_pattern_1.getIndexPattern(core).catch(defaultErrorHandler);
        }
    });
}
exports.initIndexPatternApi = initIndexPatternApi;
