"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
exports.KibanaContext = react_1.default.createContext(null);
function isKibanaContext(arg) {
    return (arg.combinedQuery !== undefined &&
        arg.currentIndexPattern !== undefined &&
        arg.currentSavedSearch !== undefined &&
        arg.indexPatterns !== undefined &&
        typeof arg.kbnBaseUrl === 'string' &&
        arg.kibanaConfig !== undefined);
}
exports.isKibanaContext = isKibanaContext;
