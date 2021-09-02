"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockCheckPrivilegesWithRequestFactory = jest.fn();
jest.mock('./check_privileges', () => ({
    checkPrivilegesWithRequestFactory: exports.mockCheckPrivilegesWithRequestFactory,
}));
exports.mockCheckPrivilegesDynamicallyWithRequestFactory = jest.fn();
jest.mock('./check_privileges_dynamically', () => ({
    checkPrivilegesDynamicallyWithRequestFactory: exports.mockCheckPrivilegesDynamicallyWithRequestFactory,
}));
exports.mockGetClient = jest.fn();
jest.mock('../../../../../server/lib/get_client_shield', () => ({
    getClient: exports.mockGetClient,
}));
exports.mockActionsFactory = jest.fn();
jest.mock('./actions', () => ({
    actionsFactory: exports.mockActionsFactory,
}));
exports.mockPrivilegesFactory = jest.fn();
jest.mock('./privileges', () => ({
    privilegesFactory: exports.mockPrivilegesFactory,
}));
exports.mockAuthorizationModeFactory = jest.fn();
jest.mock('./mode', () => ({
    authorizationModeFactory: exports.mockAuthorizationModeFactory,
}));
