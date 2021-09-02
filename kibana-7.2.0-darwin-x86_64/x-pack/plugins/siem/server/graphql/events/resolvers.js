"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const create_options_1 = require("../../utils/build_query/create_options");
exports.createEventsResolvers = (libs) => ({
    Source: {
        async Events(source, args, { req }, info) {
            const options = create_options_1.createOptions(source, args, info);
            return libs.events.getEvents(req, options);
        },
        async Timeline(source, args, { req }, info) {
            const options = create_options_1.createOptions(source, args, info, 'edges.node.ecs.');
            return libs.events.getTimelineData(req, {
                ...options,
                fieldRequested: args.fieldRequested,
            });
        },
        async TimelineDetails(source, args, { req }) {
            return libs.events.getTimelineDetails(req, {
                indexName: args.indexName,
                eventId: args.eventId,
                defaultIndex: args.defaultIndex,
            });
        },
        async LastEventTime(source, args, { req }) {
            const options = {
                defaultIndex: args.defaultIndex,
                sourceConfiguration: source.configuration,
                indexKey: args.indexKey,
                details: args.details,
            };
            return libs.events.getLastEventTimeData(req, options);
        },
    },
});
/*
 *  serialize: gets invoked when serializing the result to send it back to a client.
 *
 *  parseValue: gets invoked to parse client input that was passed through variables.
 *
 *  parseLiteral: gets invoked to parse client input that was passed inline in the query.
 */
const esValueScalar = new graphql_1.GraphQLScalarType({
    name: 'DetailItemValue',
    description: 'Represents value in detail item from the timeline who wants to more than one type',
    serialize(value) {
        return value;
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
exports.createEsValueResolvers = () => ({ EsValue: esValueScalar });
