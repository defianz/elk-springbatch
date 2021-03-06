"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const PathReporter_1 = require("io-ts/lib/PathReporter");
const sources_1 = require("../../lib/sources");
const usage_collector_1 = require("../../usage/usage_collector");
exports.createMetricResolvers = (libs) => ({
    InfraSource: {
        async metrics(source, args, { req }) {
            const sourceConfiguration = sources_1.SourceConfigurationRuntimeType.decode(source.configuration).getOrElseL(errors => {
                throw new Error(PathReporter_1.failure(errors).join('\n'));
            });
            usage_collector_1.UsageCollector.countNode(args.nodeType);
            const options = {
                nodeId: args.nodeId,
                nodeType: args.nodeType,
                timerange: args.timerange,
                metrics: args.metrics,
                sourceConfiguration,
            };
            return libs.metrics.getMetrics(req, options);
        },
    },
});
