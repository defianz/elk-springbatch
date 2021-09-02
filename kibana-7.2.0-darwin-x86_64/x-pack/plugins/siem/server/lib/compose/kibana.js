"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const authentications_1 = require("../authentications");
const elasticsearch_adapter_1 = require("../authentications/elasticsearch_adapter");
const kibana_configuration_adapter_1 = require("../configuration/kibana_configuration_adapter");
const events_1 = require("../events");
const kibana_framework_adapter_1 = require("../framework/kibana_framework_adapter");
const hosts_1 = require("../hosts");
const kpi_hosts_1 = require("../kpi_hosts");
const elasticsearch_adapter_2 = require("../kpi_hosts/elasticsearch_adapter");
const index_fields_1 = require("../index_fields");
const ip_details_1 = require("../ip_details");
const kpi_network_1 = require("../kpi_network");
const elasticsearch_adapter_3 = require("../kpi_network/elasticsearch_adapter");
const network_1 = require("../network");
const overview_1 = require("../overview");
const elasticsearch_adapter_4 = require("../overview/elasticsearch_adapter");
const source_status_1 = require("../source_status");
const sources_1 = require("../sources");
const uncommon_processes_1 = require("../uncommon_processes");
const saved_object_1 = require("../note/saved_object");
const saved_object_2 = require("../pinned_event/saved_object");
const saved_object_3 = require("../timeline/saved_object");
function compose(server) {
    const configuration = new kibana_configuration_adapter_1.KibanaConfigurationAdapter(server);
    const framework = new kibana_framework_adapter_1.KibanaBackendFrameworkAdapter(server);
    const sources = new sources_1.Sources(new sources_1.ConfigurationSourcesAdapter(configuration));
    const sourceStatus = new source_status_1.SourceStatus(new source_status_1.ElasticsearchSourceStatusAdapter(framework));
    const timeline = new saved_object_3.Timeline({ savedObjects: framework.getSavedObjectsService() });
    const note = new saved_object_1.Note({ savedObjects: framework.getSavedObjectsService() });
    const pinnedEvent = new saved_object_2.PinnedEvent({ savedObjects: framework.getSavedObjectsService() });
    const domainLibs = {
        authentications: new authentications_1.Authentications(new elasticsearch_adapter_1.ElasticsearchAuthenticationAdapter(framework)),
        events: new events_1.Events(new events_1.ElasticsearchEventsAdapter(framework)),
        fields: new index_fields_1.IndexFields(new index_fields_1.ElasticsearchIndexFieldAdapter(framework)),
        hosts: new hosts_1.Hosts(new hosts_1.ElasticsearchHostsAdapter(framework)),
        ipDetails: new ip_details_1.IpDetails(new ip_details_1.ElasticsearchIpOverviewAdapter(framework)),
        kpiHosts: new kpi_hosts_1.KpiHosts(new elasticsearch_adapter_2.ElasticsearchKpiHostsAdapter(framework)),
        kpiNetwork: new kpi_network_1.KpiNetwork(new elasticsearch_adapter_3.ElasticsearchKpiNetworkAdapter(framework)),
        network: new network_1.Network(new network_1.ElasticsearchNetworkAdapter(framework)),
        overview: new overview_1.Overview(new elasticsearch_adapter_4.ElasticsearchOverviewAdapter(framework)),
        uncommonProcesses: new uncommon_processes_1.UncommonProcesses(new uncommon_processes_1.ElasticsearchUncommonProcessesAdapter(framework)),
    };
    const libs = {
        configuration,
        framework,
        sourceStatus,
        sources,
        ...domainLibs,
        timeline,
        note,
        pinnedEvent,
    };
    return libs;
}
exports.compose = compose;
