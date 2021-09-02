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
const styled_components_1 = tslib_1.__importStar(require("styled-components"));
const super_date_picker_1 = require("../../super_date_picker");
const helpers_1 = require("./helpers");
const styles_1 = require("./styles");
const i18n = tslib_1.__importStar(require("./translations"));
const open_timeline_modal_1 = require("../../open_timeline/open_timeline_modal");
// SIDE EFFECT: the following `injectGlobal` overrides `EuiPopover`
// and `EuiToolTip` global styles:
// eslint-disable-next-line no-unused-expressions
styled_components_1.injectGlobal `
  .euiPopover__panel.euiPopover__panel-isOpen {
    z-index: 9900 !important;
  }
  .euiToolTip {
    z-index: 9950 !important;
  }
`;
const Avatar = styled_components_1.default(eui_1.EuiAvatar) `
  margin-left: 5px;
`;
const DescriptionPopoverMenuContainer = styled_components_1.default.div `
  margin-top: 15px;
`;
const SettingsIcon = styled_components_1.default(eui_1.EuiIcon) `
  margin-left: 4px;
  cursor: pointer;
`;
const HiddenFlexItem = styled_components_1.default(eui_1.EuiFlexItem) `
  display: none;
`;
const rightGutter = 60; // px
exports.datePickerThreshold = 600;
exports.showNotesThreshold = 810;
exports.showDescriptionThreshold = 970;
const starIconWidth = 30;
const nameWidth = 155;
const descriptionWidth = 165;
const noteWidth = 130;
const settingsWidth = 50;
/** Displays the properties of a timeline, i.e. name, description, notes, etc */
class Properties extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onButtonClick = () => {
            this.setState(prevState => ({
                showActions: !prevState.showActions,
            }));
        };
        this.onToggleShowNotes = () => {
            this.setState(state => ({ showNotes: !state.showNotes }));
        };
        this.onClosePopover = () => {
            this.setState({
                showActions: false,
            });
        };
        this.toggleLock = () => {
            this.props.toggleLock({ linkToId: 'timeline' });
        };
        this.state = {
            showActions: false,
            showNotes: false,
        };
    }
    render() {
        const { associateNote, createTimeline, description, getNotesByIds, isFavorite, isDatepickerLocked, title, noteIds, timelineId, updateDescription, updateIsFavorite, updateTitle, updateNote, usersViewing, width, } = this.props;
        const datePickerWidth = width -
            rightGutter -
            starIconWidth -
            nameWidth -
            (width >= exports.showDescriptionThreshold ? descriptionWidth : 0) -
            noteWidth -
            settingsWidth;
        return (React.createElement(styles_1.TimelineProperties, { "data-test-subj": "timeline-properties", width: width },
            React.createElement(styles_1.PropertiesLeft, { alignItems: "center", "data-test-subj": "properties-left", gutterSize: "s" },
                React.createElement(eui_1.EuiFlexItem, { grow: false },
                    React.createElement(helpers_1.StarIcon, { isFavorite: isFavorite, timelineId: timelineId, updateIsFavorite: updateIsFavorite })),
                React.createElement(helpers_1.Name, { timelineId: timelineId, title: title, updateTitle: updateTitle }),
                width >= exports.showDescriptionThreshold ? (React.createElement(eui_1.EuiFlexItem, { grow: 2 },
                    React.createElement(helpers_1.Description, { description: description, timelineId: timelineId, updateDescription: updateDescription }))) : null,
                width >= exports.showNotesThreshold ? (React.createElement(eui_1.EuiFlexItem, { grow: false },
                    React.createElement(helpers_1.NotesButton, { animate: true, associateNote: associateNote, getNotesByIds: getNotesByIds, noteIds: noteIds, showNotes: this.state.showNotes, size: "l", text: i18n.NOTES, toggleShowNotes: this.onToggleShowNotes, toolTip: i18n.NOTES_TOOL_TIP, updateNote: updateNote }))) : null,
                React.createElement(eui_1.EuiFlexItem, { grow: 1 },
                    React.createElement(eui_1.EuiFlexGroup, { alignItems: "center", gutterSize: "none", "data-test-subj": "timeline-date-picker-container" },
                        React.createElement(styles_1.LockIconContainer, { grow: false },
                            React.createElement(eui_1.EuiToolTip, { "data-test-subj": "timeline-date-picker-lock-tooltip", position: "top", content: isDatepickerLocked
                                    ? i18n.LOCK_SYNC_MAIN_DATE_PICKER_TOOL_TIP
                                    : i18n.UNLOCK_SYNC_MAIN_DATE_PICKER_TOOL_TIP },
                                React.createElement(eui_1.EuiButtonIcon, { "data-test-subj": `timeline-date-picker-${isDatepickerLocked ? 'lock' : 'unlock'}-button`, color: "primary", onClick: this.toggleLock, iconType: isDatepickerLocked ? 'lock' : 'lockOpen', "aria-label": isDatepickerLocked
                                        ? i18n.UNLOCK_SYNC_MAIN_DATE_PICKER_ARIA
                                        : i18n.LOCK_SYNC_MAIN_DATE_PICKER_ARIA }))),
                        React.createElement(styles_1.DatePicker, { grow: 1, width: datePickerWidth > exports.datePickerThreshold ? exports.datePickerThreshold : datePickerWidth },
                            React.createElement(super_date_picker_1.SuperDatePicker, { id: "timeline", timelineId: timelineId }))))),
            React.createElement(styles_1.PropertiesRight, { alignItems: "flexStart", "data-test-subj": "properties-right", gutterSize: "s" },
                React.createElement(eui_1.EuiFlexItem, { grow: false },
                    React.createElement(eui_1.EuiPopover, { anchorPosition: "downRight", button: React.createElement(SettingsIcon, { "data-test-subj": "settings-gear", type: "gear", size: "l", onClick: this.onButtonClick }), id: "timelineSettingsPopover", isOpen: this.state.showActions, closePopover: this.onClosePopover },
                        React.createElement(eui_1.EuiFlexGroup, { alignItems: "flexStart", direction: "column", gutterSize: "none" },
                            React.createElement(eui_1.EuiFlexItem, { grow: false },
                                React.createElement(helpers_1.NewTimeline, { createTimeline: createTimeline, onClosePopover: this.onClosePopover, timelineId: timelineId })),
                            React.createElement(eui_1.EuiFlexItem, { grow: false },
                                React.createElement(open_timeline_modal_1.OpenTimelineModalButton, null)),
                            width < exports.showNotesThreshold ? (React.createElement(eui_1.EuiFlexItem, { grow: false },
                                React.createElement(helpers_1.NotesButton, { animate: true, associateNote: associateNote, getNotesByIds: getNotesByIds, noteIds: noteIds, showNotes: this.state.showNotes, size: "l", text: i18n.NOTES, toggleShowNotes: this.onToggleShowNotes, toolTip: i18n.NOTES_TOOL_TIP, updateNote: updateNote }))) : null,
                            width < exports.showDescriptionThreshold ? (React.createElement(eui_1.EuiFlexItem, { grow: false },
                                React.createElement(DescriptionPopoverMenuContainer, null,
                                    React.createElement(helpers_1.Description, { description: description, timelineId: timelineId, updateDescription: updateDescription })))) : null))),
                title != null && title.length
                    ? usersViewing.map(user => (
                    // Hide the hard-coded elastic user avatar as the 7.2 release does not implement
                    // support for multi-user-collaboration as proposed in elastic/ingest-dev#395
                    React.createElement(HiddenFlexItem, { key: user },
                        React.createElement(eui_1.EuiToolTip, { "data-test-subj": "timeline-action-pin-tool-tip", content: `${user} ${i18n.IS_VIEWING}` },
                            React.createElement(Avatar, { "data-test-subj": "avatar", size: "s", name: user })))))
                    : null)));
    }
}
exports.Properties = Properties;
