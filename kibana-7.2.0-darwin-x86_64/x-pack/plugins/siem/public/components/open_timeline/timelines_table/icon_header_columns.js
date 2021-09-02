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
const common_styles_1 = require("./common_styles");
const helpers_1 = require("../helpers");
const i18n = tslib_1.__importStar(require("../translations"));
const PinnedIcon = styled_components_1.default(eui_1.EuiIcon) `
  position: relative;
  left: -3px;
`;
const CommentIcon = styled_components_1.default(eui_1.EuiIcon) `
  position: relative;
  left: -2px;
`;
/**
 * Returns the columns that have icon headers
 */
exports.getIconHeaderColumns = () => [
    {
        field: 'pinnedEventIds',
        name: (React.createElement(eui_1.EuiToolTip, { content: i18n.PINNED_EVENTS },
            React.createElement(PinnedIcon, { "data-test-subj": "pinned-event-header-icon", size: "m", color: "subdued", type: "pin" }))),
        render: (_, timelineResult) => (React.createElement("span", { "data-test-subj": "pinned-event-count" }, `${helpers_1.getPinnedEventCount(timelineResult)}`)),
        sortable: false,
        width: common_styles_1.ACTION_COLUMN_WIDTH,
    },
    {
        field: 'eventIdToNoteIds',
        name: (React.createElement(eui_1.EuiToolTip, { content: i18n.NOTES },
            React.createElement(CommentIcon, { "data-test-subj": "notes-count-header-icon", size: "m", color: "subdued", type: "editorComment" }))),
        render: (_, timelineResult) => React.createElement("span", { "data-test-subj": "notes-count" }, helpers_1.getNotesCount(timelineResult)),
        sortable: false,
        width: common_styles_1.ACTION_COLUMN_WIDTH,
    },
    {
        field: 'favorite',
        name: (React.createElement(eui_1.EuiToolTip, { content: i18n.FAVORITES },
            React.createElement(eui_1.EuiIcon, { "data-test-subj": "favorites-header-icon", size: "m", color: "subdued", type: "starEmpty" }))),
        render: (favorite) => {
            const isFavorite = favorite != null && favorite.length > 0;
            const fill = isFavorite ? 'starFilled' : 'starEmpty';
            return (React.createElement(common_styles_1.PositionedIcon, null,
                React.createElement(eui_1.EuiIcon, { "data-test-subj": `favorite-${fill}-star`, type: fill, size: "m" })));
        },
        sortable: false,
        width: common_styles_1.ACTION_COLUMN_WIDTH,
    },
];
