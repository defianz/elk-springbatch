"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = require("@kbn/i18n/react");
const recompose_1 = require("recompose");
const React = tslib_1.__importStar(require("react"));
const i18n = tslib_1.__importStar(require("../translations"));
exports.DELETE_TIMELINE_MODAL_WIDTH = 600; // px
/**
 * Renders a modal that confirms deletion of a timeline
 */
exports.DeleteTimelineModal = recompose_1.pure(({ title, toggleShowModal, onDelete }) => (React.createElement(eui_1.EuiConfirmModal, { title: React.createElement(react_1.FormattedMessage, { id: "xpack.siem.open.timeline.deleteTimelineModalTitle", "data-test-subj": "title", defaultMessage: "Delete `{title}`?", values: {
            title: title != null && title.trim().length > 0 ? title.trim() : i18n.UNTITLED_TIMELINE,
        } }), onCancel: toggleShowModal, onConfirm: onDelete, cancelButtonText: i18n.CANCEL, confirmButtonText: i18n.DELETE, buttonColor: "danger", defaultFocusedButton: eui_1.EUI_MODAL_CONFIRM_BUTTON },
    React.createElement("div", { "data-test-subj": "warning" }, i18n.DELETE_WARNING))));
