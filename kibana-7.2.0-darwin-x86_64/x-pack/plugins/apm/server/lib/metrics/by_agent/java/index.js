"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const heap_memory_1 = require("./heap_memory");
const non_heap_memory_1 = require("./non_heap_memory");
const thread_count_1 = require("./thread_count");
const cpu_1 = require("../shared/cpu");
const memory_1 = require("../shared/memory");
async function getJavaMetricsCharts(setup, serviceName) {
    const charts = await Promise.all([
        cpu_1.getCPUChartData(setup, serviceName),
        memory_1.getMemoryChartData(setup, serviceName),
        heap_memory_1.getHeapMemoryChart(setup, serviceName),
        non_heap_memory_1.getNonHeapMemoryChart(setup, serviceName),
        thread_count_1.getThreadCountChart(setup, serviceName)
    ]);
    return { charts };
}
exports.getJavaMetricsCharts = getJavaMetricsCharts;
