"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const recompose_1 = require("recompose");
const React = tslib_1.__importStar(require("react"));
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const category_1 = require("./category");
const field_items_1 = require("./field_items");
const helpers_1 = require("./helpers");
const i18n = tslib_1.__importStar(require("./translations"));
const NoFieldsPanel = styled_components_1.default.div `
  background-color: ${props => props.theme.eui.euiColorLightestShade};
  width: ${helpers_1.FIELDS_PANE_WIDTH}px;
  height: ${helpers_1.TABLE_HEIGHT}px;
`;
const NoFieldsFlexGroup = styled_components_1.default(eui_1.EuiFlexGroup) `
  height: 100%;
`;
exports.FieldsPane = recompose_1.pure(({ columnHeaders, filteredBrowserFields, isLoading, onCategorySelected, onUpdateColumns, searchInput, selectedCategoryId, timelineId, toggleColumn, width, }) => (React.createElement(React.Fragment, null, Object.keys(filteredBrowserFields).length > 0 ? (React.createElement(category_1.Category, { categoryId: selectedCategoryId, "data-test-subj": "category", filteredBrowserFields: filteredBrowserFields, fieldItems: field_items_1.getFieldItems({
        browserFields: filteredBrowserFields,
        category: filteredBrowserFields[selectedCategoryId],
        categoryId: selectedCategoryId,
        columnHeaders,
        highlight: searchInput,
        isLoading,
        onUpdateColumns,
        timelineId,
        toggleColumn,
    }), width: width, onCategorySelected: onCategorySelected, timelineId: timelineId })) : (React.createElement(NoFieldsPanel, null,
    React.createElement(NoFieldsFlexGroup, { alignItems: "center", gutterSize: "none", justifyContent: "center" },
        React.createElement(eui_1.EuiFlexItem, { grow: false },
            React.createElement("h3", { "data-test-subj": "no-fields-match" }, i18n.NO_FIELDS_MATCH_INPUT(searchInput)))))))));
