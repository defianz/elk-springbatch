"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
exports.dateScalar = new graphql_1.GraphQLScalarType({
    name: 'Date',
    description: 'Represents a Date for either an ES formatted date string or epoch string ISO8601 formatted',
    serialize(value) {
        return Number.isNaN(Date.parse(value)) ? new Date(value).toISOString() : value;
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
exports.createScalarDateResolvers = () => ({
    Date: exports.dateScalar,
});
