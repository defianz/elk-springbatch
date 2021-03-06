"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const d3_time_1 = require("d3-time");
const first_1 = tslib_1.__importDefault(require("lodash/fp/first"));
const get_1 = tslib_1.__importDefault(require("lodash/fp/get"));
const has_1 = tslib_1.__importDefault(require("lodash/fp/has"));
const zip_1 = tslib_1.__importDefault(require("lodash/fp/zip"));
const time_1 = require("../../../../common/time");
const DAY_MILLIS = 24 * 60 * 60 * 1000;
const LOOKUP_OFFSETS = [0, 1, 7, 30, 365, 10000, Infinity].map(days => days * DAY_MILLIS);
const TIMESTAMP_FORMAT = 'epoch_millis';
class InfraKibanaLogEntriesAdapter {
    constructor(framework) {
        this.framework = framework;
    }
    async getAdjacentLogEntryDocuments(request, sourceConfiguration, fields, start, direction, maxCount, filterQuery, highlightQuery) {
        if (maxCount <= 0) {
            return [];
        }
        const intervals = getLookupIntervals(start.time, direction);
        let documents = [];
        for (const [intervalStart, intervalEnd] of intervals) {
            if (documents.length >= maxCount) {
                break;
            }
            const documentsInInterval = await this.getLogEntryDocumentsBetween(request, sourceConfiguration, fields, intervalStart, intervalEnd, documents.length > 0 ? documents[documents.length - 1].key : start, maxCount - documents.length, filterQuery, highlightQuery);
            documents = [...documents, ...documentsInInterval];
        }
        return direction === 'asc' ? documents : documents.reverse();
    }
    async getContainedLogEntryDocuments(request, sourceConfiguration, fields, start, end, filterQuery, highlightQuery) {
        const documents = await this.getLogEntryDocumentsBetween(request, sourceConfiguration, fields, start.time, end.time, start, 10000, filterQuery, highlightQuery);
        return documents.filter(document => time_1.compareTimeKeys(document.key, end) < 0);
    }
    async getContainedLogSummaryBuckets(request, sourceConfiguration, start, end, bucketSize, filterQuery) {
        const bucketIntervalStarts = d3_time_1.timeMilliseconds(new Date(start), new Date(end), bucketSize);
        const query = {
            allowNoIndices: true,
            index: sourceConfiguration.logAlias,
            ignoreUnavailable: true,
            body: {
                aggregations: {
                    count_by_date: {
                        date_range: {
                            field: sourceConfiguration.fields.timestamp,
                            format: TIMESTAMP_FORMAT,
                            ranges: bucketIntervalStarts.map(bucketIntervalStart => ({
                                from: bucketIntervalStart.getTime(),
                                to: bucketIntervalStart.getTime() + bucketSize,
                            })),
                        },
                    },
                },
                query: {
                    bool: {
                        filter: [
                            ...createQueryFilterClauses(filterQuery),
                            {
                                range: {
                                    [sourceConfiguration.fields.timestamp]: {
                                        gte: start,
                                        lte: end,
                                        format: TIMESTAMP_FORMAT,
                                    },
                                },
                            },
                        ],
                    },
                },
                size: 0,
            },
        };
        const response = await this.framework.callWithRequest(request, 'search', query);
        return response.aggregations && response.aggregations.count_by_date
            ? response.aggregations.count_by_date.buckets
            : [];
    }
    async getLogItem(request, id, sourceConfiguration) {
        const search = (searchOptions) => this.framework.callWithRequest(request, 'search', searchOptions);
        const params = {
            index: sourceConfiguration.logAlias,
            terminate_after: 1,
            body: {
                size: 1,
                sort: [
                    { [sourceConfiguration.fields.timestamp]: 'desc' },
                    { [sourceConfiguration.fields.tiebreaker]: 'desc' },
                ],
                query: {
                    ids: {
                        values: [id],
                    },
                },
            },
        };
        const response = await search(params);
        const document = first_1.default(response.hits.hits);
        if (!document) {
            throw new Error('Document not found');
        }
        return document;
    }
    async getLogEntryDocumentsBetween(request, sourceConfiguration, fields, start, end, after, maxCount, filterQuery, highlightQuery) {
        if (maxCount <= 0) {
            return [];
        }
        const sortDirection = start <= end ? 'asc' : 'desc';
        const startRange = {
            [sortDirection === 'asc' ? 'gte' : 'lte']: start,
        };
        const endRange = end === Infinity
            ? {}
            : {
                [sortDirection === 'asc' ? 'lte' : 'gte']: end,
            };
        const highlightClause = highlightQuery
            ? {
                highlight: {
                    boundary_scanner: 'word',
                    fields: fields.reduce((highlightFieldConfigs, fieldName) => ({
                        ...highlightFieldConfigs,
                        [fieldName]: {},
                    }), {}),
                    fragment_size: 1,
                    number_of_fragments: 100,
                    post_tags: [''],
                    pre_tags: [''],
                },
            }
            : {};
        const searchAfterClause = time_1.isTimeKey(after)
            ? {
                search_after: [after.time, after.tiebreaker],
            }
            : {};
        const query = {
            allowNoIndices: true,
            index: sourceConfiguration.logAlias,
            ignoreUnavailable: true,
            body: {
                query: {
                    bool: {
                        filter: [
                            ...createQueryFilterClauses(filterQuery),
                            {
                                range: {
                                    [sourceConfiguration.fields.timestamp]: {
                                        ...startRange,
                                        ...endRange,
                                        format: TIMESTAMP_FORMAT,
                                    },
                                },
                            },
                        ],
                    },
                },
                ...highlightClause,
                ...searchAfterClause,
                _source: fields,
                size: maxCount,
                sort: [
                    { [sourceConfiguration.fields.timestamp]: sortDirection },
                    { [sourceConfiguration.fields.tiebreaker]: sortDirection },
                ],
                track_total_hits: false,
            },
        };
        const response = await this.framework.callWithRequest(request, 'search', query);
        const hits = response.hits.hits;
        const documents = hits.map(convertHitToLogEntryDocument(fields));
        return documents;
    }
}
exports.InfraKibanaLogEntriesAdapter = InfraKibanaLogEntriesAdapter;
function getLookupIntervals(start, direction) {
    const offsetSign = direction === 'asc' ? 1 : -1;
    const translatedOffsets = LOOKUP_OFFSETS.map(offset => start + offset * offsetSign);
    const intervals = zip_1.default(translatedOffsets.slice(0, -1), translatedOffsets.slice(1));
    return intervals;
}
const convertHitToLogEntryDocument = (fields) => (hit) => ({
    gid: hit._id,
    fields: fields.reduce((flattenedFields, fieldName) => has_1.default(fieldName, hit._source)
        ? {
            ...flattenedFields,
            [fieldName]: get_1.default(fieldName, hit._source),
        }
        : flattenedFields, {}),
    key: {
        time: hit.sort[0],
        tiebreaker: hit.sort[1],
    },
});
const createQueryFilterClauses = (filterQuery) => filterQuery ? [filterQuery] : [];
