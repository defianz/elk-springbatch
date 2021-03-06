"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const header_png_1 = tslib_1.__importDefault(require("./header.png"));
exports.dropdownFilter = () => ({
    name: 'dropdown_filter',
    displayName: 'Dropdown filter',
    tags: ['filter'],
    help: 'A dropdown from which you can select values for an "exactly" filter',
    image: header_png_1.default,
    height: 50,
    expression: `demodata
| dropdownControl valueColumn=project filterColumn=project | render`,
    filter: '',
});
