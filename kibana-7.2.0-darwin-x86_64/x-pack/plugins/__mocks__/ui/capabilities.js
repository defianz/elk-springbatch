"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
let internals = {
    navLinks: {},
    management: {},
    catalogue: {},
    spaces: {
        manage: true,
    },
};
exports.capabilities = {
    get: () => new Proxy({}, {
        get: (target, property) => {
            return internals[String(property)];
        },
    }),
};
function setMockCapabilities(mockCapabilities) {
    internals = mockCapabilities;
}
exports.setMockCapabilities = setMockCapabilities;
