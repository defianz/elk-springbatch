"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const field_types_1 = require("../../../common/constants/field_types");
var PIVOT_SUPPORTED_GROUP_BY_AGGS;
(function (PIVOT_SUPPORTED_GROUP_BY_AGGS) {
    PIVOT_SUPPORTED_GROUP_BY_AGGS["DATE_HISTOGRAM"] = "date_histogram";
    PIVOT_SUPPORTED_GROUP_BY_AGGS["HISTOGRAM"] = "histogram";
    PIVOT_SUPPORTED_GROUP_BY_AGGS["TERMS"] = "terms";
})(PIVOT_SUPPORTED_GROUP_BY_AGGS = exports.PIVOT_SUPPORTED_GROUP_BY_AGGS || (exports.PIVOT_SUPPORTED_GROUP_BY_AGGS = {}));
exports.pivotSupportedGroupByAggs = [
    PIVOT_SUPPORTED_GROUP_BY_AGGS.DATE_HISTOGRAM,
    PIVOT_SUPPORTED_GROUP_BY_AGGS.HISTOGRAM,
    PIVOT_SUPPORTED_GROUP_BY_AGGS.TERMS,
];
exports.pivotGroupByFieldSupport = {
    [field_types_1.KBN_FIELD_TYPES.ATTACHMENT]: [],
    [field_types_1.KBN_FIELD_TYPES.BOOLEAN]: [],
    [field_types_1.KBN_FIELD_TYPES.DATE]: [PIVOT_SUPPORTED_GROUP_BY_AGGS.DATE_HISTOGRAM],
    [field_types_1.KBN_FIELD_TYPES.GEO_POINT]: [],
    [field_types_1.KBN_FIELD_TYPES.GEO_SHAPE]: [],
    [field_types_1.KBN_FIELD_TYPES.IP]: [PIVOT_SUPPORTED_GROUP_BY_AGGS.TERMS],
    [field_types_1.KBN_FIELD_TYPES.MURMUR3]: [],
    [field_types_1.KBN_FIELD_TYPES.NUMBER]: [PIVOT_SUPPORTED_GROUP_BY_AGGS.HISTOGRAM],
    [field_types_1.KBN_FIELD_TYPES.STRING]: [PIVOT_SUPPORTED_GROUP_BY_AGGS.TERMS],
    [field_types_1.KBN_FIELD_TYPES._SOURCE]: [],
    [field_types_1.KBN_FIELD_TYPES.UNKNOWN]: [],
    [field_types_1.KBN_FIELD_TYPES.CONFLICT]: [],
};
// Don't allow an interval of '0', but allow a float interval of '0.1' with a leading zero.
exports.histogramIntervalFormatRegex = /^([1-9][0-9]*((\.)([0-9]+))?|([0](\.)([0-9]+)))$/;
// Don't allow intervals of '0', don't allow floating intervals.
exports.dateHistogramIntervalFormatRegex = /^[1-9][0-9]*(ms|s|m|h|d|w|M|q|y)$/;
var DATE_HISTOGRAM_FORMAT;
(function (DATE_HISTOGRAM_FORMAT) {
    DATE_HISTOGRAM_FORMAT["ms"] = "yyyy-MM-dd HH:mm:ss.SSS";
    DATE_HISTOGRAM_FORMAT["s"] = "yyyy-MM-dd HH:mm:ss";
    DATE_HISTOGRAM_FORMAT["m"] = "yyyy-MM-dd HH:mm";
    DATE_HISTOGRAM_FORMAT["h"] = "yyyy-MM-dd HH:00";
    DATE_HISTOGRAM_FORMAT["d"] = "yyyy-MM-dd";
    DATE_HISTOGRAM_FORMAT["M"] = "yyyy-MM-01";
    DATE_HISTOGRAM_FORMAT["y"] = "yyyy";
})(DATE_HISTOGRAM_FORMAT = exports.DATE_HISTOGRAM_FORMAT || (exports.DATE_HISTOGRAM_FORMAT = {}));
function isGroupByDateHistogram(arg) {
    return arg.hasOwnProperty('calendar_interval');
}
exports.isGroupByDateHistogram = isGroupByDateHistogram;
function isGroupByHistogram(arg) {
    return arg.hasOwnProperty('interval');
}
exports.isGroupByHistogram = isGroupByHistogram;
