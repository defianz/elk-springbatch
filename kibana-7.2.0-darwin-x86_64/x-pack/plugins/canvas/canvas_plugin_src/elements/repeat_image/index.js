"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const header_png_1 = tslib_1.__importDefault(require("./header.png"));
exports.repeatImage = () => ({
    name: 'repeatImage',
    displayName: 'Image repeat',
    tags: ['graphic', 'proportion'],
    help: 'Repeats an image N times',
    image: header_png_1.default,
    expression: `filters
| demodata
| math "mean(cost)"
| repeatImage image=null
| render`,
});
