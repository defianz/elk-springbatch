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
const common_styles_1 = require("./common_styles");
const delete_timeline_modal_1 = require("../delete_timeline_modal");
const i18n = tslib_1.__importStar(require("../translations"));
/**
 * Returns the action columns (e.g. delete, open duplicate timeline)
 */
exports.getActionsColumns = ({ onOpenTimeline, deleteTimelines, showDeleteAction, }) => {
    const deleteTimelineColumn = {
        align: 'center',
        field: 'savedObjectId',
        render: (savedObjectId, { title }) => (React.createElement(common_styles_1.PositionedIcon, null,
            React.createElement(delete_timeline_modal_1.DeleteTimelineModalButton, { deleteTimelines: deleteTimelines, savedObjectId: savedObjectId, title: title }))),
        sortable: false,
        width: common_styles_1.ACTION_COLUMN_WIDTH,
    };
    const openAsDuplicateColumn = {
        align: 'center',
        field: 'savedObjectId',
        render: (savedObjectId, timelineResult) => (React.createElement(common_styles_1.PositionedIcon, null,
            React.createElement(eui_1.EuiToolTip, { content: i18n.OPEN_AS_DUPLICATE },
                React.createElement(eui_1.EuiButtonIcon, { "aria-label": i18n.OPEN_AS_DUPLICATE, color: "subdued", "data-test-subj": "open-duplicate", isDisabled: savedObjectId == null, iconSize: "s", iconType: "copy", onClick: () => onOpenTimeline({
                        duplicate: true,
                        timelineId: `${timelineResult.savedObjectId}`,
                    }), size: "s" })))),
        sortable: false,
        width: common_styles_1.ACTION_COLUMN_WIDTH,
    };
    return showDeleteAction && deleteTimelines != null
        ? [deleteTimelineColumn, openAsDuplicateColumn]
        : [openAsDuplicateColumn];
};
