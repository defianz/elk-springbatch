"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: add a comment explaining the purpose of this function
exports.parseIsPaused = (value, defaultValue) => {
    if (value === 'true') {
        return true;
    }
    if (value === 'false') {
        return false;
    }
    return defaultValue;
};
