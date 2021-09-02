"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
const notify_1 = require("ui/notify");
const ml_api_service_1 = require("../../../../../../services/ml_api_service");
exports.getJobsFactory = (setDataFrameJobs, blockRefresh) => async (forceRefresh = false) => {
    if (forceRefresh === true || blockRefresh === false) {
        try {
            const jobConfigs = await ml_api_service_1.ml.dataFrame.getDataFrameTransforms();
            const jobStats = await ml_api_service_1.ml.dataFrame.getDataFrameTransformsStats();
            const tableRows = jobConfigs.transforms.reduce((reducedtableRows, config) => {
                const stats = jobStats.transforms.find(d => config.id === d.id);
                // A newly created job might not have corresponding stats yet.
                // If that's the case we just skip the job and don't add it to the jobs list yet.
                if (stats === undefined) {
                    return reducedtableRows;
                }
                // Table with expandable rows requires `id` on the outer most level
                reducedtableRows.push({ config, id: config.id, state: stats.state, stats: stats.stats });
                return reducedtableRows;
            }, []);
            setDataFrameJobs(tableRows);
        }
        catch (e) {
            notify_1.toastNotifications.addDanger(i18n_1.i18n.translate('xpack.ml.dataframe.jobsList.errorGettingDataFrameJobsList', {
                defaultMessage: 'An error occurred getting the data frame jobs list: {error}',
                values: { error: JSON.stringify(e) },
            }));
        }
    }
};
