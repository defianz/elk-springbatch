"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_errors_1 = require("apollo-server-errors");
const fp_1 = require("lodash/fp");
exports.parseFilterQuery = (filterQuery) => {
    try {
        if (filterQuery && fp_1.isString(filterQuery) && !fp_1.isEmpty(filterQuery)) {
            const parsedFilterQuery = JSON.parse(filterQuery);
            if (!parsedFilterQuery ||
                !fp_1.isPlainObject(parsedFilterQuery) ||
                Array.isArray(parsedFilterQuery)) {
                throw new Error('expected value to be an object');
            }
            return parsedFilterQuery;
        }
        return {};
    }
    catch (err) {
        throw new apollo_server_errors_1.UserInputError(`Failed to parse query: ${err}`, {
            query: filterQuery,
            originalError: err,
        });
    }
};
