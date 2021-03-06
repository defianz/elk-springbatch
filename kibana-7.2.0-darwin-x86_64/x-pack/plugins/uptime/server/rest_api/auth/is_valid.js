"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIsValidRoute = (libs) => ({
    method: 'GET',
    path: '/api/uptime/is_valid',
    handler: async (request) => await libs.auth.requestIsValid(request),
    options: {
        tags: ['access:uptime'],
    },
});
