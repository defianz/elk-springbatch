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
exports.stopJobFactory = (getJobs) => async (d) => {
    try {
        await ml_api_service_1.ml.dataFrame.stopDataFrameTransformsJob(d.config.id);
        getJobs(true);
        notify_1.toastNotifications.addSuccess(i18n_1.i18n.translate('xpack.ml.dataframe.jobsList.stopJobSuccessMessage', {
            defaultMessage: 'Data frame job {jobId} stopped successfully.',
            values: { jobId: d.config.id },
        }));
    }
    catch (e) {
        notify_1.toastNotifications.addDanger(i18n_1.i18n.translate('xpack.ml.dataframe.jobsList.stopJobErrorMessage', {
            defaultMessage: 'An error occurred stopping the data frame job {jobId}: {error}',
            values: { jobId: d.config.id, error: JSON.stringify(e) },
        }));
    }
};
