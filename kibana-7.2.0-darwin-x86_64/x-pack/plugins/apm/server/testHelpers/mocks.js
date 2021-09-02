"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function getSetupMock(overrides = {}) {
    return {
        client: jest.fn(),
        start: 100,
        end: 200,
        config: {
            get: jest.fn(),
            has: () => true
        },
        uiFiltersES: [
            {
                term: { field: 'test.esfilter.query' }
            }
        ],
        ...overrides
    };
}
exports.getSetupMock = getSetupMock;
