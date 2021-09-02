"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
function mockAuthenticationProviderOptions(providerOptions = {}) {
    return {
        hostname: 'test-hostname',
        port: 1234,
        protocol: 'test-protocol',
        client: { callWithRequest: sinon_1.stub(), callWithInternalUser: sinon_1.stub() },
        log: sinon_1.stub(),
        basePath: '/base-path',
        ...providerOptions,
    };
}
exports.mockAuthenticationProviderOptions = mockAuthenticationProviderOptions;
