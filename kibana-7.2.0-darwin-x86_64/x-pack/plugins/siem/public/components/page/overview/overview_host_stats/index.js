"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const numeral_1 = tslib_1.__importDefault(require("@elastic/numeral"));
const react_1 = require("@kbn/i18n/react");
const fp_1 = require("lodash/fp");
const react_2 = tslib_1.__importDefault(require("react"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const empty_value_1 = require("../../../empty_value");
const overviewHostStats = (data) => [
    {
        description: fp_1.has('auditbeatAuditd', data) && data.auditbeatAuditd !== null
            ? numeral_1.default(data.auditbeatAuditd).format('0,0')
            : empty_value_1.getEmptyTagValue(),
        title: (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.siem.overview.auditBeatAuditTitle", defaultMessage: "Auditbeat Audit" })),
    },
    {
        description: fp_1.has('auditbeatFIM', data) && data.auditbeatFIM !== null
            ? numeral_1.default(data.auditbeatFIM).format('0,0')
            : empty_value_1.getEmptyTagValue(),
        title: (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.siem.overview.auditBeatFimTitle", defaultMessage: "Auditbeat File Integrity Module" })),
    },
    {
        description: fp_1.has('auditbeatLogin', data) && data.auditbeatLogin !== null
            ? numeral_1.default(data.auditbeatLogin).format('0,0')
            : empty_value_1.getEmptyTagValue(),
        title: (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.siem.overview.auditBeatLoginTitle", defaultMessage: "Auditbeat Login" })),
    },
    {
        description: fp_1.has('auditbeatPackage', data) && data.auditbeatPackage !== null
            ? numeral_1.default(data.auditbeatPackage).format('0,0')
            : empty_value_1.getEmptyTagValue(),
        title: (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.siem.overview.auditBeatPackageTitle", defaultMessage: "Auditbeat Package" })),
    },
    {
        description: fp_1.has('auditbeatProcess', data) && data.auditbeatProcess !== null
            ? numeral_1.default(data.auditbeatProcess).format('0,0')
            : empty_value_1.getEmptyTagValue(),
        title: (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.siem.overview.auditBeatProcessTitle", defaultMessage: "Auditbeat Process" })),
    },
    {
        description: fp_1.has('auditbeatUser', data) && data.auditbeatUser !== null
            ? numeral_1.default(data.auditbeatUser).format('0,0')
            : empty_value_1.getEmptyTagValue(),
        title: (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.siem.overview.auditBeatUserTitle", defaultMessage: "Auditbeat User" })),
    },
    {
        description: fp_1.has('filebeatSystemModule', data) && data.filebeatSystemModule !== null
            ? numeral_1.default(data.filebeatSystemModule).format('0,0')
            : empty_value_1.getEmptyTagValue(),
        title: (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.siem.overview.filebeatSystemModuleTitle", defaultMessage: "Filebeat System Module" })),
    },
    {
        description: fp_1.has('winlogbeat', data) && data.winlogbeat !== null
            ? numeral_1.default(data.winlogbeat).format('0,0')
            : empty_value_1.getEmptyTagValue(),
        title: (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.siem.overview.winlogbeatTitle", defaultMessage: "Winlogbeat" })),
    },
];
exports.DescriptionListDescription = styled_components_1.default(eui_1.EuiDescriptionListDescription) `
  text-align: right;
`;
const StatValue = recompose_1.pure(({ isLoading, value }) => (react_2.default.createElement(react_2.default.Fragment, null, isLoading ? react_2.default.createElement(eui_1.EuiLoadingSpinner, { size: "m" }) : value != null ? value : empty_value_1.getEmptyTagValue())));
exports.OverviewHostStats = recompose_1.pure(({ data, loading }) => (react_2.default.createElement(eui_1.EuiDescriptionList, { type: "column" }, overviewHostStats(data).map((item, index) => (react_2.default.createElement(react_2.default.Fragment, { key: index },
    react_2.default.createElement(eui_1.EuiDescriptionListTitle, null, item.title),
    react_2.default.createElement(exports.DescriptionListDescription, { "data-test-subj": "stat-loader-description" },
        react_2.default.createElement(StatValue, { isLoading: loading, value: item.description }))))))));
