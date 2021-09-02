"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const querystring_1 = tslib_1.__importDefault(require("querystring"));
const helper_1 = require("../lib/helper");
exports.useUrlParams = (history, location) => {
    const { pathname, search } = location;
    const currentParams = querystring_1.default.parse(search[0] === '?' ? search.slice(1) : search);
    const updateUrl = (updatedParams) => {
        const updatedSearch = querystring_1.default.stringify({ ...currentParams, ...updatedParams });
        history.push({
            pathname,
            search: updatedSearch,
        });
        return `${pathname}?${updatedSearch}`;
    };
    return [helper_1.getSupportedUrlParams(currentParams), updateUrl];
};
