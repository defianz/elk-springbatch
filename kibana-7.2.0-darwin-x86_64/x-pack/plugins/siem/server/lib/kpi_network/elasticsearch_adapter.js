"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fp_1 = require("lodash/fp");
const query_dns_dsl_1 = require("./query_dns.dsl");
const query_general_dsl_1 = require("./query_general.dsl");
const query_tls_handshakes_dsl_1 = require("./query_tls_handshakes.dsl");
const query_unique_private_ips_dsl_1 = require("./query_unique_private_ips.dsl");
class ElasticsearchKpiNetworkAdapter {
    constructor(framework) {
        this.framework = framework;
    }
    async getKpiNetwork(request, options) {
        const generalQuery = query_general_dsl_1.buildGeneralQuery(options);
        const uniqueSourcePrivateIpsQuery = query_unique_private_ips_dsl_1.buildUniquePrvateIpQuery('source', options);
        const uniqueDestinationPrivateIpsQuery = query_unique_private_ips_dsl_1.buildUniquePrvateIpQuery('destination', options);
        const dnsQuery = query_dns_dsl_1.buildDnsQuery(options);
        const tlsHandshakesQuery = query_tls_handshakes_dsl_1.buildTlsHandshakeQuery(options);
        const response = await this.framework.callWithRequest(request, 'msearch', {
            body: [
                ...generalQuery,
                ...uniqueSourcePrivateIpsQuery,
                ...uniqueDestinationPrivateIpsQuery,
                ...dnsQuery,
                ...tlsHandshakesQuery,
            ],
        });
        return {
            networkEvents: fp_1.getOr(null, 'responses.0.hits.total.value', response),
            uniqueFlowId: fp_1.getOr(null, 'responses.0.aggregations.unique_flow_id.value', response),
            activeAgents: fp_1.getOr(null, 'responses.0.aggregations.active_agents.value', response),
            uniqueSourcePrivateIps: fp_1.getOr(null, 'responses.1.aggregations.unique_private_ips.value', response),
            uniqueDestinationPrivateIps: fp_1.getOr(null, 'responses.2.aggregations.unique_private_ips.value', response),
            dnsQueries: fp_1.getOr(null, 'responses.3.hits.total.value', response),
            tlsHandshakes: fp_1.getOr(null, 'responses.4.hits.total.value', response),
        };
    }
}
exports.ElasticsearchKpiNetworkAdapter = ElasticsearchKpiNetworkAdapter;
