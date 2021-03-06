"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const header_png_1 = tslib_1.__importDefault(require("./header.png"));
exports.verticalBarChart = () => ({
    name: 'verticalBarChart',
    displayName: 'Vertical bar chart',
    tags: ['chart'],
    help: 'A customizable vertical bar chart',
    image: header_png_1.default,
    expression: `filters
| demodata
| pointseries x="project" y="size(cost)" color="project"
| plot defaultStyle={seriesStyle bars=0.75} legend=false
| render`,
});
