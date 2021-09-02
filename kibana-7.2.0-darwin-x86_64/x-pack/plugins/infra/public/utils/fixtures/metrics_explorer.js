"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../../server/routes/metrics_explorer/types");
exports.options = {
    limit: 3,
    groupBy: 'host.name',
    aggregation: types_1.MetricsExplorerAggregation.avg,
    metrics: [{ aggregation: types_1.MetricsExplorerAggregation.avg, field: 'system.cpu.user.pct' }],
};
exports.source = {
    name: 'default',
    description: '',
    logAlias: 'filebeat-*',
    metricAlias: 'metricbeat-*',
    logColumns: [],
    fields: {
        host: 'host.name',
        container: 'container.id',
        pod: 'kubernetes.pod.uid',
        timestamp: '@timestamp',
        message: ['message'],
        tiebreaker: '@timestamp',
    },
};
exports.derivedIndexPattern = { title: 'metricbeat-*', fields: [] };
exports.timeRange = {
    from: 'now-1h',
    to: 'now',
    interval: '>=10s',
};
exports.createSeries = (id) => ({
    id,
    columns: [
        { name: 'timestamp', type: types_1.MetricsExplorerColumnType.date },
        { name: 'metric_0', type: types_1.MetricsExplorerColumnType.number },
        { name: 'groupBy', type: types_1.MetricsExplorerColumnType.string },
    ],
    rows: [
        { timestamp: 1, metric_0: 0.5, groupBy: id },
        { timestamp: 2, metric_0: 0.5, groupBy: id },
        { timestamp: 3, metric_0: 0.5, groupBy: id },
    ],
});
exports.resp = {
    pageInfo: { total: 10, afterKey: 'host-04' },
    series: [exports.createSeries('host-01'), exports.createSeries('host-02'), exports.createSeries('host-03')],
};
