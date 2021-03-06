"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const kibana_configuration_adapter_1 = require("../adapters/configuration/kibana_configuration_adapter");
const framework_fields_adapter_1 = require("../adapters/fields/framework_fields_adapter");
const kibana_framework_adapter_1 = require("../adapters/framework/kibana_framework_adapter");
const kibana_log_entries_adapter_1 = require("../adapters/log_entries/kibana_log_entries_adapter");
const elasticsearch_metadata_adapter_1 = require("../adapters/metadata/elasticsearch_metadata_adapter");
const kibana_metrics_adapter_1 = require("../adapters/metrics/kibana_metrics_adapter");
const source_status_1 = require("../adapters/source_status");
const fields_domain_1 = require("../domains/fields_domain");
const log_entries_domain_1 = require("../domains/log_entries_domain");
const metadata_domain_1 = require("../domains/metadata_domain");
const metrics_domain_1 = require("../domains/metrics_domain");
const snapshot_1 = require("../snapshot");
const source_status_2 = require("../source_status");
const sources_1 = require("../sources");
function compose(server) {
    const configuration = new kibana_configuration_adapter_1.InfraKibanaConfigurationAdapter(server);
    const framework = new kibana_framework_adapter_1.InfraKibanaBackendFrameworkAdapter(server);
    const sources = new sources_1.InfraSources({
        configuration,
        savedObjects: framework.getSavedObjectsService(),
    });
    const sourceStatus = new source_status_2.InfraSourceStatus(new source_status_1.InfraElasticsearchSourceStatusAdapter(framework), {
        sources,
    });
    const snapshot = new snapshot_1.InfraSnapshot({ sources, framework });
    const domainLibs = {
        metadata: new metadata_domain_1.InfraMetadataDomain(new elasticsearch_metadata_adapter_1.ElasticsearchMetadataAdapter(framework), {
            sources,
        }),
        fields: new fields_domain_1.InfraFieldsDomain(new framework_fields_adapter_1.FrameworkFieldsAdapter(framework), {
            sources,
        }),
        logEntries: new log_entries_domain_1.InfraLogEntriesDomain(new kibana_log_entries_adapter_1.InfraKibanaLogEntriesAdapter(framework), {
            sources,
        }),
        metrics: new metrics_domain_1.InfraMetricsDomain(new kibana_metrics_adapter_1.KibanaMetricsAdapter(framework)),
    };
    const libs = {
        configuration,
        framework,
        snapshot,
        sources,
        sourceStatus,
        ...domainLibs,
    };
    return libs;
}
exports.compose = compose;
