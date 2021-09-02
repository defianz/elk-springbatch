"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../common/types/common");
const pivot_group_by_1 = require("./pivot_group_by");
function getPivotQuery(search) {
    if (typeof search === 'string') {
        return {
            query_string: {
                query: search,
                default_operator: 'AND',
            },
        };
    }
    return search;
}
exports.getPivotQuery = getPivotQuery;
function isSimpleQuery(arg) {
    return arg.query_string !== undefined;
}
exports.isSimpleQuery = isSimpleQuery;
function isDefaultQuery(query) {
    return isSimpleQuery(query) && query.query_string.query === '*';
}
exports.isDefaultQuery = isDefaultQuery;
function getDataFramePreviewRequest(indexPatternTitle, query, groupBy, aggs) {
    const request = {
        source: {
            index: indexPatternTitle,
        },
        pivot: {
            group_by: {},
            aggregations: {},
        },
    };
    if (!isDefaultQuery(query)) {
        request.source.query = query;
    }
    groupBy.forEach(g => {
        if (g.agg === pivot_group_by_1.PIVOT_SUPPORTED_GROUP_BY_AGGS.TERMS) {
            const termsAgg = {
                terms: {
                    field: g.field,
                },
            };
            request.pivot.group_by[g.aggName] = termsAgg;
        }
        else if (g.agg === pivot_group_by_1.PIVOT_SUPPORTED_GROUP_BY_AGGS.HISTOGRAM) {
            const histogramAgg = {
                histogram: {
                    field: g.field,
                    interval: g.interval,
                },
            };
            request.pivot.group_by[g.aggName] = histogramAgg;
        }
        else if (g.agg === pivot_group_by_1.PIVOT_SUPPORTED_GROUP_BY_AGGS.DATE_HISTOGRAM) {
            const dateHistogramAgg = {
                date_histogram: {
                    field: g.field,
                    calendar_interval: g.calendar_interval,
                },
            };
            // DATE_HISTOGRAM_FORMAT is an enum which maps interval units like ms/s/m/... to
            // date_histrogram aggregation formats like 'yyyy-MM-dd'. The following code extracts
            // the interval unit from the configurations interval and adds a matching
            // aggregation format to the configuration.
            const timeUnitMatch = g.calendar_interval.match(pivot_group_by_1.dateHistogramIntervalFormatRegex);
            if (timeUnitMatch !== null && Array.isArray(timeUnitMatch) && timeUnitMatch.length === 2) {
                // the following is just a TS compatible way of using the
                // matched string like `d` as the property to access the enum.
                const format = pivot_group_by_1.DATE_HISTOGRAM_FORMAT[timeUnitMatch[1]];
                if (format !== undefined) {
                    dateHistogramAgg.date_histogram.format = format;
                }
            }
            request.pivot.group_by[g.aggName] = dateHistogramAgg;
        }
    });
    aggs.forEach(agg => {
        request.pivot.aggregations[agg.aggName] = {
            [agg.agg]: {
                field: agg.field,
            },
        };
    });
    return request;
}
exports.getDataFramePreviewRequest = getDataFramePreviewRequest;
function getDataFrameRequest(indexPatternTitle, pivotState, jobDetailsState) {
    const request = {
        ...getDataFramePreviewRequest(indexPatternTitle, getPivotQuery(pivotState.search), common_1.dictionaryToArray(pivotState.groupByList), common_1.dictionaryToArray(pivotState.aggList)),
        dest: {
            index: jobDetailsState.targetIndex,
        },
    };
    return request;
}
exports.getDataFrameRequest = getDataFrameRequest;
