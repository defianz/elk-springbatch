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
const with_copy_to_clipboard_1 = require("../../lib/clipboard/with_copy_to_clipboard");
const with_hover_actions_1 = require("../with_hover_actions");
const helpers_1 = require("./helpers");
const i18n = tslib_1.__importStar(require("./translations"));
/**
 * The name of a (draggable) field
 */
exports.FieldNameContainer = styled_components_1.default.span `
  padding: 5px;
  &:hover {
    transition: background-color 0.7s ease;
    background-color: #000;
    color: #fff;
  }
`;
const HoverActionsContainer = styled_components_1.default(eui_1.EuiPanel) `
  cursor: default;
  height: 25px;
  left: 5px;
  position: absolute;
  top: 3px;
`;
const HoverActionsFlexGroup = styled_components_1.default(eui_1.EuiFlexGroup) `
  cursor: pointer;
  position: relative;
  top: -8px;
`;
const ViewCategoryIcon = styled_components_1.default(eui_1.EuiIcon) `
  margin-left: 5px;
`;
/** Renders a field name in it's non-dragging state */
exports.FieldName = recompose_1.pure(({ categoryId, categoryColumns, fieldId, highlight = '', isLoading, onUpdateColumns }) => (React.createElement(with_hover_actions_1.WithHoverActions, { hoverContent: React.createElement(HoverActionsContainer, { "data-test-subj": "hover-actions-container", paddingSize: "s" },
        React.createElement(HoverActionsFlexGroup, { alignItems: "center", direction: "row", gutterSize: "none", justifyContent: "spaceBetween" },
            React.createElement(eui_1.EuiFlexItem, { grow: false },
                React.createElement(eui_1.EuiToolTip, { content: i18n.COPY_TO_CLIPBOARD },
                    React.createElement(with_copy_to_clipboard_1.WithCopyToClipboard, { text: fieldId, titleSummary: i18n.FIELD }))),
            categoryColumns.length > 0 && (React.createElement(eui_1.EuiFlexItem, { grow: false },
                React.createElement(eui_1.EuiToolTip, { content: i18n.VIEW_CATEGORY(categoryId) }, !isLoading ? (React.createElement(ViewCategoryIcon, { "aria-label": i18n.VIEW_CATEGORY(categoryId), color: "text", onClick: () => {
                        onUpdateColumns(categoryColumns);
                    }, type: "visTable" })) : (React.createElement(helpers_1.LoadingSpinner, { size: "m" }))))))), render: () => (React.createElement(exports.FieldNameContainer, null,
        React.createElement(eui_1.EuiHighlight, { search: highlight }, fieldId))) })));
