"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const fp_1 = require("lodash/fp");
/*
 *  serialize: gets invoked when serializing the result to send it back to a client.
 *
 *  parseValue: gets invoked to parse client input that was passed through variables.
 *
 *  parseLiteral: gets invoked to parse client input that was passed inline in the query.
 */
exports.toDateArrayScalar = new graphql_1.GraphQLScalarType({
    name: 'DateArray',
    description: 'Represents value in detail item from the timeline who wants to more than one type',
    serialize(value) {
        if (value == null) {
            return null;
        }
        else if (Array.isArray(value)) {
            return convertArrayToDate(value);
        }
        else if (fp_1.isBoolean(value) || fp_1.isString(value) || fp_1.isObject(value)) {
            return [convertToDate(value)];
        }
        return [value];
    },
    parseValue(value) {
        return value;
    },
    parseLiteral(ast) {
        switch (ast.kind) {
            case graphql_1.Kind.INT:
                return parseInt(ast.value, 10);
            case graphql_1.Kind.STRING:
                return ast.value;
        }
        return null;
    },
});
exports.createScalarToDateArrayValueResolvers = () => ({
    ToDateArray: exports.toDateArrayScalar,
});
const convertToDate = (value) => {
    if (fp_1.isNumber(value)) {
        return new Date(value).toISOString();
    }
    else if (fp_1.isObject(value)) {
        return 'invalid date';
    }
    else if (fp_1.isString(value) && !isNaN(+value)) {
        return new Date(+value).toISOString();
    }
    else {
        return String(value);
    }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convertArrayToDate = (values) => {
    if (Array.isArray(values)) {
        return values.filter(item => item != null).map(item => convertArrayToDate(item));
    }
    return convertToDate(values);
};
