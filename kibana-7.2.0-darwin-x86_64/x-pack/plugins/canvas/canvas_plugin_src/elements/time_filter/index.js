"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const header_png_1 = tslib_1.__importDefault(require("./header.png"));
exports.timeFilter = () => ({
    name: 'time_filter',
    displayName: 'Time filter',
    tags: ['filter'],
    help: 'Set a time window',
    image: header_png_1.default,
    height: 50,
    expression: `timefilterControl compact=true column=@timestamp
| render`,
    filter: 'timefilter column=@timestamp from=now-24h to=now',
});
