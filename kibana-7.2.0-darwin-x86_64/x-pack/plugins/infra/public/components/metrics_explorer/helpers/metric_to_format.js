"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const types_1 = require("../../../../server/routes/metrics_explorer/types");
const lib_1 = require("../../../lib/lib");
exports.metricToFormat = (metric) => {
    if (metric && metric.field) {
        const suffix = lodash_1.last(metric.field.split(/\./));
        if (suffix === 'pct') {
            return lib_1.InfraFormatterType.percent;
        }
        if (suffix === 'bytes' && metric.aggregation === types_1.MetricsExplorerAggregation.rate) {
            return lib_1.InfraFormatterType.bits;
        }
        if (suffix === 'bytes') {
            return lib_1.InfraFormatterType.bytes;
        }
    }
    return lib_1.InfraFormatterType.number;
};
