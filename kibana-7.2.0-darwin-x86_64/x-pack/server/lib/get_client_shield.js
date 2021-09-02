"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
// @ts-ignore
const esjs_shield_plugin_1 = tslib_1.__importDefault(require("./esjs_shield_plugin"));
exports.getClient = lodash_1.once((server) => {
    return server.plugins.elasticsearch.createCluster('security', { plugins: [esjs_shield_plugin_1.default] });
});
