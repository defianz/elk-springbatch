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
const notify_1 = require("ui/notify");
const roles_api_1 = require("../../../../../lib/roles_api");
class ConfirmDeleteUI extends react_2.Component {
    constructor(props) {
        super(props);
        this.onConfirmDelete = () => {
            this.setState({
                deleteInProgress: true,
            }, () => {
                this.deleteRoles();
            });
        };
        this.deleteRoles = async () => {
            const { rolesToDelete, callback } = this.props;
            const errors = [];
            const deleteOperations = rolesToDelete.map(roleName => {
                const deleteRoleTask = async () => {
                    try {
                        await roles_api_1.RolesApi.deleteRole(roleName);
                        notify_1.toastNotifications.addSuccess(this.props.intl.formatMessage({
                            id: 'xpack.security.management.roles.confirmDelete.roleSuccessfullyDeletedNotificationMessage',
                            defaultMessage: 'Deleted role {roleName}',
                        }, { roleName }));
                    }
                    catch (e) {
                        errors.push(roleName);
                        notify_1.toastNotifications.addDanger(this.props.intl.formatMessage({
                            id: 'xpack.security.management.roles.confirmDelete.roleDeletingErrorNotificationMessage',
                            defaultMessage: 'Error deleting role {roleName}',
                        }, { roleName }));
                    }
                };
                return deleteRoleTask();
            });
            await Promise.all(deleteOperations);
            callback(rolesToDelete, errors);
        };
        this.state = {
            deleteInProgress: false,
        };
    }
    render() {
        const { rolesToDelete, intl } = this.props;
        const moreThanOne = rolesToDelete.length > 1;
        const title = intl.formatMessage({
            id: 'xpack.security.management.roles.deleteRoleTitle',
            defaultMessage: 'Delete role{value, plural, one {{roleName}} other {s}}',
        }, { value: rolesToDelete.length, roleName: ` ${rolesToDelete[0]}` });
        // This is largely the same as the built-in EuiConfirmModal component, but we needed the ability
        // to disable the buttons since this could be a long-running operation
        return (react_2.default.createElement(eui_1.EuiOverlayMask, null,
            react_2.default.createElement(eui_1.EuiModal, { onClose: this.props.onCancel },
                react_2.default.createElement(eui_1.EuiModalHeader, null,
                    react_2.default.createElement(eui_1.EuiModalHeaderTitle, { "data-test-subj": "confirmModalTitleText" }, title)),
                react_2.default.createElement(eui_1.EuiModalBody, null,
                    react_2.default.createElement(eui_1.EuiText, null,
                        moreThanOne ? (react_2.default.createElement(react_2.Fragment, null,
                            react_2.default.createElement("p", null,
                                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.roles.confirmDelete.removingRolesDescription", defaultMessage: "You are about to delete these roles:" })),
                            react_2.default.createElement("ul", null, rolesToDelete.map(roleName => (react_2.default.createElement("li", { key: roleName }, roleName)))))) : null,
                        react_2.default.createElement("p", null,
                            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.roles.deletingRolesWarningMessage", defaultMessage: "You can't undo this operation." })))),
                react_2.default.createElement(eui_1.EuiModalFooter, null,
                    react_2.default.createElement(eui_1.EuiButtonEmpty, { "data-test-subj": "confirmModalCancelButton", onClick: this.props.onCancel, isDisabled: this.state.deleteInProgress },
                        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.roles.confirmDelete.cancelButtonLabel", defaultMessage: "Cancel" })),
                    react_2.default.createElement(eui_1.EuiButton, { "data-test-subj": "confirmModalConfirmButton", onClick: this.onConfirmDelete, fill: true, color: 'danger', isLoading: this.state.deleteInProgress },
                        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.roles.confirmDelete.deleteButtonLabel", defaultMessage: "Delete" }))))));
    }
}
exports.ConfirmDelete = react_1.injectI18n(ConfirmDeleteUI);
