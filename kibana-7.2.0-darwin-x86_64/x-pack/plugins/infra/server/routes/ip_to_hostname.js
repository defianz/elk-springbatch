"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const joi_1 = tslib_1.__importDefault(require("joi"));
const boom_1 = require("boom");
const lodash_1 = require("lodash");
const ipToHostSchema = joi_1.default.object({
    ip: joi_1.default.string().required(),
    index_pattern: joi_1.default.string().required(),
});
exports.initIpToHostName = ({ framework }) => {
    const { callWithRequest } = framework;
    framework.registerRoute({
        method: 'POST',
        path: '/api/infra/ip_to_host',
        options: {
            validate: { payload: ipToHostSchema },
        },
        handler: async (req) => {
            try {
                const params = {
                    index: req.payload.index_pattern,
                    body: {
                        size: 1,
                        query: {
                            match: { 'host.ip': req.payload.ip },
                        },
                        _source: ['host.name'],
                    },
                };
                const response = await callWithRequest(req, 'search', params);
                if (response.hits.total.value === 0) {
                    throw boom_1.notFound('Host with matching IP address not found.');
                }
                const hostDoc = lodash_1.first(response.hits.hits);
                return { host: hostDoc._source.host.name };
            }
            catch (e) {
                throw boom_1.boomify(e);
            }
        },
    });
};
