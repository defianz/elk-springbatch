"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../../graphql/types");
const FIELDS = {
    [types_1.InfraNodeType.host]: 'system.load.5',
    [types_1.InfraNodeType.pod]: '',
    [types_1.InfraNodeType.container]: '',
};
exports.load = (nodeType) => {
    const field = FIELDS[nodeType];
    if (field) {
        return { load: { avg: { field } } };
    }
};
