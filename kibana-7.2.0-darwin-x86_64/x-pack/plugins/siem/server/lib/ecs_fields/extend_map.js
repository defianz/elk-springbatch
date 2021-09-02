"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendMap = (path, map) => Object.entries(map).reduce((accum, [key, value]) => {
    accum[`${path}.${key}`] = `${path}.${value}`;
    return accum;
}, {});
