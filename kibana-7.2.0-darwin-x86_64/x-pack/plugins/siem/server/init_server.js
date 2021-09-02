"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const graphql_tools_1 = require("graphql-tools");
const graphql_1 = require("./graphql");
const authentications_1 = require("./graphql/authentications");
const ecs_1 = require("./graphql/ecs");
const events_1 = require("./graphql/events");
const hosts_1 = require("./graphql/hosts");
const ip_details_1 = require("./graphql/ip_details");
const kpi_hosts_1 = require("./graphql/kpi_hosts");
const kpi_network_1 = require("./graphql/kpi_network");
const network_1 = require("./graphql/network");
const note_1 = require("./graphql/note");
const pinned_event_1 = require("./graphql/pinned_event");
const overview_1 = require("./graphql/overview");
const scalar_date_1 = require("./graphql/scalar_date");
const scalar_to_boolean_array_1 = require("./graphql/scalar_to_boolean_array");
const scalar_to_date_array_1 = require("./graphql/scalar_to_date_array");
const scalar_to_number_array_1 = require("./graphql/scalar_to_number_array");
const source_status_1 = require("./graphql/source_status");
const sources_1 = require("./graphql/sources");
const timeline_1 = require("./graphql/timeline");
const uncommon_processes_1 = require("./graphql/uncommon_processes");
const who_am_i_1 = require("./graphql/who_am_i");
exports.initServer = (libs, config) => {
    const schema = graphql_tools_1.makeExecutableSchema({
        resolvers: [
            authentications_1.createAuthenticationsResolvers(libs),
            events_1.createEsValueResolvers(),
            events_1.createEventsResolvers(libs),
            hosts_1.createHostsResolvers(libs),
            ip_details_1.createIpDetailsResolvers(libs),
            kpi_network_1.createKpiNetworkResolvers(libs),
            note_1.createNoteResolvers(libs),
            pinned_event_1.createPinnedEventResolvers(libs),
            sources_1.createSourcesResolvers(libs),
            ecs_1.createScalarToStringArrayValueResolvers(),
            overview_1.createOverviewResolvers(libs),
            network_1.createNetworkResolvers(libs),
            scalar_date_1.createScalarDateResolvers(),
            scalar_to_date_array_1.createScalarToDateArrayValueResolvers(),
            scalar_to_boolean_array_1.createScalarToBooleanArrayValueResolvers(),
            scalar_to_number_array_1.createScalarToNumberArrayValueResolvers(),
            sources_1.createSourcesResolvers(libs),
            source_status_1.createSourceStatusResolvers(libs),
            timeline_1.createTimelineResolvers(libs),
            uncommon_processes_1.createUncommonProcessesResolvers(libs),
            who_am_i_1.createWhoAmIResolvers(),
            kpi_hosts_1.createKpiHostsResolvers(libs),
        ],
        typeDefs: graphql_1.schemas,
    });
    libs.framework.registerGraphQLEndpoint('/api/siem/graphql', schema);
};
