"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const create_options_1 = require("../../utils/build_query/create_options");
exports.createIpDetailsResolvers = (libs) => ({
    Source: {
        async IpOverview(source, args, { req }, info) {
            const options = { ...create_options_1.createOptions(source, args, info), ip: args.ip };
            return libs.ipDetails.getIpOverview(req, options);
        },
        async Domains(source, args, { req }, info) {
            const options = {
                ...create_options_1.createOptions(source, args, info),
                ip: args.ip,
                domainsSortField: args.sort,
                flowTarget: args.flowTarget,
                flowDirection: args.flowDirection,
            };
            return libs.ipDetails.getDomains(req, options);
        },
        async Tls(source, args, { req }, info) {
            const options = {
                ...create_options_1.createOptions(source, args, info),
                ip: args.ip,
                tlsSortField: args.sort,
                flowTarget: args.flowTarget,
            };
            return libs.ipDetails.getTls(req, options);
        },
        async DomainFirstLastSeen(source, args, { req }) {
            const options = {
                sourceConfiguration: source.configuration,
                ip: args.ip,
                domainName: args.domainName,
                flowTarget: args.flowTarget,
                defaultIndex: args.defaultIndex,
            };
            return libs.ipDetails.getDomainFirstLastSeen(req, options);
        },
        async Users(source, args, { req }, info) {
            const options = {
                ...create_options_1.createOptions(source, args, info),
                ip: args.ip,
                usersSortField: args.sort,
                flowTarget: args.flowTarget,
            };
            return libs.ipDetails.getUsers(req, options);
        },
    },
});
