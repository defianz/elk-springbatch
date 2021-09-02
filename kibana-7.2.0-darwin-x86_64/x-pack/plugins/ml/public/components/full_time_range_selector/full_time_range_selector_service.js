"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const i18n_1 = require("@kbn/i18n");
const notify_1 = require("ui/notify");
const timefilter_1 = require("ui/timefilter");
const ml_api_service_1 = require("../../services/ml_api_service");
function setFullTimeRange(indexPattern, query) {
    return ml_api_service_1.ml
        .getTimeFieldRange({
        index: indexPattern.title,
        timeFieldName: indexPattern.timeFieldName,
        query,
    })
        .then(resp => {
        timefilter_1.timefilter.setTime({
            from: moment_1.default(resp.start.epoch).toISOString(),
            to: moment_1.default(resp.end.epoch).toISOString(),
        });
    })
        .catch(resp => {
        notify_1.toastNotifications.addDanger(i18n_1.i18n.translate('xpack.ml.fullTimeRangeSelector.errorSettingTimeRangeNotification', {
            defaultMessage: 'An error occurred setting the time range.',
        }));
    });
}
exports.setFullTimeRange = setFullTimeRange;
