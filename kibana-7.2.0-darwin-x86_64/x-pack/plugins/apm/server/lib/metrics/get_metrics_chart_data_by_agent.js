"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const java_1 = require("./by_agent/java");
const default_1 = require("./by_agent/default");
async function getMetricsChartDataByAgent({ setup, serviceName, agentName }) {
    switch (agentName) {
        case 'java': {
            return java_1.getJavaMetricsCharts(setup, serviceName);
        }
        default: {
            return default_1.getDefaultMetricsCharts(setup, serviceName);
        }
    }
}
exports.getMetricsChartDataByAgent = getMetricsChartDataByAgent;
