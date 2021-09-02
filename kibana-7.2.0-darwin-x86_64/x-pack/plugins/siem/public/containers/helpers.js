"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fp_1 = require("lodash/fp");
exports.createFilter = (filterQuery) => fp_1.isString(filterQuery) ? filterQuery : JSON.stringify(filterQuery);
exports.getDefaultFetchPolicy = () => 'cache-and-network';
