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
const delete_timeline_modal_1 = require("./delete_timeline_modal");
const i18n = tslib_1.__importStar(require("../translations"));
/**
 * Renders a button that when clicked, displays the `Delete Timeline` modal
 */
class DeleteTimelineModalButton extends React.PureComponent {
    constructor(props) {
        super(props);
        this.toggleShowModal = () => {
            this.setState(state => ({
                showModal: !state.showModal,
            }));
        };
        this.onDelete = () => {
            const { deleteTimelines, savedObjectId } = this.props;
            if (deleteTimelines != null && savedObjectId != null) {
                deleteTimelines([savedObjectId]);
            }
            this.toggleShowModal();
        };
        this.state = { showModal: false };
    }
    render() {
        const { deleteTimelines, savedObjectId, title } = this.props;
        return (React.createElement(React.Fragment, null,
            React.createElement(eui_1.EuiToolTip, { content: i18n.DELETE },
                React.createElement(eui_1.EuiButtonIcon, { "aria-label": i18n.DELETE, color: "subdued", "data-test-subj": "delete-timeline", iconSize: "s", iconType: "trash", isDisabled: deleteTimelines == null || savedObjectId == null || savedObjectId === '', onClick: this.toggleShowModal, size: "s" })),
            this.state.showModal ? (React.createElement(eui_1.EuiOverlayMask, null,
                React.createElement(eui_1.EuiModal, { maxWidth: delete_timeline_modal_1.DELETE_TIMELINE_MODAL_WIDTH, onClose: this.toggleShowModal },
                    React.createElement(delete_timeline_modal_1.DeleteTimelineModal, { "data-test-subj": "delete-timeline-modal", onDelete: this.onDelete, title: title, toggleShowModal: this.toggleShowModal })))) : null));
    }
}
exports.DeleteTimelineModalButton = DeleteTimelineModalButton;
