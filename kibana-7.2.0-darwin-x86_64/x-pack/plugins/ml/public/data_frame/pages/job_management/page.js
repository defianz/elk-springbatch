"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_2 = require("@kbn/i18n/react");
const i18n_1 = require("@kbn/i18n");
const eui_1 = require("@elastic/eui");
const create_job_button_1 = require("./components/create_job_button");
const job_list_1 = require("./components/job_list");
exports.Page = () => (react_1.default.createElement(eui_1.EuiPage, null,
    react_1.default.createElement(eui_1.EuiPageBody, null,
        react_1.default.createElement(eui_1.EuiPageContentHeader, null,
            react_1.default.createElement(eui_1.EuiPageContentHeaderSection, null,
                react_1.default.createElement(eui_1.EuiTitle, null,
                    react_1.default.createElement("h1", null,
                        react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.ml.dataframe.jobsList.dataFrameTitle", defaultMessage: "Data frame jobs" }),
                        react_1.default.createElement("span", null, "\u00A0"),
                        react_1.default.createElement(eui_1.EuiBetaBadge, { label: i18n_1.i18n.translate('xpack.ml.dataframe.jobsList.betaBadgeLabel', {
                                defaultMessage: `Beta`,
                            }), tooltipContent: i18n_1.i18n.translate('xpack.ml.dataframe.jobsList.betaBadgeTooltipContent', {
                                defaultMessage: `Data frames are a beta feature. We'd love to hear your feedback.`,
                            }) })))),
            react_1.default.createElement(eui_1.EuiPageContentHeaderSection, null,
                react_1.default.createElement(create_job_button_1.CreateJobButton, null))),
        react_1.default.createElement(eui_1.EuiPageContentBody, null,
            react_1.default.createElement(eui_1.EuiSpacer, { size: "l" }),
            react_1.default.createElement(eui_1.EuiPanel, null,
                react_1.default.createElement(job_list_1.DataFrameJobList, null))))));
