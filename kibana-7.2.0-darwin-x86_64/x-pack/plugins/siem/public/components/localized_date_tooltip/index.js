"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = require("@kbn/i18n/react");
const moment_1 = tslib_1.__importDefault(require("moment"));
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
exports.LocalizedDateTooltip = recompose_1.pure(({ children, date, fieldName }) => (React.createElement(eui_1.EuiToolTip, { "data-test-subj": "localized-date-tool-tip", content: React.createElement(eui_1.EuiFlexGroup, { "data-test-subj": "dates-container", direction: "column", gutterSize: "none" },
        fieldName != null ? (React.createElement(eui_1.EuiFlexItem, { grow: false },
            React.createElement("span", { "data-test-subj": "field-name" }, fieldName))) : null,
        React.createElement(eui_1.EuiFlexItem, { grow: false },
            React.createElement(react_1.FormattedRelative, { "data-test-subj": "humanized-relative-date", value: moment_1.default.utc(date).toDate() })),
        React.createElement(eui_1.EuiFlexItem, { "data-test-subj": "with-day-of-week", grow: false }, moment_1.default
            .utc(date)
            .local()
            .format('llll')),
        React.createElement(eui_1.EuiFlexItem, { "data-test-subj": "with-time-zone-offset-in-hours", grow: false }, moment_1.default(date).format())) },
    React.createElement(React.Fragment, null, children))));
