"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const ip_to_hostname_1 = require("./routes/ip_to_hostname");
const graphql_1 = require("./graphql");
const log_entries_1 = require("./graphql/log_entries");
const metadata_1 = require("./graphql/metadata");
const resolvers_1 = require("./graphql/metrics/resolvers");
const snapshot_1 = require("./graphql/snapshot");
const source_status_1 = require("./graphql/source_status");
const sources_1 = require("./graphql/sources");
const logging_legacy_1 = require("./logging_legacy");
const metrics_explorer_1 = require("./routes/metrics_explorer");
exports.initInfraServer = (libs) => {
    const schema = graphql_tools_1.makeExecutableSchema({
        resolvers: [
            metadata_1.createMetadataResolvers(libs),
            log_entries_1.createLogEntriesResolvers(libs),
            snapshot_1.createSnapshotResolvers(libs),
            sources_1.createSourcesResolvers(libs),
            source_status_1.createSourceStatusResolvers(libs),
            resolvers_1.createMetricResolvers(libs),
        ],
        typeDefs: graphql_1.schemas,
    });
    libs.framework.registerGraphQLEndpoint('/api/infra/graphql', schema);
    logging_legacy_1.initLegacyLoggingRoutes(libs.framework);
    ip_to_hostname_1.initIpToHostName(libs);
    metrics_explorer_1.initMetricExplorerRoute(libs);
};
