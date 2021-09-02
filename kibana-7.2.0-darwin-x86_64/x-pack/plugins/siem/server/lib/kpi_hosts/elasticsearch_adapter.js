"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fp_1 = require("lodash/fp");
const query_authentication_dsl_1 = require("./query_authentication.dsl");
const query_general_dsl_1 = require("./query_general.dsl");
class ElasticsearchKpiHostsAdapter {
    constructor(framework) {
        this.framework = framework;
    }
    async getKpiHosts(request, options) {
        const generalQuery = query_general_dsl_1.buildGeneralQuery(options);
        const authQuery = query_authentication_dsl_1.buildAuthQuery(options);
        const response = await this.framework.callWithRequest(request, 'msearch', {
            body: [...generalQuery, ...authQuery],
        });
        return {
            hosts: fp_1.getOr(null, 'responses.0.aggregations.hosts.value', response),
            hostsHistogram: fp_1.getOr(null, 'responses.0.aggregations.hosts_histogram.buckets', response),
            authSuccess: fp_1.getOr(null, 'responses.1.aggregations.authentication_success.doc_count', response),
            authSuccessHistogram: fp_1.getOr(null, 'responses.1.aggregations.authentication_success_histogram.buckets', response),
            authFailure: fp_1.getOr(null, 'responses.1.aggregations.authentication_failure.doc_count', response),
            authFailureHistogram: fp_1.getOr(null, 'responses.1.aggregations.authentication_failure_histogram.buckets', response),
            uniqueSourceIps: fp_1.getOr(null, 'responses.0.aggregations.unique_source_ips.value', response),
            uniqueSourceIpsHistogram: fp_1.getOr(null, 'responses.0.aggregations.unique_source_ips_histogram.buckets', response),
            uniqueDestinationIps: fp_1.getOr(null, 'responses.0.aggregations.unique_destination_ips.value', response),
            uniqueDestinationIpsHistogram: fp_1.getOr(null, 'responses.0.aggregations.unique_destination_ips_histogram.buckets', response),
        };
    }
}
exports.ElasticsearchKpiHostsAdapter = ElasticsearchKpiHostsAdapter;
