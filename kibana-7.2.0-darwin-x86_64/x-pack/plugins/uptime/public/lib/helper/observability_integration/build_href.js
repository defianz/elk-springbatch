"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
/**
 * Builds URLs to the designated features by extracting values from the provided
 * monitor object on a given path. Then returns the result of a provided function
 * to place the value in its rightful place on the URI string.
 * @param monitor the data object
 * @param path the location on the object of the desired data
 * @param getHref a function that returns the full URL
 */
exports.buildHref = (monitor, path, getHref) => {
    const queryValue = lodash_1.get(monitor, path);
    if (queryValue === undefined) {
        return undefined;
    }
    return getHref(queryValue);
};
