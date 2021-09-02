"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fp_1 = require("lodash/fp");
const build_query_1 = require("../../utils/build_query");
const create_options_1 = require("../../utils/build_query/create_options");
exports.createHostsResolvers = (libs) => ({
    Source: {
        async Hosts(source, args, { req }, info) {
            const options = {
                ...create_options_1.createOptions(source, args, info),
                sort: args.sort,
                defaultIndex: args.defaultIndex,
            };
            return libs.hosts.getHosts(req, options);
        },
        async HostOverview(source, args, { req }, info) {
            const fields = build_query_1.getFields(fp_1.getOr([], 'fieldNodes[0]', info));
            const options = {
                defaultIndex: args.defaultIndex,
                sourceConfiguration: source.configuration,
                fields: fields.map(field => field.replace('edges.node.', '')),
                hostName: args.hostName,
                timerange: args.timerange,
            };
            return libs.hosts.getHostOverview(req, options);
        },
        async HostFirstLastSeen(source, args, { req }) {
            const options = {
                sourceConfiguration: source.configuration,
                hostName: args.hostName,
                defaultIndex: args.defaultIndex,
            };
            return libs.hosts.getHostFirstLastSeen(req, options);
        },
    },
});
