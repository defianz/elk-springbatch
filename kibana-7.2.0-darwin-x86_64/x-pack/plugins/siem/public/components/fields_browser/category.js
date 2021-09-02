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
const category_title_1 = require("./category_title");
const field_items_1 = require("./field_items");
const helpers_1 = require("./helpers");
const TableContainer = styled_components_1.default.div `
  ${({ height }) => `height: ${height}px`};
  overflow-x: hidden;
  overflow-y: auto;
  ${({ width }) => `width: ${width}px`};
`;
exports.Category = recompose_1.pure(({ categoryId, filteredBrowserFields, fieldItems, timelineId, width }) => (React.createElement(React.Fragment, null,
    React.createElement(category_title_1.CategoryTitle, { categoryId: categoryId, filteredBrowserFields: filteredBrowserFields, timelineId: timelineId }),
    React.createElement(TableContainer, { "data-test-subj": "category-table-container", height: helpers_1.TABLE_HEIGHT, width: width },
        React.createElement(eui_1.EuiInMemoryTable, { items: fieldItems, columns: field_items_1.getFieldColumns(), pagination: false, sorting: true })))));
