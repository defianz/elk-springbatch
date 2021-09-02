"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../../graphql/types");
const rate_1 = require("./rate");
const FIELDS = {
    [types_1.InfraNodeType.host]: 'system.network.in.bytes',
    [types_1.InfraNodeType.pod]: 'kubernetes.pod.network.rx.bytes',
    [types_1.InfraNodeType.container]: 'docker.network.in.bytes',
};
exports.rx = rate_1.rate('rx', FIELDS);
