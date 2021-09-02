"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_theme_light_json_1 = tslib_1.__importDefault(require("@elastic/eui/dist/eui_theme_light.json"));
const colors = [
    eui_theme_light_json_1.default.euiColorVis0,
    eui_theme_light_json_1.default.euiColorVis1,
    eui_theme_light_json_1.default.euiColorVis2,
    eui_theme_light_json_1.default.euiColorVis3,
    eui_theme_light_json_1.default.euiColorVis4,
    eui_theme_light_json_1.default.euiColorVis5,
    eui_theme_light_json_1.default.euiColorVis6
];
function transformDataToMetricsChart(result, chartBase) {
    const { aggregations, hits } = result;
    const { timeseriesData } = aggregations;
    return {
        title: chartBase.title,
        key: chartBase.key,
        yUnit: chartBase.yUnit,
        totalHits: hits.total,
        series: Object.keys(chartBase.series).map((seriesKey, i) => ({
            title: chartBase.series[seriesKey].title,
            key: seriesKey,
            type: chartBase.type,
            color: chartBase.series[seriesKey].color || colors[i],
            overallValue: aggregations[seriesKey].value,
            data: timeseriesData.buckets.map(bucket => {
                const { value } = bucket[seriesKey];
                const y = value === null || isNaN(value) ? null : value;
                return {
                    x: bucket.key,
                    y
                };
            })
        }))
    };
}
exports.transformDataToMetricsChart = transformDataToMetricsChart;
