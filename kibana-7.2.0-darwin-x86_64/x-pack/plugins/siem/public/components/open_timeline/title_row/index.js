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
const i18n = tslib_1.__importStar(require("../translations"));
const ButtonFlexItem = styled_components_1.default(eui_1.EuiFlexItem) `
  margin-left: 5px;
`;
const TitleRowFlexGroup = styled_components_1.default(eui_1.EuiFlexGroup) `
  user-select: none;
`;
/**
 * Renders the row containing the tile (e.g. Open Timelines / All timelines)
 * and action buttons (i.e. Favorite Selected and Delete Selected)
 */
exports.TitleRow = recompose_1.pure(({ onAddTimelinesToFavorites, onDeleteSelected, selectedTimelinesCount, title }) => (React.createElement(TitleRowFlexGroup, { alignItems: "flexStart", direction: "row", gutterSize: "none", justifyContent: "spaceBetween" },
    React.createElement(eui_1.EuiFlexItem, { grow: true },
        React.createElement(eui_1.EuiTitle, { "data-test-subj": "title", size: "m" },
            React.createElement("h2", null, title))),
    onAddTimelinesToFavorites && (React.createElement(ButtonFlexItem, { grow: false },
        React.createElement(eui_1.EuiButton, { "data-test-subj": "favorite-selected", iconSide: "left", iconType: "starEmptySpace", isDisabled: selectedTimelinesCount === 0, onClick: onAddTimelinesToFavorites }, i18n.FAVORITE_SELECTED))),
    onDeleteSelected && (React.createElement(ButtonFlexItem, { grow: false },
        React.createElement(eui_1.EuiButton, { "data-test-subj": "delete-selected", iconSide: "left", iconType: "trash", isDisabled: selectedTimelinesCount === 0, onClick: onDeleteSelected }, i18n.DELETE_SELECTED))))));
