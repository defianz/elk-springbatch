"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const usage_collector_1 = require("../../usage/usage_collector");
const serialized_query_1 = require("../../utils/serialized_query");
exports.createSnapshotResolvers = (libs) => ({
    InfraSource: {
        async snapshot(source, args) {
            return {
                source,
                timerange: args.timerange,
                filterQuery: args.filterQuery,
            };
        },
    },
    InfraSnapshotResponse: {
        async nodes(snapshotResponse, args, { req }) {
            const { source, timerange, filterQuery } = snapshotResponse;
            usage_collector_1.UsageCollector.countNode(args.type);
            const options = {
                filterQuery: serialized_query_1.parseFilterQuery(filterQuery),
                nodeType: args.type,
                groupBy: args.groupBy,
                sourceConfiguration: source.configuration,
                metric: args.metric,
                timerange,
            };
            return await libs.snapshot.getNodes(req, options);
        },
    },
});
