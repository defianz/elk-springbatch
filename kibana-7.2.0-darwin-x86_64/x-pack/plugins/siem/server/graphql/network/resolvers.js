"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const create_options_1 = require("../../utils/build_query/create_options");
exports.createNetworkResolvers = (libs) => ({
    Source: {
        async NetworkTopNFlow(source, args, { req }, info) {
            const options = {
                ...create_options_1.createOptions(source, args, info),
                flowTarget: args.flowTarget,
                networkTopNFlowSort: args.sort,
                flowDirection: args.flowDirection,
            };
            return libs.network.getNetworkTopNFlow(req, options);
        },
        async NetworkDns(source, args, { req }, info) {
            const options = {
                ...create_options_1.createOptions(source, args, info),
                networkDnsSortField: args.sort,
                isPtrIncluded: args.isPtrIncluded,
            };
            return libs.network.getNetworkDns(req, options);
        },
    },
});
