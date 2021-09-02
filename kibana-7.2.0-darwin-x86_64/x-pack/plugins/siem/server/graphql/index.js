"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const root_1 = require("../../common/graphql/root");
const shared_1 = require("../../common/graphql/shared");
const authentications_1 = require("./authentications");
const ecs_1 = require("./ecs");
const events_1 = require("./events");
const hosts_1 = require("./hosts");
const ip_details_1 = require("./ip_details");
const kpi_hosts_1 = require("./kpi_hosts");
const kpi_network_1 = require("./kpi_network");
const network_1 = require("./network");
const overview_1 = require("./overview");
const scalar_date_1 = require("./scalar_date");
const note_1 = require("./note");
const pinned_event_1 = require("./pinned_event");
const scalar_to_boolean_array_1 = require("./scalar_to_boolean_array");
const scalar_to_date_array_1 = require("./scalar_to_date_array");
const scalar_to_number_array_1 = require("./scalar_to_number_array");
const source_status_1 = require("./source_status");
const sources_1 = require("./sources");
const timeline_1 = require("./timeline");
const uncommon_processes_1 = require("./uncommon_processes");
const who_am_i_1 = require("./who_am_i");
exports.schemas = [
    authentications_1.authenticationsSchema,
    ecs_1.ecsSchema,
    events_1.eventsSchema,
    scalar_date_1.dateSchema,
    scalar_to_number_array_1.toNumberSchema,
    scalar_to_date_array_1.toDateSchema,
    scalar_to_boolean_array_1.toBooleanSchema,
    hosts_1.hostsSchema,
    ...ip_details_1.ipDetailsSchemas,
    kpi_network_1.kpiNetworkSchema,
    kpi_hosts_1.kpiHostsSchema,
    network_1.networkSchema,
    note_1.noteSchema,
    overview_1.overviewSchema,
    pinned_event_1.pinnedEventSchema,
    root_1.rootSchema,
    sources_1.sourcesSchema,
    source_status_1.sourceStatusSchema,
    shared_1.sharedSchema,
    timeline_1.timelineSchema,
    uncommon_processes_1.uncommonProcessesSchema,
    who_am_i_1.whoAmISchema,
];
