"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const boom_1 = require("boom");
const get_groupings_1 = require("./lib/get_groupings");
const populate_series_with_tsvb_data_1 = require("./lib/populate_series_with_tsvb_data");
const schema_1 = require("./schema");
exports.initMetricExplorerRoute = (libs) => {
    const { framework } = libs;
    const { callWithRequest } = framework;
    framework.registerRoute({
        method: 'POST',
        path: '/api/infra/metrics_explorer',
        options: {
            validate: {
                payload: schema_1.metricsExplorerSchema,
            },
        },
        handler: async (req) => {
            try {
                const search = (searchOptions) => callWithRequest(req, 'search', searchOptions);
                const options = req.payload;
                // First we get the groupings from a composite aggregation
                const response = await get_groupings_1.getGroupings(search, options);
                // Then we take the results and fill in the data from TSVB with the
                // user's custom metrics
                const seriesWithMetrics = await Promise.all(response.series.map(populate_series_with_tsvb_data_1.populateSeriesWithTSVBData(req, options, framework)));
                return { ...response, series: seriesWithMetrics };
            }
            catch (error) {
                throw boom_1.boomify(error);
            }
        },
    });
};
