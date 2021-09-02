"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const helpers_1 = require("./helpers");
exports.plainRowRenderer = {
    isInstance: _ => true,
    renderRow: ({ children }) => react_1.default.createElement(helpers_1.Row, null, children),
};
