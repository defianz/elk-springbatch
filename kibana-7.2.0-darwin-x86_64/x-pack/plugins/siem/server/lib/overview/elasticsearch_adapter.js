"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fp_1 = require("lodash/fp");
const query_dsl_1 = require("./query.dsl");
class ElasticsearchOverviewAdapter {
    constructor(framework) {
        this.framework = framework;
    }
    async getOverviewNetwork(request, options) {
        const response = await this.framework.callWithRequest(request, 'search', query_dsl_1.buildOverviewNetworkQuery(options));
        return {
            auditbeatSocket: fp_1.getOr(null, 'aggregations.unique_socket_count.doc_count', response),
            filebeatCisco: fp_1.getOr(null, 'aggregations.unique_filebeat_count.unique_cisco_count.doc_count', response),
            filebeatNetflow: fp_1.getOr(null, 'aggregations.unique_filebeat_count.unique_netflow_count.doc_count', response),
            filebeatPanw: fp_1.getOr(null, 'aggregations.unique_filebeat_count.unique_panw_count.doc_count', response),
            filebeatSuricata: fp_1.getOr(null, 'aggregations.unique_suricata_count.doc_count', response),
            filebeatZeek: fp_1.getOr(null, 'aggregations.unique_zeek_count.doc_count', response),
            packetbeatDNS: fp_1.getOr(null, 'aggregations.unique_dns_count.doc_count', response),
            packetbeatFlow: fp_1.getOr(null, 'aggregations.unique_flow_count.doc_count', response),
            packetbeatTLS: fp_1.getOr(null, 'aggregations.unique_packetbeat_count.unique_tls_count.doc_count', response),
        };
    }
    async getOverviewHost(request, options) {
        const response = await this.framework.callWithRequest(request, 'search', query_dsl_1.buildOverviewHostQuery(options));
        return {
            auditbeatAuditd: fp_1.getOr(null, 'aggregations.auditd_count.doc_count', response),
            auditbeatFIM: fp_1.getOr(null, 'aggregations.fim_count.doc_count', response),
            auditbeatLogin: fp_1.getOr(null, 'aggregations.system_module.login_count.doc_count', response),
            auditbeatPackage: fp_1.getOr(null, 'aggregations.system_module.package_count.doc_count', response),
            auditbeatProcess: fp_1.getOr(null, 'aggregations.system_module.process_count.doc_count', response),
            auditbeatUser: fp_1.getOr(null, 'aggregations.system_module.user_count.doc_count', response),
            filebeatSystemModule: fp_1.getOr(null, 'aggregations.system_module.filebeat_count.doc_count', response),
            winlogbeat: fp_1.getOr(null, 'aggregations.winlog_count.doc_count', response),
        };
    }
}
exports.ElasticsearchOverviewAdapter = ElasticsearchOverviewAdapter;
