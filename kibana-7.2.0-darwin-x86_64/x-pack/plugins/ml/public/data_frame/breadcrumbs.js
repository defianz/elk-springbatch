"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
// @ts-ignore
const breadcrumbs_1 = require("../breadcrumbs");
function getJobManagementBreadcrumbs() {
    // Whilst top level nav menu with tabs remains,
    // use root ML breadcrumb.
    return [breadcrumbs_1.ML_BREADCRUMB];
}
exports.getJobManagementBreadcrumbs = getJobManagementBreadcrumbs;
function getDataFrameBreadcrumbs() {
    return [
        breadcrumbs_1.ML_BREADCRUMB,
        {
            text: i18n_1.i18n.translate('xpack.ml.dataFrameBreadcrumbs.dataFrameLabel', {
                defaultMessage: 'Data Frames',
            }),
            href: '',
        },
    ];
}
exports.getDataFrameBreadcrumbs = getDataFrameBreadcrumbs;
const DATA_FRAME_HOME = {
    text: i18n_1.i18n.translate('xpack.ml.dataFrameBreadcrumbs.dataFrameLabel', {
        defaultMessage: 'Data Frames',
    }),
    href: '#/data_frames',
};
function getDataFrameCreateBreadcrumbs() {
    return [
        breadcrumbs_1.ML_BREADCRUMB,
        DATA_FRAME_HOME,
        {
            text: i18n_1.i18n.translate('xpack.ml.dataFrameBreadcrumbs.dataFrameCreateLabel', {
                defaultMessage: 'Create data frame',
            }),
            href: '',
        },
    ];
}
exports.getDataFrameCreateBreadcrumbs = getDataFrameCreateBreadcrumbs;
function getDataFrameIndexOrSearchBreadcrumbs() {
    return [
        breadcrumbs_1.ML_BREADCRUMB,
        DATA_FRAME_HOME,
        {
            text: i18n_1.i18n.translate('xpack.ml.dataFrameBreadcrumbs.selectIndexOrSearchLabel', {
                defaultMessage: 'Select index or search',
            }),
            href: '',
        },
    ];
}
exports.getDataFrameIndexOrSearchBreadcrumbs = getDataFrameIndexOrSearchBreadcrumbs;
