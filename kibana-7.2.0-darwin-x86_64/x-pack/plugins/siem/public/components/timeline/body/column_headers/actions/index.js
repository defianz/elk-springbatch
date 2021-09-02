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
const sort_indicator_1 = require("../../sort/sort_indicator");
const helpers_1 = require("../header/helpers");
const i18n = tslib_1.__importStar(require("../translations"));
const CLOSE_BUTTON_SIZE = 25; // px
const SORT_INDICATOR_SIZE = 25; // px
exports.ACTIONS_WIDTH = SORT_INDICATOR_SIZE + CLOSE_BUTTON_SIZE; // px
const ActionsContainer = styled_components_1.default(eui_1.EuiFlexGroup) `
  height: 100%;
  width: ${exports.ACTIONS_WIDTH}px;
`;
const WrappedCloseButton = styled_components_1.default.div `
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
`;
/** Given a `header`, returns the `SortDirection` applicable to it */
exports.CloseButton = recompose_1.pure(({ columnId, onColumnRemoved, show }) => (React.createElement(WrappedCloseButton, { "data-test-subj": "wrapped-close-button", show: show },
    React.createElement(eui_1.EuiButtonIcon, { "aria-label": i18n.REMOVE_COLUMN, "data-test-subj": "remove-column", iconType: "cross", onClick: (event) => {
            // To avoid a re-sorting when you delete a column
            event.preventDefault();
            event.stopPropagation();
            onColumnRemoved(columnId);
        } }))));
exports.Actions = recompose_1.pure(({ header, isLoading, onColumnRemoved, show, sort }) => (React.createElement(ActionsContainer, { alignItems: "center", "data-test-subj": "header-actions", justifyContent: "center", gutterSize: "none" },
    React.createElement(eui_1.EuiFlexItem, { grow: false },
        React.createElement(sort_indicator_1.SortIndicator, { "data-test-subj": "header-sort-indicator", sortDirection: helpers_1.getSortDirection({ header, sort }) })),
    sort.columnId === header.id && isLoading ? (React.createElement(eui_1.EuiFlexItem, { grow: false },
        React.createElement(eui_1.EuiLoadingSpinner, { size: "l" }))) : (React.createElement(eui_1.EuiFlexItem, { grow: false },
        React.createElement(exports.CloseButton, { columnId: header.id, onColumnRemoved: onColumnRemoved, show: show }))))));
