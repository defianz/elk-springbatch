"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const eui_1 = require("@elastic/eui");
const notify_1 = require("ui/notify");
const react_2 = require("@kbn/i18n/react");
class ConfirmDeleteUI extends react_1.Component {
    constructor() {
        super(...arguments);
        this.deleteUsers = () => {
            const { usersToDelete, callback, apiClient } = this.props;
            const errors = [];
            usersToDelete.forEach(async (username) => {
                try {
                    await apiClient.deleteUser(username);
                    notify_1.toastNotifications.addSuccess(this.props.intl.formatMessage({
                        id: 'xpack.security.management.users.confirmDelete.userSuccessfullyDeletedNotificationMessage',
                        defaultMessage: 'Deleted user {username}',
                    }, { username }));
                }
                catch (e) {
                    errors.push(username);
                    notify_1.toastNotifications.addDanger(this.props.intl.formatMessage({
                        id: 'xpack.security.management.users.confirmDelete.userDeletingErrorNotificationMessage',
                        defaultMessage: 'Error deleting user {username}',
                    }, { username }));
                }
                if (callback) {
                    callback(usersToDelete, errors);
                }
            });
        };
    }
    render() {
        const { usersToDelete, onCancel, intl } = this.props;
        const moreThanOne = usersToDelete.length > 1;
        const title = moreThanOne
            ? intl.formatMessage({
                id: 'xpack.security.management.users.confirmDelete.deleteMultipleUsersTitle',
                defaultMessage: 'Delete {userLength} users',
            }, { userLength: usersToDelete.length })
            : intl.formatMessage({
                id: 'xpack.security.management.users.confirmDelete.deleteOneUserTitle',
                defaultMessage: 'Delete user {userLength}',
            }, { userLength: usersToDelete[0] });
        return (react_1.default.createElement(eui_1.EuiOverlayMask, null,
            react_1.default.createElement(eui_1.EuiConfirmModal, { title: title, onCancel: onCancel, onConfirm: this.deleteUsers, cancelButtonText: intl.formatMessage({
                    id: 'xpack.security.management.users.confirmDelete.cancelButtonLabel',
                    defaultMessage: 'Cancel',
                }), confirmButtonText: intl.formatMessage({
                    id: 'xpack.security.management.users.confirmDelete.confirmButtonLabel',
                    defaultMessage: 'Delete',
                }), buttonColor: "danger" },
                react_1.default.createElement("div", null,
                    moreThanOne ? (react_1.default.createElement(react_1.Fragment, null,
                        react_1.default.createElement("p", null,
                            react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.security.management.users.confirmDelete.removingUsersDescription", defaultMessage: "You are about to delete these users:" })),
                        react_1.default.createElement("ul", null, usersToDelete.map(username => (react_1.default.createElement("li", { key: username }, username)))))) : null,
                    react_1.default.createElement("p", null,
                        react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.security.management.users.confirmDelete.removingUsersWarningMessage", defaultMessage: "This operation cannot be undone." }))))));
    }
}
exports.ConfirmDeleteUsers = react_2.injectI18n(ConfirmDeleteUI);
