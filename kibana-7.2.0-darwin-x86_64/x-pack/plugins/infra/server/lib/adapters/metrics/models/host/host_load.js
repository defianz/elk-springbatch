"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const adapter_types_1 = require("../../adapter_types");
exports.hostLoad = (timeField, indexPattern, interval) => ({
    id: 'hostLoad',
    requires: ['system.cpu'],
    index_pattern: indexPattern,
    interval,
    time_field: timeField,
    type: 'timeseries',
    series: [
        {
            id: 'load_1m',
            metrics: [
                {
                    field: 'system.load.1',
                    id: 'avg-load-1m',
                    type: adapter_types_1.InfraMetricModelMetricType.avg,
                },
            ],
            split_mode: 'everything',
        },
        {
            id: 'load_5m',
            metrics: [
                {
                    field: 'system.load.5',
                    id: 'avg-load-5m',
                    type: adapter_types_1.InfraMetricModelMetricType.avg,
                },
            ],
            split_mode: 'everything',
        },
        {
            id: 'load_15m',
            metrics: [
                {
                    field: 'system.load.15',
                    id: 'avg-load-15m',
                    type: adapter_types_1.InfraMetricModelMetricType.avg,
                },
            ],
            split_mode: 'everything',
        },
    ],
});
