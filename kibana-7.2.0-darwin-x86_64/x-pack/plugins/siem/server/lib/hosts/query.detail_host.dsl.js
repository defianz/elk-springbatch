"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const reduce_fields_1 = require("../../utils/build_query/reduce_fields");
const ecs_fields_1 = require("../ecs_fields");
const helpers_1 = require("./helpers");
exports.buildHostOverviewQuery = ({ fields, hostName, defaultIndex, sourceConfiguration: { fields: { timestamp }, }, timerange: { from, to }, }) => {
    const esFields = reduce_fields_1.reduceFields(fields, { ...ecs_fields_1.hostFieldsMap, ...ecs_fields_1.cloudFieldsMap });
    const filter = [
        { term: { 'host.name': hostName } },
        {
            range: {
                [timestamp]: {
                    gte: from,
                    lte: to,
                },
            },
        },
    ];
    const dslQuery = {
        allowNoIndices: true,
        index: defaultIndex,
        ignoreUnavailable: true,
        body: {
            aggregations: {
                lastSeen: { max: { field: '@timestamp' } },
                ...helpers_1.buildFieldsTermAggregation(esFields.filter(field => !['@timestamp'].includes(field))),
            },
            query: { bool: { filter } },
            size: 0,
            track_total_hits: false,
        },
    };
    return dslQuery;
};
