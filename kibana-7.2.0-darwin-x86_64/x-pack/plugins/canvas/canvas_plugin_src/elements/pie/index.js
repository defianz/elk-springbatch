"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const header_png_1 = tslib_1.__importDefault(require("./header.png"));
exports.pie = () => ({
    name: 'pie',
    displayName: 'Pie chart',
    tags: ['chart', 'proportion'],
    width: 300,
    height: 300,
    help: 'A simple pie chart',
    image: header_png_1.default,
    expression: `filters
| demodata
| pointseries color="state" size="max(price)"
| pie
| render`,
});
