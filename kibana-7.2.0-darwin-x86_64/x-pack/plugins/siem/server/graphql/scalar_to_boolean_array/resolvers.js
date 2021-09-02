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
exports.toBooleanArrayScalar = new graphql_1.GraphQLScalarType({
    name: 'BooleanArray',
    description: 'Represents value in detail item from the timeline who wants to more than one type',
    serialize(value) {
        if (value == null) {
            return null;
        }
        else if (Array.isArray(value)) {
            return convertArrayToBoolean(value);
        }
        else if (fp_1.isString(value) || fp_1.isObject(value) || fp_1.isNumber(value)) {
            return [convertToBoolean(value)];
        }
        return [value];
    },
    parseValue(value) {
        return value;
    },
    parseLiteral(ast) {
        switch (ast.kind) {
            case graphql_1.Kind.BOOLEAN:
                return ast.value;
            case graphql_1.Kind.INT:
                return ast.value;
            case graphql_1.Kind.FLOAT:
                return ast.value;
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
exports.createScalarToBooleanArrayValueResolvers = () => ({
    ToBooleanArray: exports.toBooleanArrayScalar,
});
const convertToBoolean = (value) => {
    if (fp_1.isObject(value)) {
        return false;
    }
    else if (fp_1.isString(value)) {
        return value.toLowerCase() === 'true' || value.toLowerCase() === 't' ? true : false;
    }
    else {
        return Boolean(value);
    }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convertArrayToBoolean = (values) => {
    if (Array.isArray(values)) {
        return values
            .filter(item => item != null)
            .map(item => convertArrayToBoolean(item));
    }
    return convertToBoolean(values);
};
