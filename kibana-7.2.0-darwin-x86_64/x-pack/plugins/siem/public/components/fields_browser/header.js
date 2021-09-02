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
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const default_headers_1 = require("../timeline/body/column_headers/default_headers");
const helpers_1 = require("./helpers");
const i18n = tslib_1.__importStar(require("./translations"));
const CountsFlexGroup = styled_components_1.default(eui_1.EuiFlexGroup) `
  margin-top: 5px;
`;
const CountFlexItem = styled_components_1.default(eui_1.EuiFlexItem) `
  margin-right: 5px;
`;
// background-color: ${props => props.theme.eui.euiColorLightestShade};
const HeaderContainer = styled_components_1.default.div `
  padding: 16px;
  margin-bottom: 8px;
`;
const SearchContainer = styled_components_1.default.div `
  input {
    max-width: ${helpers_1.SEARCH_INPUT_WIDTH}px;
    width: ${helpers_1.SEARCH_INPUT_WIDTH}px;
  }
`;
const CountRow = recompose_1.pure(({ filteredBrowserFields }) => (React.createElement(CountsFlexGroup, { alignItems: "center", "data-test-subj": "counts-flex-group", direction: "row", gutterSize: "none" },
    React.createElement(CountFlexItem, { grow: false },
        React.createElement(eui_1.EuiText, { color: "subdued", "data-test-subj": "categories-count", size: "xs" }, i18n.CATEGORIES_COUNT(Object.keys(filteredBrowserFields).length))),
    React.createElement(CountFlexItem, { grow: false },
        React.createElement(eui_1.EuiText, { color: "subdued", "data-test-subj": "fields-count", size: "xs" }, i18n.FIELDS_COUNT(Object.keys(filteredBrowserFields).reduce((fieldsCount, category) => helpers_1.getFieldCount(filteredBrowserFields[category]) + fieldsCount, 0)))))));
const TitleRow = recompose_1.pure(({ onOutsideClick, onUpdateColumns }) => (React.createElement(eui_1.EuiFlexGroup, { alignItems: "center", justifyContent: "spaceBetween", direction: "row", gutterSize: "none" },
    React.createElement(eui_1.EuiFlexItem, { grow: false },
        React.createElement(eui_1.EuiTitle, { size: "s" },
            React.createElement("h2", null, i18n.CUSTOMIZE_COLUMNS))),
    React.createElement(eui_1.EuiFlexItem, { grow: false },
        React.createElement(eui_1.EuiButtonEmpty, { onClick: () => {
                onUpdateColumns(default_headers_1.defaultHeaders);
                onOutsideClick();
            } }, i18n.RESET_FIELDS)))));
exports.Header = recompose_1.pure(({ isSearching, filteredBrowserFields, onOutsideClick, onSearchInputChange, onUpdateColumns, searchInput, timelineId, }) => (React.createElement(HeaderContainer, null,
    React.createElement(TitleRow, { onUpdateColumns: onUpdateColumns, onOutsideClick: onOutsideClick }),
    React.createElement(SearchContainer, null,
        React.createElement(eui_1.EuiFieldSearch, { className: helpers_1.getFieldBrowserSearchInputClassName(timelineId), isLoading: isSearching, onChange: onSearchInputChange, placeholder: i18n.FILTER_PLACEHOLDER, value: searchInput })),
    React.createElement(CountRow, { filteredBrowserFields: filteredBrowserFields }))));
