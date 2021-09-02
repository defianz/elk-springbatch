"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
jest.mock('../lib/es_version_precheck');
exports.mockAddDefaultField = jest.fn();
jest.mock('../lib/query_default_field', () => ({
    addDefaultField: exports.mockAddDefaultField,
}));
