"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const header_png_1 = tslib_1.__importDefault(require("./header.png"));
exports.horizontalBarChart = () => ({
    name: 'horizontalBarChart',
    displayName: 'Horizontal bar chart',
    tags: ['chart'],
    help: 'A customizable horizontal bar chart',
    image: header_png_1.default,
    expression: `filters
| demodata
| pointseries x="size(cost)" y="project" color="project"
| plot defaultStyle={seriesStyle bars=0.75 horizontalBars=true} legend=false
| render`,
});
