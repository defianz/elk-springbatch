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
const helpers_1 = require("../event_details/helpers");
const with_hover_actions_1 = require("../with_hover_actions");
const i18n = tslib_1.__importStar(require("./translations"));
const page_1 = require("../page");
const helpers_2 = require("./helpers");
const CategoryName = styled_components_1.default.span `
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
`;
const HoverActionsContainer = styled_components_1.default(eui_1.EuiPanel) `
  cursor: default;
  height: 25px;
  left: 5px;
  position: absolute;
  top: -5px;
  width: 30px;
`;
const HoverActionsFlexGroup = styled_components_1.default(eui_1.EuiFlexGroup) `
  cursor: pointer;
  left: -2px;
  position: relative;
  top: -6px;
`;
const LinkContainer = styled_components_1.default.div `
  width: 100%;
  .euiLink {
    width: 100%;
  }
`;
/**
 * Returns the column definition for the (single) column that displays all the
 * category names in the field browser */
exports.getCategoryColumns = ({ browserFields, filteredBrowserFields, isLoading, onCategorySelected, onUpdateColumns, selectedCategoryId, timelineId, }) => [
    {
        field: 'categoryId',
        sortable: true,
        truncateText: false,
        render: (categoryId) => (React.createElement(LinkContainer, null,
            React.createElement(eui_1.EuiLink, { "data-test-subj": "category-link", onClick: () => onCategorySelected(categoryId) },
                React.createElement(eui_1.EuiFlexGroup, { alignItems: "center", gutterSize: "none", justifyContent: "spaceBetween" },
                    React.createElement(eui_1.EuiFlexItem, { grow: false },
                        React.createElement(with_hover_actions_1.WithHoverActions, { hoverContent: React.createElement(HoverActionsContainer, { "data-test-subj": "hover-actions-container", paddingSize: "s" },
                                React.createElement(HoverActionsFlexGroup, { alignItems: "center", direction: "row", gutterSize: "none", justifyContent: "spaceBetween" },
                                    React.createElement(eui_1.EuiFlexItem, { grow: false },
                                        React.createElement(eui_1.EuiToolTip, { content: i18n.VIEW_CATEGORY(categoryId) }, !isLoading ? (React.createElement(eui_1.EuiIcon, { "aria-label": i18n.VIEW_CATEGORY(categoryId), color: "text", onClick: () => {
                                                onUpdateColumns(helpers_1.getColumnsWithTimestamp({
                                                    browserFields,
                                                    category: categoryId,
                                                }));
                                            }, type: "visTable" })) : (React.createElement(helpers_2.LoadingSpinner, { size: "m" })))))), render: () => (React.createElement(CategoryName, { bold: categoryId === selectedCategoryId, className: helpers_2.getCategoryPaneCategoryClassName({
                                    categoryId,
                                    timelineId,
                                }) }, categoryId)) })),
                    React.createElement(eui_1.EuiFlexItem, { grow: false },
                        React.createElement(page_1.CountBadge, { color: "hollow" }, helpers_2.getFieldCount(filteredBrowserFields[categoryId]))))))),
    },
];
