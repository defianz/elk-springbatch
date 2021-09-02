"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const eui_1 = require("@elastic/eui");
const i18n_1 = require("@kbn/i18n");
const job_details_pane_1 = require("./job_details_pane");
const job_json_pane_1 = require("./job_json_pane");
function getItemDescription(value) {
    if (typeof value === 'object') {
        return JSON.stringify(value);
    }
    return value.toString();
}
exports.ExpandedRow = ({ item }) => {
    const state = {
        title: 'State',
        items: Object.entries(item.state).map(s => {
            return { title: s[0].toString(), description: getItemDescription(s[1]) };
        }),
        position: 'left',
    };
    const stats = {
        title: 'Stats',
        items: Object.entries(item.stats).map(s => {
            return { title: s[0].toString(), description: getItemDescription(s[1]) };
        }),
        position: 'right',
    };
    const tabs = [
        {
            id: 'job-details',
            name: i18n_1.i18n.translate('xpack.ml.dataframe.jobsList.jobDetails.tabs.jobSettingsLabel', {
                defaultMessage: 'Job details',
            }),
            content: react_1.default.createElement(job_details_pane_1.JobDetailsPane, { sections: [state, stats] }),
        },
        {
            id: 'job-json',
            name: 'JSON',
            content: react_1.default.createElement(job_json_pane_1.JobJsonPane, { json: item.config }),
        },
    ];
    return (react_1.default.createElement(eui_1.EuiTabbedContent, { size: "s", tabs: tabs, initialSelectedTab: tabs[0], onTabClick: () => { }, expand: false }));
};
