"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fp_1 = require("lodash/fp");
const types_1 = require("../../graphql/types");
const query_dns_dsl_1 = require("./query_dns.dsl");
const query_top_n_flow_dsl_1 = require("./query_top_n_flow.dsl");
class ElasticsearchNetworkAdapter {
    constructor(framework) {
        this.framework = framework;
    }
    async getNetworkTopNFlow(request, options) {
        const response = await this.framework.callWithRequest(request, 'search', query_top_n_flow_dsl_1.buildTopNFlowQuery(options));
        const { cursor, limit } = options.pagination;
        const totalCount = fp_1.getOr(0, 'aggregations.top_n_flow_count.value', response);
        const networkTopNFlowEdges = getTopNFlowEdges(response, options);
        const hasNextPage = networkTopNFlowEdges.length > limit;
        const beginning = cursor != null ? parseInt(cursor, 10) : 0;
        const edges = networkTopNFlowEdges.splice(beginning, limit - beginning);
        return {
            edges,
            totalCount,
            pageInfo: {
                hasNextPage,
                endCursor: {
                    value: String(limit),
                    tiebreaker: null,
                },
            },
        };
    }
    async getNetworkDns(request, options) {
        const response = await this.framework.callWithRequest(request, 'search', query_dns_dsl_1.buildDnsQuery(options));
        const { cursor, limit } = options.pagination;
        const totalCount = fp_1.getOr(0, 'aggregations.dns_count.value', response);
        const networkDnsEdges = formatDnsEdges(fp_1.getOr([], 'aggregations.dns_name_query_count.buckets', response));
        const hasNextPage = networkDnsEdges.length > limit;
        const beginning = cursor != null ? parseInt(cursor, 10) : 0;
        const edges = networkDnsEdges.splice(beginning, limit - beginning);
        return {
            edges,
            totalCount,
            pageInfo: {
                hasNextPage,
                endCursor: {
                    value: String(limit),
                    tiebreaker: null,
                },
            },
        };
    }
}
exports.ElasticsearchNetworkAdapter = ElasticsearchNetworkAdapter;
const getTopNFlowEdges = (response, options) => {
    if (options.flowDirection === types_1.FlowDirection.uniDirectional) {
        return formatTopNFlowEdges(fp_1.getOr([], 'aggregations.top_uni_flow.buckets', response), options.flowTarget);
    }
    return formatTopNFlowEdges(fp_1.getOr([], 'aggregations.top_bi_flow.buckets', response), options.flowTarget);
};
const formatTopNFlowEdges = (buckets, flowTarget) => buckets.map((bucket) => ({
    node: {
        _id: bucket.key,
        timestamp: bucket.timestamp.value_as_string,
        [flowTarget]: {
            count: getOrNumber('ip_count.value', bucket),
            domain: bucket.domain.buckets.map(bucketDomain => bucketDomain.key),
            ip: bucket.key,
        },
        network: {
            bytes: getOrNumber('bytes.value', bucket),
            packets: getOrNumber('packets.value', bucket),
            direction: bucket.direction.buckets.map(bucketDir => bucketDir.key),
        },
    },
    cursor: {
        value: bucket.key,
        tiebreaker: null,
    },
}));
const formatDnsEdges = (buckets) => buckets.map((bucket) => ({
    node: {
        _id: bucket.key,
        timestamp: bucket.timestamp.value_as_string,
        dnsBytesIn: getOrNumber('dns_bytes_in.value', bucket),
        dnsBytesOut: getOrNumber('dns_bytes_out.value', bucket),
        dnsName: bucket.key,
        queryCount: bucket.doc_count,
        uniqueDomains: getOrNumber('unique_domains.value', bucket),
    },
    cursor: {
        value: bucket.key,
        tiebreaker: null,
    },
}));
const getOrNumber = (path, bucket) => {
    const numb = fp_1.get(path, bucket);
    if (numb == null) {
        return null;
    }
    return numb;
};
