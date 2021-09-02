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
exports.toNumberArrayScalar = new graphql_1.GraphQLScalarType({
    name: 'NumberArray',
    description: 'Represents value in detail item from the timeline who wants to more than one type',
    serialize(value) {
        if (value == null) {
            return null;
        }
        else if (Array.isArray(value)) {
            return convertArrayToNumber(value);
        }
        else if (fp_1.isBoolean(value) || fp_1.isString(value) || fp_1.isObject(value)) {
            return [convertToNumber(value)];
        }
        return [value];
    },
    parseValue(value) {
        return value;
    },
    parseLiteral(ast) {
        switch (ast.kind) {
            case graphql_1.Kind.INT:
                return ast.value;
            case graphql_1.Kind.FLOAT:
                return ast.value;
            case graphql_1.Kind.STRING:
                return parseFloat(ast.value);
            case graphql_1.Kind.LIST:
                return ast.values;
            case graphql_1.Kind.OBJECT:
                return ast.fields;
        }
        return null;
    },
});
exports.createScalarToNumberArrayValueResolvers = () => ({
    ToNumberArray: exports.toNumberArrayScalar,
});
const convertToNumber = (value) => {
    if (fp_1.isNumber(value)) {
        return value;
    }
    else if (fp_1.isString(value)) {
        return parseFloat(value);
    }
    else {
        return NaN;
    }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convertArrayToNumber = (values) => {
    if (Array.isArray(values)) {
        return values.filter(item => item != null).map(item => convertArrayToNumber(item));
    }
    return convertToNumber(values);
};
