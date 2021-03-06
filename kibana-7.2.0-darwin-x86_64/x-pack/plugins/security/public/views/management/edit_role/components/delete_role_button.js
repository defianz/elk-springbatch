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
const react_2 = tslib_1.__importStar(require("react"));
class DeleteRoleButton extends react_2.Component {
    constructor() {
        super(...arguments);
        this.state = {
            showModal: false,
        };
        this.maybeShowModal = () => {
            if (!this.state.showModal) {
                return null;
            }
            return (react_2.default.createElement(eui_1.EuiOverlayMask, null,
                react_2.default.createElement(eui_1.EuiConfirmModal, { title: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.deleteRoleButton.deleteRoleTitle", defaultMessage: "Delete Role" }), onCancel: this.closeModal, onConfirm: this.onConfirmDelete, cancelButtonText: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.deleteRoleButton.cancelButtonLabel", defaultMessage: "No, don't delete" }), confirmButtonText: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.deleteRoleButton.confirmButtonLabel", defaultMessage: "Yes, delete role" }), buttonColor: 'danger' },
                    react_2.default.createElement("p", null,
                        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.deleteRoleButton.deletingRoleConfirmationText", defaultMessage: "Are you sure you want to delete this role?" })),
                    react_2.default.createElement("p", null,
                        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.deleteRoleButton.deletingRoleWarningText", defaultMessage: "This action cannot be undone!" })))));
        };
        this.closeModal = () => {
            this.setState({
                showModal: false,
            });
        };
        this.showModal = () => {
            this.setState({
                showModal: true,
            });
        };
        this.onConfirmDelete = () => {
            this.closeModal();
            this.props.onDelete();
        };
    }
    render() {
        if (!this.props.canDelete) {
            return null;
        }
        return (react_2.default.createElement(react_2.Fragment, null,
            react_2.default.createElement(eui_1.EuiButtonEmpty, { color: 'danger', onClick: this.showModal },
                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.deleteRoleButton.deleteRoleButtonLabel", defaultMessage: "Delete role" })),
            this.maybeShowModal()));
    }
}
exports.DeleteRoleButton = DeleteRoleButton;
