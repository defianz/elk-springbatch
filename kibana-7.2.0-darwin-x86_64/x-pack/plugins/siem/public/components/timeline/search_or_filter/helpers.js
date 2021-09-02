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
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const and_or_badge_1 = require("../../and_or_badge");
const i18n = tslib_1.__importStar(require("./translations"));
const AndOrContainer = styled_components_1.default.div `
  position: relative;
  top: -1px;
`;
exports.modes = {
    filter: {
        mode: 'filter',
        description: i18n.FILTER_DESCRIPTION,
        kqlBarTooltip: i18n.FILTER_KQL_TOOLTIP,
        placeholder: i18n.FILTER_KQL_PLACEHOLDER,
        selectText: i18n.FILTER_KQL_SELECTED_TEXT,
    },
    search: {
        mode: 'search',
        description: i18n.SEARCH_DESCRIPTION,
        kqlBarTooltip: i18n.SEARCH_KQL_TOOLTIP,
        placeholder: i18n.SEARCH_KQL_PLACEHOLDER,
        selectText: i18n.SEARCH_KQL_SELECTED_TEXT,
    },
};
exports.options = [
    {
        value: exports.modes.filter.mode,
        inputDisplay: (React.createElement(AndOrContainer, null,
            React.createElement(and_or_badge_1.AndOrBadge, { type: "and" }),
            exports.modes.filter.selectText)),
        dropdownDisplay: (React.createElement(React.Fragment, null,
            React.createElement(and_or_badge_1.AndOrBadge, { type: "and" }),
            React.createElement("strong", null, exports.modes.filter.selectText),
            React.createElement(eui_1.EuiSpacer, { size: "xs" }),
            React.createElement(eui_1.EuiText, { size: "s", color: "subdued" },
                React.createElement("p", { className: "euiTextColor--subdued" }, exports.modes.filter.description)))),
    },
    {
        value: exports.modes.search.mode,
        inputDisplay: (React.createElement(AndOrContainer, null,
            React.createElement(and_or_badge_1.AndOrBadge, { type: "or" }),
            exports.modes.search.selectText)),
        dropdownDisplay: (React.createElement(React.Fragment, null,
            React.createElement(and_or_badge_1.AndOrBadge, { type: "or" }),
            React.createElement("strong", null, exports.modes.search.selectText),
            React.createElement(eui_1.EuiSpacer, { size: "xs" }),
            React.createElement(eui_1.EuiText, { size: "s", color: "subdued" },
                React.createElement("p", { className: "euiTextColor--subdued" }, exports.modes.search.description)))),
    },
];
exports.getPlaceholderText = (kqlMode) => kqlMode === 'filter' ? i18n.FILTER_KQL_PLACEHOLDER : i18n.SEARCH_KQL_PLACEHOLDER;
