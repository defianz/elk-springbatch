"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const i18n_1 = require("@kbn/i18n");
const eui_1 = require("@elastic/eui");
exports.JobDetailsSummary = react_1.default.memo(({ createIndexPattern, jobId, targetIndex, touched }) => {
    if (touched === false) {
        return null;
    }
    const targetIndexHelpText = createIndexPattern
        ? i18n_1.i18n.translate('xpack.ml.dataframe.jobDetailsSummary.createIndexPatternMessage', {
            defaultMessage: 'A Kibana index pattern will be created for this job.',
        })
        : '';
    return (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement(eui_1.EuiFormRow, { label: i18n_1.i18n.translate('xpack.ml.dataframe.jobDetailsSummary.jobIdLabel', {
                defaultMessage: 'Job id',
            }) },
            react_1.default.createElement(eui_1.EuiFieldText, { defaultValue: jobId, disabled: true })),
        react_1.default.createElement(eui_1.EuiFormRow, { helpText: targetIndexHelpText, label: i18n_1.i18n.translate('xpack.ml.dataframe.jobDetailsSummary.targetIndexLabel', {
                defaultMessage: 'Target index',
            }) },
            react_1.default.createElement(eui_1.EuiFieldText, { defaultValue: targetIndex, disabled: true }))));
});
