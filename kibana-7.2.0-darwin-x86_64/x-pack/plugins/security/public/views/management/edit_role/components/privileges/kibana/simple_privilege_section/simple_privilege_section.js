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
const privilege_utils_1 = require("../../../../../../../lib/privilege_utils");
const role_utils_1 = require("../../../../../../../lib/role_utils");
const constants_1 = require("../../../../lib/constants");
const feature_table_1 = require("../feature_table");
const unsupported_space_privileges_warning_1 = require("./unsupported_space_privileges_warning");
class SimplePrivilegeSection extends react_2.Component {
    constructor(props) {
        super(props);
        this.getDisplayedBasePrivilege = () => {
            if (this.state.isCustomizingGlobalPrivilege) {
                return constants_1.CUSTOM_PRIVILEGE_VALUE;
            }
            const { role } = this.props;
            const form = this.locateGlobalPrivilege(role);
            return form && form.base.length > 0 ? form.base[0] : constants_1.NO_PRIVILEGE_VALUE;
        };
        this.onKibanaPrivilegeChange = (privilege) => {
            const role = role_utils_1.copyRole(this.props.role);
            const form = this.locateGlobalPrivilege(role) || this.createGlobalPrivilegeEntry(role);
            if (privilege === constants_1.NO_PRIVILEGE_VALUE) {
                // Remove global entry if no privilege value
                role.kibana = role.kibana.filter(entry => !privilege_utils_1.isGlobalPrivilegeDefinition(entry));
            }
            else if (privilege === constants_1.CUSTOM_PRIVILEGE_VALUE) {
                // Remove base privilege if customizing feature privileges
                form.base = [];
            }
            else {
                form.base = [privilege];
                form.feature = {};
            }
            this.props.onChange(role);
            this.setState({
                isCustomizingGlobalPrivilege: privilege === constants_1.CUSTOM_PRIVILEGE_VALUE,
                globalPrivsIndex: role.kibana.indexOf(form),
            });
        };
        this.onFeaturePrivilegeChange = (featureId, privileges) => {
            const role = role_utils_1.copyRole(this.props.role);
            const form = this.locateGlobalPrivilege(role) || this.createGlobalPrivilegeEntry(role);
            if (privileges.length > 0) {
                form.feature[featureId] = [...privileges];
            }
            else {
                delete form.feature[featureId];
            }
            this.props.onChange(role);
        };
        this.onChangeAllFeaturePrivileges = (privileges) => {
            const role = role_utils_1.copyRole(this.props.role);
            const form = this.locateGlobalPrivilege(role) || this.createGlobalPrivilegeEntry(role);
            if (privileges.length > 0) {
                this.props.features.forEach(feature => {
                    form.feature[feature.id] = [...privileges];
                });
            }
            else {
                form.feature = {};
            }
            this.props.onChange(role);
        };
        this.maybeRenderSpacePrivilegeWarning = () => {
            const kibanaPrivileges = this.props.role.kibana;
            const hasSpacePrivileges = kibanaPrivileges.some(privilege => !privilege_utils_1.isGlobalPrivilegeDefinition(privilege));
            if (hasSpacePrivileges) {
                return (react_2.default.createElement(eui_1.EuiFormRow, { fullWidth: true },
                    react_2.default.createElement(unsupported_space_privileges_warning_1.UnsupportedSpacePrivilegesWarning, null)));
            }
            return null;
        };
        this.locateGlobalPrivilegeIndex = (role) => {
            return role.kibana.findIndex(privileges => privilege_utils_1.isGlobalPrivilegeDefinition(privileges));
        };
        this.locateGlobalPrivilege = (role) => {
            const spacePrivileges = role.kibana;
            return spacePrivileges.find(privileges => privilege_utils_1.isGlobalPrivilegeDefinition(privileges));
        };
        const globalPrivs = this.locateGlobalPrivilege(props.role);
        const globalPrivsIndex = this.locateGlobalPrivilegeIndex(props.role);
        this.state = {
            isCustomizingGlobalPrivilege: Boolean(globalPrivs && Object.keys(globalPrivs.feature).length > 0),
            globalPrivsIndex,
        };
    }
    render() {
        const kibanaPrivilege = this.getDisplayedBasePrivilege();
        const privilegeCalculator = this.props.privilegeCalculatorFactory.getInstance(this.props.role);
        const calculatedPrivileges = privilegeCalculator.calculateEffectivePrivileges()[this.state.globalPrivsIndex];
        const allowedPrivileges = privilegeCalculator.calculateAllowedPrivileges()[this.state.globalPrivsIndex];
        const hasReservedPrivileges = calculatedPrivileges &&
            calculatedPrivileges.reserved != null &&
            calculatedPrivileges.reserved.length > 0;
        const description = (react_2.default.createElement("p", null,
            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.simplePrivilegeForm.specifyPrivilegeForRoleDescription", defaultMessage: "Specifies the Kibana privilege for this role." })));
        return (react_2.default.createElement(react_2.Fragment, null,
            react_2.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_2.default.createElement("h3", null,
                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.simplePrivilegeForm.kibanaPrivilegesTitle", defaultMessage: "Kibana privileges" })), description: description },
                react_2.default.createElement(eui_1.EuiFormRow, { hasEmptyLabelSpace: true }, hasReservedPrivileges ? (react_2.default.createElement(eui_1.EuiComboBox, { fullWidth: true, selectedOptions: calculatedPrivileges.reserved.map(privilege => ({
                        label: privilege,
                    })), isDisabled: true })) : (react_2.default.createElement(eui_1.EuiSuperSelect, { disabled: !this.props.editable, onChange: this.onKibanaPrivilegeChange, options: [
                        {
                            value: constants_1.NO_PRIVILEGE_VALUE,
                            inputDisplay: (react_2.default.createElement(eui_1.EuiText, null,
                                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.simplePrivilegeForm.noPrivilegeInput", defaultMessage: "None" }))),
                            dropdownDisplay: (react_2.default.createElement(eui_1.EuiText, null,
                                react_2.default.createElement("strong", null,
                                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.simplePrivilegeForm.noPrivilegeDropdown", defaultMessage: "None" })),
                                react_2.default.createElement("p", null,
                                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.simplePrivilegeForm.noPrivilegeDropdownDescription", defaultMessage: "No access to Kibana" })))),
                        },
                        {
                            value: constants_1.CUSTOM_PRIVILEGE_VALUE,
                            inputDisplay: (react_2.default.createElement(eui_1.EuiText, null,
                                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.simplePrivilegeForm.customPrivilegeInput", defaultMessage: "Custom" }))),
                            dropdownDisplay: (react_2.default.createElement(eui_1.EuiText, null,
                                react_2.default.createElement("strong", null,
                                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.simplePrivilegeForm.customPrivilegeDropdown", defaultMessage: "Custom" })),
                                react_2.default.createElement("p", null,
                                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.simplePrivilegeForm.customPrivilegeDropdownDescription", defaultMessage: "Customize access to Kibana" })))),
                        },
                        {
                            value: 'read',
                            inputDisplay: (react_2.default.createElement(eui_1.EuiText, null,
                                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.simplePrivilegeForm.readPrivilegeInput", defaultMessage: "Read" }))),
                            dropdownDisplay: (react_2.default.createElement(eui_1.EuiText, null,
                                react_2.default.createElement("strong", null,
                                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.simplePrivilegeForm.readPrivilegeDropdown", defaultMessage: "Read" })),
                                react_2.default.createElement("p", null,
                                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.simplePrivilegeForm.readPrivilegeDropdownDescription", defaultMessage: "Grants read-only access to all of Kibana" })))),
                        },
                        {
                            value: 'all',
                            inputDisplay: (react_2.default.createElement(eui_1.EuiText, null,
                                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.simplePrivilegeForm.allPrivilegeInput", defaultMessage: "All" }))),
                            dropdownDisplay: (react_2.default.createElement(eui_1.EuiText, null,
                                react_2.default.createElement("strong", null,
                                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.simplePrivilegeForm.allPrivilegeDropdown", defaultMessage: "All" })),
                                react_2.default.createElement("p", null,
                                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.simplePrivilegeForm.allPrivilegeDropdownDescription", defaultMessage: "Grants full access to all of Kibana" })))),
                        },
                    ], hasDividers: true, valueOfSelected: kibanaPrivilege }))),
                this.state.isCustomizingGlobalPrivilege && (react_2.default.createElement(eui_1.EuiFormRow, null,
                    react_2.default.createElement(feature_table_1.FeatureTable, { role: this.props.role, kibanaPrivileges: this.props.kibanaPrivileges, calculatedPrivileges: calculatedPrivileges, allowedPrivileges: allowedPrivileges, rankedFeaturePrivileges: privilegeCalculator.rankedFeaturePrivileges, features: this.props.features, intl: this.props.intl, onChange: this.onFeaturePrivilegeChange, onChangeAll: this.onChangeAllFeaturePrivileges, spacesIndex: this.props.role.kibana.findIndex(k => privilege_utils_1.isGlobalPrivilegeDefinition(k)) }))),
                this.maybeRenderSpacePrivilegeWarning())));
    }
    createGlobalPrivilegeEntry(role) {
        const newEntry = {
            spaces: ['*'],
            base: [],
            feature: {},
        };
        role.kibana.push(newEntry);
        return newEntry;
    }
}
exports.SimplePrivilegeSection = SimplePrivilegeSection;
