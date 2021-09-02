"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const cpu_1 = require("./shared/cpu");
const memory_1 = require("./shared/memory");
async function getDefaultMetricsCharts(setup, serviceName) {
    const charts = await Promise.all([
        cpu_1.getCPUChartData(setup, serviceName),
        memory_1.getMemoryChartData(setup, serviceName)
    ]);
    return { charts };
}
exports.getDefaultMetricsCharts = getDefaultMetricsCharts;
