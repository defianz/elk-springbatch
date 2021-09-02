"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const create_options_1 = require("../../utils/build_query/create_options");
exports.createKpiHostsResolvers = (libs) => ({
    Source: {
        async KpiHosts(source, args, { req }, info) {
            const options = { ...create_options_1.createOptions(source, args, info) };
            return libs.kpiHosts.getKpiHosts(req, options);
        },
    },
});
