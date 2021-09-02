"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../../../server/routes/metrics_explorer/types");
const formatters_1 = require("../../../utils/formatters");
const lib_1 = require("../../../lib/lib");
const metric_to_format_1 = require("./metric_to_format");
exports.createFormatterForMetric = (metric) => {
    if (metric && metric.field) {
        const format = metric_to_format_1.metricToFormat(metric);
        if (format === lib_1.InfraFormatterType.bits &&
            metric.aggregation === types_1.MetricsExplorerAggregation.rate) {
            return formatters_1.createFormatter(lib_1.InfraFormatterType.bits, '{{value}}/s');
        }
        return formatters_1.createFormatter(format);
    }
    return formatters_1.createFormatter(lib_1.InfraFormatterType.number);
};
