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
const category_columns_1 = require("./category_columns");
const helpers_1 = require("./helpers");
const i18n = tslib_1.__importStar(require("./translations"));
const CategoryNames = styled_components_1.default.div `
  ${({ height }) => `height: ${height}px`};
  overflow: auto;
  padding: 5px;
  ${({ width }) => `width: ${width}px`};
  thead {
    display: none;
  }
`;
const Title = styled_components_1.default(eui_1.EuiTitle) `
  padding-left: 5px;
`;
exports.CategoriesPane = recompose_1.pure(({ browserFields, filteredBrowserFields, isLoading, onCategorySelected, onUpdateColumns, selectedCategoryId, timelineId, width, }) => (React.createElement(React.Fragment, null,
    React.createElement(Title, { size: "xxs" },
        React.createElement("h5", null, i18n.CATEGORIES)),
    React.createElement(CategoryNames, { "data-test-subj": "categories-container", height: helpers_1.TABLE_HEIGHT, width: width },
        React.createElement(eui_1.EuiInMemoryTable, { columns: category_columns_1.getCategoryColumns({
                browserFields,
                filteredBrowserFields,
                isLoading,
                onCategorySelected,
                onUpdateColumns,
                selectedCategoryId,
                timelineId,
            }), items: Object.keys(filteredBrowserFields)
                .sort()
                .map(categoryId => ({ categoryId })), message: i18n.NO_FIELDS_MATCH, pagination: false, sorting: false })))));
