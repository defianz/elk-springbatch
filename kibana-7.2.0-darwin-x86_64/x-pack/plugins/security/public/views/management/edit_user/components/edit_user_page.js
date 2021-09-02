"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const lodash_1 = require("lodash");
const react_1 = tslib_1.__importStar(require("react"));
const eui_1 = require("@elastic/eui");
const notify_1 = require("ui/notify");
const react_2 = require("@kbn/i18n/react");
const validate_user_1 = require("../../../../lib/validate_user");
const management_urls_1 = require("../../../../views/management/management_urls");
const users_1 = require("../../../../components/management/users");
const change_password_form_1 = require("../../../../components/management/change_password_form");
class EditUserPageUI extends react_1.Component {
    constructor(props) {
        super(props);
        this.handleDelete = (usernames, errors) => {
            if (errors.length === 0) {
                const { changeUrl } = this.props;
                changeUrl(management_urls_1.USERS_PATH);
            }
        };
        this.saveUser = async () => {
            this.validator.enableValidation();
            const result = this.validator.validateForSave(this.state.user, this.state.isNewUser);
            if (result.isInvalid) {
                this.setState({
                    formError: result,
                });
            }
            else {
                this.setState({
                    formError: null,
                });
                const { changeUrl, apiClient } = this.props;
                const { user, isNewUser, selectedRoles } = this.state;
                const userToSave = { ...user };
                if (!isNewUser) {
                    delete userToSave.password;
                }
                delete userToSave.confirmPassword;
                userToSave.roles = selectedRoles.map(selectedRole => {
                    return selectedRole.label;
                });
                try {
                    await apiClient.saveUser(userToSave);
                    notify_1.toastNotifications.addSuccess(this.props.intl.formatMessage({
                        id: 'xpack.security.management.users.editUser.userSuccessfullySavedNotificationMessage',
                        defaultMessage: 'Saved user {message}',
                    }, { message: user.username }));
                    changeUrl(management_urls_1.USERS_PATH);
                }
                catch (e) {
                    notify_1.toastNotifications.addDanger(this.props.intl.formatMessage({
                        id: 'xpack.security.management.users.editUser.savingUserErrorMessage',
                        defaultMessage: 'Error saving user: {message}',
                    }, { message: lodash_1.get(e, 'body.message', 'Unknown error') }));
                }
            }
        };
        this.passwordFields = () => {
            return (react_1.default.createElement(react_1.Fragment, null,
                react_1.default.createElement(eui_1.EuiFormRow, Object.assign({ label: this.props.intl.formatMessage({
                        id: 'xpack.security.management.users.editUser.passwordFormRowLabel',
                        defaultMessage: 'Password',
                    }) }, this.validator.validatePassword(this.state.user)),
                    react_1.default.createElement(eui_1.EuiFieldText, { "data-test-subj": "passwordInput", name: "password", type: "password", onChange: this.onPasswordChange })),
                react_1.default.createElement(eui_1.EuiFormRow, Object.assign({ label: this.props.intl.formatMessage({
                        id: 'xpack.security.management.users.editUser.confirmPasswordFormRowLabel',
                        defaultMessage: 'Confirm password',
                    }) }, this.validator.validateConfirmPassword(this.state.user)),
                    react_1.default.createElement(eui_1.EuiFieldText, { "data-test-subj": "passwordConfirmationInput", onChange: this.onConfirmPasswordChange, name: "confirm_password", type: "password" }))));
        };
        this.changePasswordForm = () => {
            const { showChangePasswordForm, user, currentUser } = this.state;
            const userIsLoggedInUser = Boolean(currentUser && user.username && user.username === currentUser.username);
            if (!showChangePasswordForm) {
                return null;
            }
            return (react_1.default.createElement(react_1.Fragment, null,
                react_1.default.createElement(eui_1.EuiHorizontalRule, null),
                user.username === 'kibana' ? (react_1.default.createElement(react_1.Fragment, null,
                    react_1.default.createElement(eui_1.EuiCallOut, { title: this.props.intl.formatMessage({
                            id: 'xpack.security.management.users.editUser.changePasswordExtraStepTitle',
                            defaultMessage: 'Extra step needed',
                        }), color: "warning", iconType: "help" },
                        react_1.default.createElement("p", null,
                            react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.security.management.users.editUser.changePasswordUpdateKibanaTitle", defaultMessage: "After you change the password for the kibana user, you must update the {kibana}\n                  file and restart Kibana.", values: { kibana: 'kibana.yml' } }))),
                    react_1.default.createElement(eui_1.EuiSpacer, null))) : null,
                react_1.default.createElement(change_password_form_1.ChangePasswordForm, { user: this.state.user, isUserChangingOwnPassword: userIsLoggedInUser, onChangePassword: this.toggleChangePasswordForm, apiClient: this.props.apiClient })));
        };
        this.toggleChangePasswordForm = () => {
            const { showChangePasswordForm } = this.state;
            this.setState({ showChangePasswordForm: !showChangePasswordForm });
        };
        this.onUsernameChange = (e) => {
            const user = {
                ...this.state.user,
                username: e.target.value || '',
            };
            const formError = this.validator.validateForSave(user, this.state.isNewUser);
            this.setState({
                user,
                formError,
            });
        };
        this.onEmailChange = (e) => {
            const user = {
                ...this.state.user,
                email: e.target.value || '',
            };
            const formError = this.validator.validateForSave(user, this.state.isNewUser);
            this.setState({
                user,
                formError,
            });
        };
        this.onFullNameChange = (e) => {
            const user = {
                ...this.state.user,
                full_name: e.target.value || '',
            };
            const formError = this.validator.validateForSave(user, this.state.isNewUser);
            this.setState({
                user,
                formError,
            });
        };
        this.onPasswordChange = (e) => {
            const user = {
                ...this.state.user,
                password: e.target.value || '',
            };
            const formError = this.validator.validateForSave(user, this.state.isNewUser);
            this.setState({
                user,
                formError,
            });
        };
        this.onConfirmPasswordChange = (e) => {
            const user = {
                ...this.state.user,
                confirmPassword: e.target.value || '',
            };
            const formError = this.validator.validateForSave(user, this.state.isNewUser);
            this.setState({
                user,
                formError,
            });
        };
        this.onRolesChange = (selectedRoles) => {
            this.setState({
                selectedRoles,
            });
        };
        this.cannotSaveUser = () => {
            const { user, isNewUser } = this.state;
            const result = this.validator.validateForSave(user, isNewUser);
            return result.isInvalid;
        };
        this.onCancelDelete = () => {
            this.setState({ showDeleteConfirmation: false });
        };
        this.validator = new validate_user_1.UserValidator({ shouldValidate: false });
        this.state = {
            isLoaded: false,
            isNewUser: true,
            currentUser: null,
            showChangePasswordForm: false,
            showDeleteConfirmation: false,
            user: {
                email: '',
                username: '',
                full_name: '',
                roles: [],
                enabled: true,
                password: '',
                confirmPassword: '',
            },
            roles: [],
            selectedRoles: [],
            formError: null,
        };
    }
    async componentDidMount() {
        const { username, apiClient } = this.props;
        let { user, currentUser } = this.state;
        if (username) {
            try {
                user = {
                    ...(await apiClient.getUser(username)),
                    password: '',
                    confirmPassword: '',
                };
                currentUser = await apiClient.getCurrentUser();
            }
            catch (err) {
                notify_1.toastNotifications.addDanger({
                    title: this.props.intl.formatMessage({
                        id: 'xpack.security.management.users.editUser.errorLoadingUserTitle',
                        defaultMessage: 'Error loading user',
                    }),
                    text: lodash_1.get(err, 'body.message') || err.message,
                });
                return;
            }
        }
        let roles = [];
        try {
            roles = await apiClient.getRoles();
        }
        catch (err) {
            notify_1.toastNotifications.addDanger({
                title: this.props.intl.formatMessage({
                    id: 'xpack.security.management.users.editUser.errorLoadingRolesTitle',
                    defaultMessage: 'Error loading roles',
                }),
                text: lodash_1.get(err, 'body.message') || err.message,
            });
        }
        this.setState({
            isLoaded: true,
            isNewUser: !username,
            currentUser,
            user,
            roles,
            selectedRoles: user.roles.map(role => ({ label: role })) || [],
        });
    }
    render() {
        const { changeUrl, intl } = this.props;
        const { user, roles, selectedRoles, showChangePasswordForm, isNewUser, showDeleteConfirmation, } = this.state;
        const reserved = user.metadata && user.metadata._reserved;
        if (!user || !roles) {
            return null;
        }
        if (!this.state.isLoaded) {
            return null;
        }
        return (react_1.default.createElement("div", { className: "secUsersEditPage" },
            react_1.default.createElement(eui_1.EuiPageContent, { className: "secUsersEditPage__content" },
                react_1.default.createElement(eui_1.EuiPageContentHeader, null,
                    react_1.default.createElement(eui_1.EuiPageContentHeaderSection, null,
                        react_1.default.createElement(eui_1.EuiTitle, null,
                            react_1.default.createElement("h2", null, isNewUser ? (react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.security.management.users.editUser.newUserTitle", defaultMessage: "New user" })) : (react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.security.management.users.editUser.editUserTitle", defaultMessage: "Edit {userName} user", values: { userName: user.username } }))))),
                    reserved && (react_1.default.createElement(eui_1.EuiPageContentHeaderSection, null,
                        react_1.default.createElement(eui_1.EuiIcon, { type: "lock", size: "l", color: "subdued" })))),
                react_1.default.createElement(eui_1.EuiPageContentBody, null,
                    reserved && (react_1.default.createElement(eui_1.EuiText, { size: "s", color: "subdued" },
                        react_1.default.createElement("p", null,
                            react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.security.management.users.editUser.modifyingReservedUsersDescription", defaultMessage: "Reserved users are built-in and cannot be removed or modified. Only the password\n                    may be changed." })))),
                    showDeleteConfirmation ? (react_1.default.createElement(users_1.ConfirmDeleteUsers, { onCancel: this.onCancelDelete, usersToDelete: [user.username], callback: this.handleDelete, apiClient: this.props.apiClient })) : null,
                    react_1.default.createElement("form", { onSubmit: event => {
                            event.preventDefault();
                        } },
                        react_1.default.createElement(eui_1.EuiForm, Object.assign({}, this.state.formError),
                            react_1.default.createElement(eui_1.EuiFormRow, Object.assign({}, this.validator.validateUsername(this.state.user), { helpText: !isNewUser && !reserved
                                    ? intl.formatMessage({
                                        id: 'xpack.security.management.users.editUser.changingUserNameAfterCreationDescription',
                                        defaultMessage: `Usernames can't be changed after creation.`,
                                    })
                                    : null, label: intl.formatMessage({
                                    id: 'xpack.security.management.users.editUser.usernameFormRowLabel',
                                    defaultMessage: 'Username',
                                }) }),
                                react_1.default.createElement(eui_1.EuiFieldText, { value: user.username || '', name: "username", "data-test-subj": "userFormUserNameInput", disabled: !isNewUser, onChange: this.onUsernameChange })),
                            isNewUser ? this.passwordFields() : null,
                            reserved ? null : (react_1.default.createElement(react_1.Fragment, null,
                                react_1.default.createElement(eui_1.EuiFormRow, { label: intl.formatMessage({
                                        id: 'xpack.security.management.users.editUser.fullNameFormRowLabel',
                                        defaultMessage: 'Full name',
                                    }) },
                                    react_1.default.createElement(eui_1.EuiFieldText, { "data-test-subj": "userFormFullNameInput", name: "full_name", value: user.full_name || '', onChange: this.onFullNameChange })),
                                react_1.default.createElement(eui_1.EuiFormRow, Object.assign({}, this.validator.validateEmail(this.state.user), { label: intl.formatMessage({
                                        id: 'xpack.security.management.users.editUser.emailAddressFormRowLabel',
                                        defaultMessage: 'Email address',
                                    }) }),
                                    react_1.default.createElement(eui_1.EuiFieldText, { "data-test-subj": "userFormEmailInput", name: "email", value: user.email || '', onChange: this.onEmailChange })))),
                            react_1.default.createElement(eui_1.EuiFormRow, { label: intl.formatMessage({
                                    id: 'xpack.security.management.users.editUser.rolesFormRowLabel',
                                    defaultMessage: 'Roles',
                                }) },
                                react_1.default.createElement(eui_1.EuiComboBox, { "data-test-subj": "userFormRolesDropdown", placeholder: intl.formatMessage({
                                        id: 'xpack.security.management.users.editUser.addRolesPlaceholder',
                                        defaultMessage: 'Add roles',
                                    }), onChange: this.onRolesChange, isDisabled: reserved, options: roles.map(role => {
                                        return { 'data-test-subj': `roleOption-${role.name}`, label: role.name };
                                    }), selectedOptions: selectedRoles })),
                            isNewUser || showChangePasswordForm ? null : (react_1.default.createElement(eui_1.EuiFormRow, { label: "Password" },
                                react_1.default.createElement(eui_1.EuiLink, { onClick: this.toggleChangePasswordForm },
                                    react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.security.management.users.editUser.changePasswordButtonLabel", defaultMessage: "Change password" })))),
                            this.changePasswordForm(),
                            react_1.default.createElement(eui_1.EuiHorizontalRule, null),
                            reserved && (react_1.default.createElement(eui_1.EuiButton, { onClick: () => changeUrl(management_urls_1.USERS_PATH) },
                                react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.security.management.users.editUser.returnToUserListButtonLabel", defaultMessage: "Return to user list" }))),
                            reserved ? null : (react_1.default.createElement(eui_1.EuiFlexGroup, { responsive: false },
                                react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                                    react_1.default.createElement(eui_1.EuiButton, { disabled: this.cannotSaveUser(), fill: true, "data-test-subj": "userFormSaveButton", onClick: () => this.saveUser() }, isNewUser ? (react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.security.management.users.editUser.createUserButtonLabel", defaultMessage: "Create user" })) : (react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.security.management.users.editUser.updateUserButtonLabel", defaultMessage: "Update user" })))),
                                react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                                    react_1.default.createElement(eui_1.EuiButtonEmpty, { "data-test-subj": "userFormCancelButton", onClick: () => changeUrl(management_urls_1.USERS_PATH) },
                                        react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.security.management.users.editUser.cancelButtonLabel", defaultMessage: "Cancel" }))),
                                react_1.default.createElement(eui_1.EuiFlexItem, { grow: true }),
                                isNewUser || reserved ? null : (react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                                    react_1.default.createElement(eui_1.EuiButtonEmpty, { onClick: () => {
                                            this.setState({ showDeleteConfirmation: true });
                                        }, "data-test-subj": "userFormDeleteButton", color: "danger" },
                                        react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.security.management.users.editUser.deleteUserButtonLabel", defaultMessage: "Delete user" }))))))))))));
    }
}
exports.EditUserPage = react_2.injectI18n(EditUserPageUI);
