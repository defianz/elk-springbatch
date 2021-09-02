"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: add a comment explaining the purpose of this function
exports.parseAutorefreshInterval = (value, defaultValue) => {
    const parsed = parseInt(value || '', 10);
    return isNaN(parsed) ? defaultValue : parsed;
};
