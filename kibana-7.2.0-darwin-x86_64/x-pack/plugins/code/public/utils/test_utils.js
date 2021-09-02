"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function createLocation(location) {
    return {
        pathname: '',
        search: '',
        hash: '',
        state: '',
        ...location,
    };
}
exports.createLocation = createLocation;
function createMatch(m) {
    return {
        path: '',
        url: '',
        isExact: true,
        ...m,
    };
}
exports.createMatch = createMatch;
exports.mockFunction = jest.fn();
function createHistory(h) {
    return {
        length: 0,
        push: exports.mockFunction,
        replace: exports.mockFunction,
        go: exports.mockFunction,
        goBack: exports.mockFunction,
        goForward: exports.mockFunction,
        listen: () => exports.mockFunction,
        block: () => exports.mockFunction,
        createHref: exports.mockFunction,
        ...h,
    };
}
exports.createHistory = createHistory;
