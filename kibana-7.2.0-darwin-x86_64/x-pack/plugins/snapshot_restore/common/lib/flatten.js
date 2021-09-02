"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatten = (source, path = []) => {
    if (!(source instanceof Object)) {
        return {
            [path.join('.')]: source,
        };
    }
    return Object.keys(source).reduce((result, key) => {
        const flattened = exports.flatten(source[key], [...path, key]);
        return {
            ...result,
            ...flattened,
        };
    }, {});
};
