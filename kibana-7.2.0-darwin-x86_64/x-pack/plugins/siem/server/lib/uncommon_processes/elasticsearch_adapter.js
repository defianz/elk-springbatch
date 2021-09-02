"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fp_1 = require("lodash/fp");
const build_query_1 = require("../../utils/build_query");
const ecs_fields_1 = require("../ecs_fields");
const query_dsl_1 = require("./query.dsl");
class ElasticsearchUncommonProcessesAdapter {
    constructor(framework) {
        this.framework = framework;
    }
    async getUncommonProcesses(request, options) {
        const response = await this.framework.callWithRequest(request, 'search', query_dsl_1.buildQuery(options));
        const { cursor, limit } = options.pagination;
        const totalCount = fp_1.getOr(0, 'aggregations.process_count.value', response);
        const buckets = fp_1.getOr([], 'aggregations.group_by_process.buckets', response);
        const hits = exports.getHits(buckets);
        const uncommonProcessesEdges = hits.map(hit => exports.formatUncommonProcessesData(options.fields, hit, { ...ecs_fields_1.processFieldsMap, ...ecs_fields_1.userFieldsMap }));
        const hasNextPage = uncommonProcessesEdges.length === limit + 1;
        const beginning = cursor != null ? parseInt(cursor, 10) : 0;
        const edges = uncommonProcessesEdges.splice(beginning, limit - beginning);
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
exports.ElasticsearchUncommonProcessesAdapter = ElasticsearchUncommonProcessesAdapter;
exports.getHits = (buckets) => buckets.map((bucket) => ({
    _id: bucket.process.hits.hits[0]._id,
    _index: bucket.process.hits.hits[0]._index,
    _type: bucket.process.hits.hits[0]._type,
    _score: bucket.process.hits.hits[0]._score,
    _source: bucket.process.hits.hits[0]._source,
    sort: bucket.process.hits.hits[0].sort,
    cursor: bucket.process.hits.hits[0].cursor,
    total: bucket.process.hits.total,
    host: exports.getHosts(bucket.hosts.buckets),
}));
exports.getHosts = (buckets) => buckets.map(bucket => ({
    id: [bucket.key],
    name: bucket.host.hits.hits[0]._source.host.name,
}));
exports.formatUncommonProcessesData = (fields, hit, fieldMap) => fields.reduce((flattenedFields, fieldName) => {
    flattenedFields.node._id = hit._id;
    flattenedFields.node.instances = fp_1.getOr(0, 'total.value', hit);
    flattenedFields.node.hosts = hit.host;
    if (hit.cursor) {
        flattenedFields.cursor.value = hit.cursor;
    }
    return build_query_1.mergeFieldsWithHit(fieldName, flattenedFields, fieldMap, hit);
}, {
    node: {
        _id: '',
        instances: 0,
        process: {},
        hosts: [],
    },
    cursor: {
        value: '',
        tiebreaker: null,
    },
});
