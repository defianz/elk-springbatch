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
exports.toStringArrayScalar = new graphql_1.GraphQLScalarType({
    name: 'StringArray',
    description: 'Represents value in detail item from the timeline who wants to more than one type',
    serialize(value) {
        if (value == null) {
            return null;
        }
        else if (Array.isArray(value)) {
            return convertArrayToString(value);
        }
        else if (fp_1.isBoolean(value) || fp_1.isNumber(value) || fp_1.isObject(value)) {
            return [convertToString(value)];
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
            case graphql_1.Kind.FLOAT:
                return parseFloat(ast.value);
            case graphql_1.Kind.STRING:
                return ast.value;
            case graphql_1.Kind.LIST:
                return ast.values;
            case graphql_1.Kind.OBJECT:
                return ast.fields;
        }
        return null;
    },
});
exports.createScalarToStringArrayValueResolvers = () => ({
    ToStringArray: exports.toStringArrayScalar,
});
const convertToString = (value) => {
    if (fp_1.isObject(value)) {
        try {
            return JSON.stringify(value);
        }
        catch (_) {
            return 'Invalid Object';
        }
    }
    return value.toString();
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convertArrayToString = (values) => {
    if (Array.isArray(values)) {
        return values.filter(item => item != null).map(item => convertArrayToString(item));
    }
    return convertToString(values);
};
