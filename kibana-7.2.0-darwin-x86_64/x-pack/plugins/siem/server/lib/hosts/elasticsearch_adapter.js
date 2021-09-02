"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fp_1 = require("lodash/fp");
const ecs_fields_1 = require("../ecs_fields");
const query_detail_host_dsl_1 = require("./query.detail_host.dsl");
const query_hosts_dsl_1 = require("./query.hosts.dsl");
const query_last_first_seen_host_dsl_1 = require("./query.last_first_seen_host.dsl");
class ElasticsearchHostsAdapter {
    constructor(framework) {
        this.framework = framework;
    }
    async getHosts(request, options) {
        const response = await this.framework.callWithRequest(request, 'search', query_hosts_dsl_1.buildHostsQuery(options));
        const { cursor, limit } = options.pagination;
        const totalCount = fp_1.getOr(0, 'aggregations.host_count.value', response);
        const buckets = fp_1.getOr([], 'aggregations.host_data.buckets', response);
        const hostsEdges = buckets.map(bucket => exports.formatHostEdgesData(options.fields, bucket));
        const hasNextPage = hostsEdges.length === limit + 1;
        const beginning = cursor != null ? parseInt(cursor, 10) : 0;
        const edges = hostsEdges.splice(beginning, limit - beginning);
        return { edges, totalCount, pageInfo: { hasNextPage, endCursor: { value: String(limit) } } };
    }
    async getHostOverview(request, options) {
        const response = await this.framework.callWithRequest(request, 'search', query_detail_host_dsl_1.buildHostOverviewQuery(options));
        const aggregations = fp_1.get('aggregations', response) || {};
        return { _id: options.hostName, ...formatHostItem(options.fields, aggregations) };
    }
    async getHostFirstLastSeen(request, options) {
        const response = await this.framework.callWithRequest(request, 'search', query_last_first_seen_host_dsl_1.buildLastFirstSeenHostQuery(options));
        const aggregations = fp_1.get('aggregations', response) || {};
        return {
            firstSeen: fp_1.get('firstSeen.value_as_string', aggregations),
            lastSeen: fp_1.get('lastSeen.value_as_string', aggregations),
        };
    }
}
exports.ElasticsearchHostsAdapter = ElasticsearchHostsAdapter;
exports.formatHostEdgesData = (fields, bucket) => fields.reduce((flattenedFields, fieldName) => {
    const hostId = fp_1.get('key', bucket);
    flattenedFields.node._id = hostId || null;
    flattenedFields.cursor.value = hostId || '';
    const fieldValue = getHostFieldValue(fieldName, bucket);
    if (fieldValue != null) {
        return fp_1.set(`node.${fieldName}`, fieldValue, flattenedFields);
    }
    return flattenedFields;
}, {
    node: {},
    cursor: {
        value: '',
        tiebreaker: null,
    },
});
const formatHostItem = (fields, bucket) => fields.reduce((flattenedFields, fieldName) => {
    const fieldValue = getHostFieldValue(fieldName, bucket);
    if (fieldValue != null) {
        return fp_1.set(fieldName, fieldValue, flattenedFields);
    }
    return flattenedFields;
}, {});
const getHostFieldValue = (fieldName, bucket) => {
    const aggField = ecs_fields_1.hostFieldsMap[fieldName]
        ? ecs_fields_1.hostFieldsMap[fieldName].replace(/\./g, '_')
        : fieldName.replace(/\./g, '_');
    if ([
        'host.ip',
        'host.mac',
        'cloud.instance.id',
        'cloud.machine.type',
        'cloud.provider',
        'cloud.region',
    ].includes(fieldName) &&
        fp_1.has(aggField, bucket)) {
        const data = fp_1.get(aggField, bucket);
        return data.buckets.map(obj => obj.key);
    }
    else if (fp_1.has(`${aggField}.buckets`, bucket)) {
        return getFirstItem(fp_1.get(`${aggField}`, bucket));
    }
    else if (fp_1.has(aggField, bucket)) {
        const valueObj = fp_1.get(aggField, bucket);
        return valueObj.value_as_string;
    }
    return null;
};
const getFirstItem = (data) => {
    const firstItem = fp_1.head(data.buckets);
    if (firstItem == null) {
        return null;
    }
    return firstItem.key;
};
