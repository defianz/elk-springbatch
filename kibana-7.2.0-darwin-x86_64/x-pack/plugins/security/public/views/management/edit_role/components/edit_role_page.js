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
const lodash_1 = require("lodash");
const react_2 = tslib_1.__importStar(require("react"));
const notify_1 = require("ui/notify");
const model_1 = require("../../../../../common/model");
const role_utils_1 = require("../../../../lib/role_utils");
const objects_1 = require("../../../../objects");
const management_urls_1 = require("../../management_urls");
const validate_role_1 = require("../lib/validate_role");
const delete_role_button_1 = require("./delete_role_button");
const privileges_1 = require("./privileges");
const reserved_role_badge_1 = require("./reserved_role_badge");
class EditRolePageUI extends react_2.Component {
    constructor(props) {
        super(props);
        this.getFormTitle = () => {
            let titleText;
            const props = {
                tabIndex: 0,
            };
            if (role_utils_1.isReservedRole(this.props.role)) {
                titleText = (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.viewingRoleTitle", defaultMessage: "Viewing role" }));
                props['aria-describedby'] = 'reservedRoleDescription';
            }
            else if (this.editingExistingRole()) {
                titleText = (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.editRoleTitle", defaultMessage: "Edit role" }));
            }
            else {
                titleText = (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.createRoleTitle", defaultMessage: "Create role" }));
            }
            return (react_2.default.createElement(eui_1.EuiTitle, { size: "l" },
                react_2.default.createElement("h1", Object.assign({}, props),
                    titleText,
                    " ",
                    react_2.default.createElement(reserved_role_badge_1.ReservedRoleBadge, { role: this.props.role }))));
        };
        this.getActionButton = () => {
            if (this.editingExistingRole() && !role_utils_1.isReadOnlyRole(this.props.role)) {
                return (react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_2.default.createElement(delete_role_button_1.DeleteRoleButton, { canDelete: true, onDelete: this.handleDeleteRole })));
            }
            return null;
        };
        this.getRoleName = () => {
            return (react_2.default.createElement(eui_1.EuiPanel, null,
                react_2.default.createElement(eui_1.EuiFormRow, Object.assign({ label: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.roleNameFormRowTitle", defaultMessage: "Role name" }), helpText: !role_utils_1.isReservedRole(this.props.role) && this.editingExistingRole() ? (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.roleNameFormRowHelpText", defaultMessage: "A role's name cannot be changed once it has been created." })) : (undefined) }, this.validator.validateRoleName(this.state.role)),
                    react_2.default.createElement(eui_1.EuiFieldText, { name: 'name', value: this.state.role.name || '', onChange: this.onNameChange, "data-test-subj": 'roleFormNameInput', readOnly: role_utils_1.isReservedRole(this.props.role) || this.editingExistingRole() }))));
        };
        this.onNameChange = (e) => {
            const rawValue = e.target.value;
            const name = rawValue.replace(/\s/g, '_');
            this.setState({
                role: {
                    ...this.state.role,
                    name,
                },
            });
        };
        this.onRoleChange = (role) => {
            this.setState({
                role,
            });
        };
        this.getKibanaPrivileges = () => {
            return (react_2.default.createElement("div", null,
                react_2.default.createElement(eui_1.EuiSpacer, null),
                react_2.default.createElement(privileges_1.KibanaPrivilegesRegion, { kibanaPrivileges: new model_1.KibanaPrivileges(this.props.privileges), spaces: this.props.spaces, spacesEnabled: this.props.spacesEnabled, features: this.props.features, uiCapabilities: this.props.uiCapabilities, editable: !role_utils_1.isReadOnlyRole(this.state.role), role: this.state.role, onChange: this.onRoleChange, validator: this.validator, intl: this.props.intl })));
        };
        this.getFormButtons = () => {
            if (role_utils_1.isReadOnlyRole(this.props.role)) {
                return this.getReturnToRoleListButton();
            }
            return (react_2.default.createElement(eui_1.EuiFlexGroup, { responsive: false },
                react_2.default.createElement(eui_1.EuiFlexItem, { grow: false }, this.getSaveButton()),
                react_2.default.createElement(eui_1.EuiFlexItem, { grow: false }, this.getCancelButton()),
                react_2.default.createElement(eui_1.EuiFlexItem, { grow: true }),
                this.getActionButton()));
        };
        this.getReturnToRoleListButton = () => {
            return (react_2.default.createElement(eui_1.EuiButton, { onClick: this.backToRoleList, "data-test-subj": "roleFormReturnButton" },
                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.returnToRoleListButtonLabel", defaultMessage: "Return to role list" })));
        };
        this.getSaveButton = () => {
            const saveText = this.editingExistingRole() ? (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.updateRoleText", defaultMessage: "Update role" })) : (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.createRoleText", defaultMessage: "Create role" }));
            return (react_2.default.createElement(eui_1.EuiButton, { "data-test-subj": `roleFormSaveButton`, fill: true, onClick: this.saveRole, disabled: role_utils_1.isReservedRole(this.props.role) }, saveText));
        };
        this.getCancelButton = () => {
            return (react_2.default.createElement(eui_1.EuiButtonEmpty, { "data-test-subj": `roleFormCancelButton`, onClick: this.backToRoleList },
                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.cancelButtonLabel", defaultMessage: "Cancel" })));
        };
        this.editingExistingRole = () => {
            return !!this.props.role.name;
        };
        this.saveRole = () => {
            this.validator.enableValidation();
            const result = this.validator.validateForSave(this.state.role);
            if (result.isInvalid) {
                this.setState({
                    formError: result,
                });
            }
            else {
                this.setState({
                    formError: null,
                });
                const { httpClient, intl, spacesEnabled } = this.props;
                objects_1.saveRole(httpClient, this.state.role, spacesEnabled)
                    .then(() => {
                    notify_1.toastNotifications.addSuccess(intl.formatMessage({
                        id: 'xpack.security.management.editRole.roleSuccessfullySavedNotificationMessage',
                        defaultMessage: 'Saved role',
                    }));
                    this.backToRoleList();
                })
                    .catch((error) => {
                    notify_1.toastNotifications.addDanger(lodash_1.get(error, 'data.message'));
                });
            }
        };
        this.handleDeleteRole = () => {
            const { httpClient, role, intl } = this.props;
            objects_1.deleteRole(httpClient, role.name)
                .then(() => {
                notify_1.toastNotifications.addSuccess(intl.formatMessage({
                    id: 'xpack.security.management.editRole.roleSuccessfullyDeletedNotificationMessage',
                    defaultMessage: 'Deleted role',
                }));
                this.backToRoleList();
            })
                .catch((error) => {
                notify_1.toastNotifications.addDanger(lodash_1.get(error, 'data.message'));
            });
        };
        this.backToRoleList = () => {
            window.location.hash = management_urls_1.ROLES_PATH;
        };
        this.state = {
            role: props.role,
            formError: null,
        };
        this.validator = new validate_role_1.RoleValidator({ shouldValidate: false });
    }
    render() {
        const description = this.props.spacesEnabled ? (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.setPrivilegesToKibanaSpacesDescription", defaultMessage: "Set privileges on your Elasticsearch data and control access to your Kibana spaces." })) : (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.setPrivilegesToKibanaDescription", defaultMessage: "Set privileges on your Elasticsearch data and control access to Kibana." }));
        return (react_2.default.createElement("div", { className: "editRolePage" },
            react_2.default.createElement(eui_1.EuiForm, Object.assign({}, this.state.formError),
                this.getFormTitle(),
                react_2.default.createElement(eui_1.EuiSpacer, null),
                react_2.default.createElement(eui_1.EuiText, { size: "s" }, description),
                role_utils_1.isReservedRole(this.props.role) && (react_2.default.createElement(react_2.Fragment, null,
                    react_2.default.createElement(eui_1.EuiSpacer, { size: "s" }),
                    react_2.default.createElement(eui_1.EuiText, { size: "s", color: "subdued" },
                        react_2.default.createElement("p", { id: "reservedRoleDescription", tabIndex: 0 },
                            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.modifyingReversedRolesDescription", defaultMessage: "Reserved roles are built-in and cannot be removed or modified." }))))),
                react_2.default.createElement(eui_1.EuiSpacer, null),
                this.getRoleName(),
                this.getElasticsearchPrivileges(),
                this.getKibanaPrivileges(),
                react_2.default.createElement(eui_1.EuiSpacer, null),
                this.getFormButtons())));
    }
    getElasticsearchPrivileges() {
        return (react_2.default.createElement("div", null,
            react_2.default.createElement(eui_1.EuiSpacer, null),
            react_2.default.createElement(privileges_1.ElasticsearchPrivileges, { role: this.state.role, editable: !role_utils_1.isReadOnlyRole(this.state.role), httpClient: this.props.httpClient, onChange: this.onRoleChange, runAsUsers: this.props.runAsUsers, validator: this.validator, indexPatterns: this.props.indexPatterns, allowDocumentLevelSecurity: this.props.allowDocumentLevelSecurity, allowFieldLevelSecurity: this.props.allowFieldLevelSecurity })));
    }
}
exports.EditRolePage = react_1.injectI18n(EditRolePageUI);
