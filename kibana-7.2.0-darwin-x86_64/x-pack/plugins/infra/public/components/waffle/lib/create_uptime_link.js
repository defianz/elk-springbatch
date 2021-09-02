"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const types_1 = require("../../../graphql/types");
const BASE_URL = '../app/uptime#/?search=';
exports.createUptimeLink = (options, nodeType, node) => {
    if (nodeType === types_1.InfraNodeType.host && node.ip) {
        return `${BASE_URL}host.ip:"${node.ip}"`;
    }
    const field = lodash_1.get(options, ['fields', nodeType], '');
    return `${BASE_URL}${field ? field + ':' : ''}"${node.id}"`;
};
