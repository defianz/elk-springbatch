"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const eui_1 = require("@elastic/eui");
const i18n_1 = require("@kbn/i18n");
const react_1 = require("@kbn/i18n/react");
const react_2 = tslib_1.__importStar(require("react"));
const notify_1 = require("ui/notify");
function getInitialState() {
    return {
        shouldValidate: false,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        currentPasswordError: false,
        changeInProgress: false,
    };
}
class ChangePasswordForm extends react_2.Component {
    constructor(props) {
        super(props);
        this.getForm = () => {
            return (react_2.default.createElement(eui_1.EuiForm, null,
                this.props.isUserChangingOwnPassword && (react_2.default.createElement(eui_1.EuiFormRow, Object.assign({}, this.validateCurrentPassword(), { fullWidth: true, label: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.account.changePasswordForm.currentPasswordLabel", defaultMessage: "Current password" }) }),
                    react_2.default.createElement(eui_1.EuiFieldText, { "data-test-subj": "currentPassword", type: "password", value: this.state.currentPassword, onChange: this.onCurrentPasswordChange, disabled: this.state.changeInProgress, fullWidth: true }))),
                react_2.default.createElement(eui_1.EuiFormRow, Object.assign({ helpText: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.account.changePasswordForm.passwordRequirements", defaultMessage: "Use at least 6 characters." }) }, this.validateNewPassword(), { fullWidth: true, label: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.account.changePasswordForm.newPasswordLabel", defaultMessage: "New password" }) }),
                    react_2.default.createElement(eui_1.EuiFieldText, { "data-test-subj": "newPassword", type: "password", value: this.state.newPassword, onChange: this.onNewPasswordChange, disabled: this.state.changeInProgress, fullWidth: true })),
                react_2.default.createElement(eui_1.EuiFormRow, Object.assign({}, this.validateConfirmPassword(), { fullWidth: true, label: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.account.changePasswordForm.confirmPasswordLabel", defaultMessage: "Confirm new password" }) }),
                    react_2.default.createElement(eui_1.EuiFieldText, { "data-test-subj": "confirmNewPassword", type: "password", value: this.state.confirmPassword, onChange: this.onConfirmPasswordChange, disabled: this.state.changeInProgress, fullWidth: true })),
                react_2.default.createElement(eui_1.EuiFormRow, null,
                    react_2.default.createElement(eui_1.EuiFlexGroup, { alignItems: "center", responsive: false },
                        react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                            react_2.default.createElement(eui_1.EuiButton, { onClick: this.onChangePasswordClick, fill: true, isLoading: this.state.changeInProgress, "data-test-subj": "changePasswordButton" },
                                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.account.changePasswordForm.saveChangesButtonLabel", defaultMessage: "Change password" }))),
                        react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                            react_2.default.createElement(eui_1.EuiButtonEmpty, { onClick: this.onCancelClick, isDisabled: this.state.changeInProgress },
                                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.account.changePasswordForm.cancelButtonLabel", defaultMessage: "Reset" })))))));
        };
        this.onCurrentPasswordChange = (e) => {
            this.setState({ currentPassword: e.target.value, currentPasswordError: false });
        };
        this.onNewPasswordChange = (e) => {
            this.setState({ newPassword: e.target.value });
        };
        this.onConfirmPasswordChange = (e) => {
            this.setState({ confirmPassword: e.target.value });
        };
        this.onCancelClick = () => {
            this.setState(getInitialState());
        };
        this.onChangePasswordClick = async () => {
            this.setState({ shouldValidate: true, currentPasswordError: false }, () => {
                const { isInvalid } = this.validateForm();
                if (isInvalid) {
                    return;
                }
                this.setState({ changeInProgress: true }, () => this.performPasswordChange());
            });
        };
        this.validateCurrentPassword = (shouldValidate = this.state.shouldValidate) => {
            if (!shouldValidate || !this.props.isUserChangingOwnPassword) {
                return {
                    isInvalid: false,
                };
            }
            if (this.state.currentPasswordError) {
                return {
                    isInvalid: true,
                    error: (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.account.changePasswordForm.invalidPassword", defaultMessage: "Current password is incorrect." })),
                };
            }
            if (!this.state.currentPassword) {
                return {
                    isInvalid: true,
                    error: (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.account.currentPasswordRequired", defaultMessage: "Current password is required." })),
                };
            }
            return {
                isInvalid: false,
            };
        };
        this.validateNewPassword = (shouldValidate = this.state.shouldValidate) => {
            const { newPassword } = this.state;
            const minPasswordLength = 6;
            if (shouldValidate && newPassword.length < minPasswordLength) {
                return {
                    isInvalid: true,
                    error: (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.account.passwordLengthDescription", defaultMessage: "Password is too short." })),
                };
            }
            return {
                isInvalid: false,
            };
        };
        this.validateConfirmPassword = (shouldValidate = this.state.shouldValidate) => {
            const { newPassword, confirmPassword } = this.state;
            if (shouldValidate && newPassword !== confirmPassword) {
                return {
                    isInvalid: true,
                    error: (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.account.passwordsDoNotMatch", defaultMessage: "Passwords do not match." })),
                };
            }
            return {
                isInvalid: false,
            };
        };
        this.validateForm = () => {
            const validation = [
                this.validateCurrentPassword(true),
                this.validateNewPassword(true),
                this.validateConfirmPassword(true),
            ];
            const firstFailure = validation.find(result => result.isInvalid);
            if (firstFailure) {
                return firstFailure;
            }
            return {
                isInvalid: false,
            };
        };
        this.performPasswordChange = async () => {
            try {
                await this.props.apiClient.changePassword(this.props.user.username, this.state.newPassword, this.state.currentPassword);
                this.handleChangePasswordSuccess();
            }
            catch (e) {
                this.handleChangePasswordFailure(e);
            }
            finally {
                this.setState({
                    changeInProgress: false,
                });
            }
        };
        this.handleChangePasswordSuccess = () => {
            notify_1.toastNotifications.addSuccess({
                title: i18n_1.i18n.translate('xpack.security.account.changePasswordSuccess', {
                    defaultMessage: 'Your password has been changed.',
                }),
                'data-test-subj': 'passwordUpdateSuccess',
            });
            this.setState({
                currentPasswordError: false,
                shouldValidate: false,
                newPassword: '',
                currentPassword: '',
                confirmPassword: '',
            });
            if (this.props.onChangePassword) {
                this.props.onChangePassword();
            }
        };
        this.handleChangePasswordFailure = (error) => {
            if (error.body && error.body.statusCode === 401) {
                this.setState({ currentPasswordError: true });
            }
            else {
                notify_1.toastNotifications.addDanger(i18n_1.i18n.translate('xpack.security.management.users.editUser.settingPasswordErrorMessage', {
                    defaultMessage: 'Error setting password: {message}',
                    values: { message: _.get(error, 'body.message') },
                }));
            }
        };
        this.state = getInitialState();
    }
    render() {
        return this.getForm();
    }
}
exports.ChangePasswordForm = ChangePasswordForm;
