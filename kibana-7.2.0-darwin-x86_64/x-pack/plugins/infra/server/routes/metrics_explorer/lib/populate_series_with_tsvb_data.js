"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const types_1 = require("../types");
const create_metrics_model_1 = require("./create_metrics_model");
exports.populateSeriesWithTSVBData = (req, options, framework) => async (series) => {
    // IF there are no metrics selected then we should return an empty result.
    if (options.metrics.length === 0) {
        return {
            ...series,
            columns: [],
            rows: [],
        };
    }
    // Set the filter for the group by or match everything
    const filters = options.groupBy ? [{ match: { [options.groupBy]: series.id } }] : [];
    const timerange = { min: options.timerange.from, max: options.timerange.to };
    // Create the TSVB model based on the request options
    const model = create_metrics_model_1.createMetricModel(options);
    // Get TSVB results using the model, timerange and filters
    const tsvbResults = await framework.makeTSVBRequest(req, model, timerange, filters);
    // Setup the dynamic columns and row attributes depending on if the user is doing a group by
    // and multiple metrics
    const attributeColumns = options.groupBy != null ? [{ name: 'groupBy', type: types_1.MetricsExplorerColumnType.string }] : [];
    const metricColumns = options.metrics.map((m, i) => ({
        name: `metric_${i}`,
        type: types_1.MetricsExplorerColumnType.number,
    }));
    const rowAttributes = options.groupBy != null ? { groupBy: series.id } : {};
    // To support multiple metrics, there are multiple TSVB series which need to be combined
    // into one MetricExplorerRow (Canvas row). This is done by collecting all the timestamps
    // across each TSVB series. Then for each timestamp we find the values and create a
    // MetricsExplorerRow.
    const timestamps = tsvbResults.custom.series.reduce((currentTimestamps, tsvbSeries) => lodash_1.union(currentTimestamps, tsvbSeries.data.map(row => row[0])).sort(), []);
    // Combine the TSVB series for multiple metrics.
    const rows = timestamps.map(timestamp => {
        return tsvbResults.custom.series.reduce((currentRow, tsvbSeries) => {
            const matches = tsvbSeries.data.find(d => d[0] === timestamp);
            if (matches) {
                return { ...currentRow, [tsvbSeries.id]: matches[1] };
            }
            return currentRow;
        }, { timestamp, ...rowAttributes });
    });
    return {
        ...series,
        rows,
        columns: [
            { name: 'timestamp', type: types_1.MetricsExplorerColumnType.date },
            ...metricColumns,
            ...attributeColumns,
        ],
    };
};
