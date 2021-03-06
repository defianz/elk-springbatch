"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fonts_1 = require("../../../common/lib/fonts");
const header_png_1 = tslib_1.__importDefault(require("./header.png"));
exports.metric = () => ({
    name: 'metric',
    displayName: 'Metric',
    tags: ['text'],
    help: 'A number with a label',
    width: 200,
    height: 100,
    image: header_png_1.default,
    expression: `filters
| demodata
| math "unique(country)"
| metric "Countries" 
  metricFont={font size=48 family="${fonts_1.openSans.value}" color="#000000" align="center" lHeight=48} 
  labelFont={font size=14 family="${fonts_1.openSans.value}" color="#000000" align="center"}
| render`,
});
