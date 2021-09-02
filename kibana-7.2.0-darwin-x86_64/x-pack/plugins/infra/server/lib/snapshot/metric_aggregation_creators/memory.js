"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../../graphql/types");
const FIELDS = {
    [types_1.InfraNodeType.host]: 'system.memory.actual.used.pct',
    [types_1.InfraNodeType.pod]: 'kubernetes.pod.memory.usage.node.pct',
    [types_1.InfraNodeType.container]: 'docker.memory.usage.pct',
};
exports.memory = (nodeType) => {
    return { memory: { avg: { field: FIELDS[nodeType] } } };
};
