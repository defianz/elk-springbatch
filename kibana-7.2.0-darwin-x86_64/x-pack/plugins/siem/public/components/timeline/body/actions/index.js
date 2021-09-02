"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const fp_1 = require("lodash/fp");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const pin_1 = require("../../../pin");
const helpers_1 = require("../../properties/helpers");
const helpers_2 = require("../helpers");
const i18n = tslib_1.__importStar(require("../translations"));
const ActionsContainer = styled_components_1.default.div `
  border-top: 1px solid ${({ theme }) => theme.eui.euiColorLightShade};
  overflow: hidden;
  padding-top: 4px;
  width: ${({ actionsColumnWidth }) => actionsColumnWidth}px;
`;
const ExpandEventContainer = styled_components_1.default.div `
  height: 25px;
  width: 25px;
`;
const ActionLoading = styled_components_1.default(eui_1.EuiLoadingSpinner) `
  margin-top: 3px;
  margin-left: 6px;
`;
const PinContainer = styled_components_1.default.div `
  width: 27px;
`;
const SelectEventContainer = styled_components_1.default(eui_1.EuiFlexItem) `
  padding: 4px 0 0 7px;
`;
const NotesButtonContainer = styled_components_1.default(eui_1.EuiFlexItem) `
  margin-left: 5px;
`;
const emptyNotes = [];
exports.Actions = recompose_1.pure(({ actionsColumnWidth, associateNote, checked, expanded, eventId, eventIsPinned, getNotesByIds, loading = false, noteIds, onEventToggled, onPinClicked, showCheckboxes, showNotes, toggleShowNotes, updateNote, }) => (React.createElement(ActionsContainer, { actionsColumnWidth: actionsColumnWidth, "data-test-subj": "event-actions-container" },
    React.createElement(eui_1.EuiFlexGroup, { alignItems: "flexStart", "data-test-subj": "event-actions", direction: "row", gutterSize: "none", justifyContent: "spaceBetween" },
        showCheckboxes && (React.createElement(SelectEventContainer, { "data-test-subj": "select-event-container", grow: false },
            React.createElement(eui_1.EuiCheckbox, { "data-test-subj": "select-event", id: eventId, checked: checked, onChange: fp_1.noop }))),
        React.createElement(eui_1.EuiFlexItem, { grow: false },
            React.createElement(ExpandEventContainer, null,
                loading && React.createElement(ActionLoading, { size: "m" }),
                !loading && (React.createElement(eui_1.EuiButtonIcon, { "aria-label": expanded ? i18n.COLLAPSE : i18n.EXPAND, color: "subdued", iconType: expanded ? 'arrowDown' : 'arrowRight', "data-test-subj": "expand-event", id: eventId, onClick: onEventToggled })))),
        React.createElement(eui_1.EuiFlexItem, { grow: false },
            React.createElement(eui_1.EuiToolTip, { "data-test-subj": "timeline-action-pin-tool-tip", content: helpers_2.getPinTooltip({
                    isPinned: eventIsPinned,
                    eventHasNotes: helpers_2.eventHasNotes(noteIds),
                }) },
                React.createElement(PinContainer, null,
                    React.createElement(pin_1.Pin, { allowUnpinning: !helpers_2.eventHasNotes(noteIds), pinned: eventIsPinned, "data-test-subj": "pin-event", onClick: onPinClicked })))),
        React.createElement(NotesButtonContainer, { grow: false },
            React.createElement(helpers_1.NotesButton, { animate: false, associateNote: associateNote, "data-test-subj": "add-note", getNotesByIds: getNotesByIds, noteIds: noteIds || emptyNotes, showNotes: showNotes, size: "s", toggleShowNotes: toggleShowNotes, toolTip: i18n.NOTES_TOOLTIP, updateNote: updateNote }))))));
