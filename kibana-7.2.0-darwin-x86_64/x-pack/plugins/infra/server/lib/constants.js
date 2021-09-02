"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../graphql/types");
// Used for metadata and snapshots resolvers to find the field that contains
// a displayable name of a node.
// Intentionally not the same as xpack.infra.sources.default.fields.{host,container,pod}.
// TODO: consider moving this to source configuration too.
exports.NAME_FIELDS = {
    [types_1.InfraNodeType.host]: 'host.name',
    [types_1.InfraNodeType.pod]: 'kubernetes.pod.name',
    [types_1.InfraNodeType.container]: 'container.name',
};
exports.IP_FIELDS = {
    [types_1.InfraNodeType.host]: 'host.ip',
    [types_1.InfraNodeType.pod]: 'kubernetes.pod.ip',
    [types_1.InfraNodeType.container]: 'container.ip_address',
};
