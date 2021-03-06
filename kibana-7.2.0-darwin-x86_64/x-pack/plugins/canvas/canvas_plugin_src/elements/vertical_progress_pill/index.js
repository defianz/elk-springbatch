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
exports.verticalProgressPill = () => ({
    name: 'verticalProgressPill',
    displayName: 'Vertical progress pill',
    tags: ['chart', 'proportion'],
    help: 'Displays progress as a portion of a vertical pill',
    width: 80,
    height: 400,
    image: header_png_1.default,
    expression: `filters
| demodata
| math "mean(percent_uptime)"
| progress shape="verticalPill" label={formatnumber 0%} font={font size=24 family="${fonts_1.openSans.value}" color="#000000" align=center}
| render`,
});
