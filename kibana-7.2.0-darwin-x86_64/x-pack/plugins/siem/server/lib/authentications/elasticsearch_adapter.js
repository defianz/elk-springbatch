"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fp_1 = require("lodash/fp");
const build_query_1 = require("../../utils/build_query");
const query_dsl_1 = require("./query.dsl");
class ElasticsearchAuthenticationAdapter {
    constructor(framework) {
        this.framework = framework;
    }
    async getAuthentications(request, options) {
        const response = await this.framework.callWithRequest(request, 'search', query_dsl_1.buildQuery(options));
        const { cursor, limit } = options.pagination;
        const totalCount = fp_1.getOr(0, 'aggregations.user_count.value', response);
        const hits = fp_1.getOr([], 'aggregations.group_by_users.buckets', response).map((bucket) => ({
            _id: bucket.authentication.hits.hits[0]._id,
            _source: {
                lastSuccess: fp_1.getOr(null, 'successes.lastSuccess.hits.hits[0]._source', bucket),
                lastFailure: fp_1.getOr(null, 'failures.lastFailure.hits.hits[0]._source', bucket),
            },
            user: bucket.key,
            cursor: bucket.key.user_uid,
            failures: bucket.failures.doc_count,
            successes: bucket.successes.doc_count,
        }));
        const authenticationEdges = hits.map(hit => exports.formatAuthenticationData(options.fields, hit, query_dsl_1.auditdFieldsMap));
        const hasNextPage = authenticationEdges.length === limit + 1;
        const beginning = cursor != null ? parseInt(cursor, 10) : 0;
        const edges = authenticationEdges.splice(beginning, limit - beginning);
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
exports.ElasticsearchAuthenticationAdapter = ElasticsearchAuthenticationAdapter;
exports.formatAuthenticationData = (fields, hit, fieldMap) => fields.reduce((flattenedFields, fieldName) => {
    if (hit.cursor) {
        flattenedFields.cursor.value = hit.cursor;
    }
    flattenedFields.node = {
        ...flattenedFields.node,
        ...{
            _id: hit._id,
            user: { name: [hit.user] },
            failures: hit.failures,
            successes: hit.successes,
        },
    };
    return build_query_1.mergeFieldsWithHit(fieldName, flattenedFields, fieldMap, hit);
}, {
    node: {
        failures: 0,
        successes: 0,
        _id: '',
        user: {
            name: [''],
        },
    },
    cursor: {
        value: '',
        tiebreaker: null,
    },
});
