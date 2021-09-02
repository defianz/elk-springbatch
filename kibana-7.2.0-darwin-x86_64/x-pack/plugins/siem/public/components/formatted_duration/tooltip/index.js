"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const react_1 = require("@kbn/i18n/react");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const helpers_1 = require("../helpers");
const P = styled_components_1.default.p `
  margin-bottom: 5px;
`;
exports.FormattedDurationTooltipContent = recompose_1.pure(({ maybeDurationNanoseconds, tooltipTitle }) => (React.createElement(React.Fragment, null,
    tooltipTitle != null ? React.createElement(P, { "data-test-subj": "title" }, tooltipTitle) : null,
    React.createElement(P, { "data-test-subj": "humanized" }, helpers_1.getHumanizedDuration(maybeDurationNanoseconds)),
    React.createElement(P, { "data-test-subj": "raw-value" },
        React.createElement(react_1.FormattedMessage, { id: "xpack.siem.formattedDuration.tooltipLabel", defaultMessage: "raw" }),
        ': ',
        maybeDurationNanoseconds))));
exports.FormattedDurationTooltip = recompose_1.pure(({ children, maybeDurationNanoseconds, tooltipTitle }) => (React.createElement(eui_1.EuiToolTip, { "data-test-subj": "formatted-duration-tooltip", content: React.createElement(exports.FormattedDurationTooltipContent, { maybeDurationNanoseconds: maybeDurationNanoseconds, tooltipTitle: tooltipTitle }) },
    React.createElement(React.Fragment, null, children))));
