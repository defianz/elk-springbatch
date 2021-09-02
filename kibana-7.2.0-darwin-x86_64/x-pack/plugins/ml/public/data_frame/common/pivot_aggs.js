"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const field_types_1 = require("../../../common/constants/field_types");
var PIVOT_SUPPORTED_AGGS;
(function (PIVOT_SUPPORTED_AGGS) {
    PIVOT_SUPPORTED_AGGS["AVG"] = "avg";
    PIVOT_SUPPORTED_AGGS["CARDINALITY"] = "cardinality";
    PIVOT_SUPPORTED_AGGS["MAX"] = "max";
    PIVOT_SUPPORTED_AGGS["MIN"] = "min";
    PIVOT_SUPPORTED_AGGS["SUM"] = "sum";
    PIVOT_SUPPORTED_AGGS["VALUE_COUNT"] = "value_count";
})(PIVOT_SUPPORTED_AGGS = exports.PIVOT_SUPPORTED_AGGS || (exports.PIVOT_SUPPORTED_AGGS = {}));
exports.pivotSupportedAggs = [
    PIVOT_SUPPORTED_AGGS.AVG,
    PIVOT_SUPPORTED_AGGS.CARDINALITY,
    PIVOT_SUPPORTED_AGGS.MAX,
    PIVOT_SUPPORTED_AGGS.MIN,
    PIVOT_SUPPORTED_AGGS.SUM,
    PIVOT_SUPPORTED_AGGS.VALUE_COUNT,
];
exports.pivotAggsFieldSupport = {
    [field_types_1.KBN_FIELD_TYPES.ATTACHMENT]: [PIVOT_SUPPORTED_AGGS.VALUE_COUNT],
    [field_types_1.KBN_FIELD_TYPES.BOOLEAN]: [PIVOT_SUPPORTED_AGGS.VALUE_COUNT],
    [field_types_1.KBN_FIELD_TYPES.DATE]: [
        PIVOT_SUPPORTED_AGGS.MAX,
        PIVOT_SUPPORTED_AGGS.MIN,
        PIVOT_SUPPORTED_AGGS.VALUE_COUNT,
    ],
    [field_types_1.KBN_FIELD_TYPES.GEO_POINT]: [PIVOT_SUPPORTED_AGGS.VALUE_COUNT],
    [field_types_1.KBN_FIELD_TYPES.GEO_SHAPE]: [PIVOT_SUPPORTED_AGGS.VALUE_COUNT],
    [field_types_1.KBN_FIELD_TYPES.IP]: [PIVOT_SUPPORTED_AGGS.CARDINALITY, PIVOT_SUPPORTED_AGGS.VALUE_COUNT],
    [field_types_1.KBN_FIELD_TYPES.MURMUR3]: [PIVOT_SUPPORTED_AGGS.VALUE_COUNT],
    [field_types_1.KBN_FIELD_TYPES.NUMBER]: [
        PIVOT_SUPPORTED_AGGS.AVG,
        PIVOT_SUPPORTED_AGGS.CARDINALITY,
        PIVOT_SUPPORTED_AGGS.MAX,
        PIVOT_SUPPORTED_AGGS.MIN,
        PIVOT_SUPPORTED_AGGS.SUM,
        PIVOT_SUPPORTED_AGGS.VALUE_COUNT,
    ],
    [field_types_1.KBN_FIELD_TYPES.STRING]: [PIVOT_SUPPORTED_AGGS.CARDINALITY, PIVOT_SUPPORTED_AGGS.VALUE_COUNT],
    [field_types_1.KBN_FIELD_TYPES._SOURCE]: [PIVOT_SUPPORTED_AGGS.VALUE_COUNT],
    [field_types_1.KBN_FIELD_TYPES.UNKNOWN]: [PIVOT_SUPPORTED_AGGS.VALUE_COUNT],
    [field_types_1.KBN_FIELD_TYPES.CONFLICT]: [PIVOT_SUPPORTED_AGGS.VALUE_COUNT],
};
