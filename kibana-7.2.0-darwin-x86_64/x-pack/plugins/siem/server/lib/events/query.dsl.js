"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const build_query_1 = require("../../utils/build_query");
exports.buildQuery = (options) => {
    const { limit, cursor, tiebreaker } = options.pagination;
    const { fields, filterQuery } = options;
    const filterClause = [...build_query_1.createQueryFilterClauses(filterQuery)];
    const defaultIndex = options.defaultIndex;
    const getTimerangeFilter = (timerange) => {
        if (timerange) {
            const { to, from } = timerange;
            return [
                {
                    range: {
                        [options.sourceConfiguration.fields.timestamp]: {
                            gte: from,
                            lte: to,
                        },
                    },
                },
            ];
        }
        return [];
    };
    const filter = [...filterClause, ...getTimerangeFilter(options.timerange)];
    const agg = options.fields.includes('kpiEventType')
        ? {
            count_event_type: {
                terms: {
                    field: 'event.action',
                    size: 5,
                    order: {
                        _count: 'desc',
                    },
                },
            },
        }
        : {};
    const queryMust = options.fields.includes('kpiEventType')
        ? [{ match_all: {} }, { exists: { field: 'event.action' } }]
        : [{ match_all: {} }];
    const getSortField = (sortField) => {
        if (sortField.sortFieldId) {
            const field = sortField.sortFieldId === 'timestamp' ? '@timestamp' : sortField.sortFieldId;
            return [
                { [field]: sortField.direction },
                { [options.sourceConfiguration.fields.tiebreaker]: sortField.direction },
            ];
        }
        return [];
    };
    const sort = getSortField(options.sortField);
    const queryDsl = {
        allowNoIndices: true,
        index: defaultIndex,
        ignoreUnavailable: true,
        body: {
            aggregations: agg,
            query: {
                bool: {
                    must: queryMust,
                    filter,
                },
            },
            size: limit + 1,
            track_total_hits: true,
            sort,
            _source: fields,
        },
    };
    if (cursor && tiebreaker) {
        return {
            ...queryDsl,
            body: {
                ...queryDsl.body,
                search_after: [cursor, tiebreaker],
            },
        };
    }
    return queryDsl;
};
exports.buildDetailsQuery = (indexName, id) => ({
    allowNoIndices: true,
    index: indexName,
    ignoreUnavailable: true,
    body: {
        query: {
            terms: {
                _id: [id],
            },
        },
    },
    size: 1,
});
