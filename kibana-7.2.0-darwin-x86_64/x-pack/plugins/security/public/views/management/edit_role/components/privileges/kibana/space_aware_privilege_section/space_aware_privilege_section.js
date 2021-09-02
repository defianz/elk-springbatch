"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const eui_1 = require("@elastic/eui");
const react_1 = require("@kbn/i18n/react");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const react_2 = tslib_1.__importStar(require("react"));
const role_utils_1 = require("../../../../../../../lib/role_utils");
const privilege_matrix_1 = require("./privilege_matrix");
const privilege_space_form_1 = require("./privilege_space_form");
const privilege_space_table_1 = require("./privilege_space_table");
class SpaceAwarePrivilegeSectionUI extends react_2.Component {
    constructor(props) {
        super(props);
        this.globalSpaceEntry = {
            id: '*',
            name: this.props.intl.formatMessage({
                id: 'xpack.security.management.editRole.spaceAwarePrivilegeForm.globalSpacesName',
                defaultMessage: '* Global (all spaces)',
            }),
            color: '#D3DAE6',
            initials: '*',
            disabledFeatures: [],
        };
        this.renderKibanaPrivileges = () => {
            const { role } = this.props;
            const spacePrivileges = role.kibana;
            const hasAnyPrivileges = spacePrivileges.length > 0;
            if (hasAnyPrivileges) {
                const table = (react_2.default.createElement(privilege_space_table_1.PrivilegeSpaceTable, { role: this.props.role, displaySpaces: this.getDisplaySpaces(), privilegeCalculatorFactory: this.props.privilegeCalculatorFactory, onChange: this.props.onChange, onEdit: this.onEditSpacesPrivileges, intl: this.props.intl, disabled: !this.props.editable }));
                return (react_2.default.createElement("div", null,
                    table,
                    react_2.default.createElement(eui_1.EuiSpacer, null),
                    this.getAvailablePrivilegeButtons(true)));
            }
            return (react_2.default.createElement(eui_1.EuiEmptyPrompt, { iconType: "lock", title: react_2.default.createElement("h2", null,
                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.spacePrivilegeSection.noAccessToKibanaTitle", defaultMessage: "This role does not grant access to Kibana" })), titleSize: 's', actions: this.getAvailablePrivilegeButtons(false) }));
        };
        this.getAvailablePrivilegeButtons = (hasPrivilegesAssigned) => {
            const hasAvailableSpaces = this.getAvailableSpaces().length > 0;
            // This shouldn't happen organically...
            if (!hasAvailableSpaces && !hasPrivilegesAssigned) {
                return null;
            }
            const addPrivilegeButton = (react_2.default.createElement(eui_1.EuiButton, { color: "primary", onClick: this.addSpacePrivilege, iconType: 'plusInCircleFilled', "data-test-subj": 'addSpacePrivilegeButton', isDisabled: !hasAvailableSpaces || !this.props.editable },
                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.spacePrivilegeSection.addSpacePrivilegeButton", defaultMessage: "Add space privilege" })));
            if (!hasPrivilegesAssigned) {
                return addPrivilegeButton;
            }
            const viewMatrixButton = (react_2.default.createElement(privilege_matrix_1.PrivilegeMatrix, { role: this.props.role, calculatedPrivileges: this.props.privilegeCalculatorFactory
                    .getInstance(this.props.role)
                    .calculateEffectivePrivileges(), features: this.props.features, spaces: this.getDisplaySpaces(), intl: this.props.intl }));
            return (react_2.default.createElement(eui_1.EuiFlexGroup, { justifyContent: "spaceBetween" },
                react_2.default.createElement(eui_1.EuiFlexItem, { grow: false }, addPrivilegeButton),
                hasPrivilegesAssigned && !role_utils_1.isReservedRole(this.props.role) && (react_2.default.createElement(eui_1.EuiFlexItem, { grow: false }, viewMatrixButton))));
        };
        this.getDisplaySpaces = () => {
            return [this.globalSpaceEntry, ...this.props.spaces];
        };
        this.getAvailableSpaces = (includeSpacesFromPrivilegeIndex = -1) => {
            const spacesToExclude = lodash_1.default.uniq(lodash_1.default.flatten(this.props.role.kibana.map((entry, index) => {
                if (includeSpacesFromPrivilegeIndex === index) {
                    return [];
                }
                return entry.spaces;
            })));
            return this.getDisplaySpaces().filter(displaySpace => !spacesToExclude.includes(displaySpace.id));
        };
        this.addSpacePrivilege = () => {
            this.setState({
                showSpacePrivilegeEditor: true,
                editingIndex: -1,
            });
        };
        this.onSpacesPrivilegeChange = (role) => {
            this.setState({ showSpacePrivilegeEditor: false, editingIndex: -1 });
            this.props.onChange(role);
        };
        this.onEditSpacesPrivileges = (spacesIndex) => {
            this.setState({
                editingIndex: spacesIndex,
                showSpacePrivilegeEditor: true,
            });
        };
        this.onCancelEditPrivileges = () => {
            this.setState({ showSpacePrivilegeEditor: false });
        };
        this.state = {
            showSpacePrivilegeEditor: false,
            showPrivilegeMatrix: false,
            role: null,
            editingIndex: -1,
        };
    }
    render() {
        const { uiCapabilities, privilegeCalculatorFactory } = this.props;
        if (!uiCapabilities.spaces.manage) {
            return (react_2.default.createElement(eui_1.EuiCallOut, { title: react_2.default.createElement("p", null,
                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.spaceAwarePrivilegeForm.insufficientPrivilegesDescription", defaultMessage: "Insufficient Privileges" })), iconType: "alert", color: "danger", "data-test-subj": "userCannotManageSpacesCallout" },
                react_2.default.createElement("p", null,
                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.spaceAwarePrivilegeForm.howToViewAllAvailableSpacesDescription", defaultMessage: "You are not authorized to view all available spaces." })),
                react_2.default.createElement("p", null,
                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.spaceAwarePrivilegeForm.ensureAccountHasAllPrivilegesGrantedDescription", defaultMessage: "Please ensure your account has all privileges granted by the\n              {kibanaUser} role, and try again.", values: {
                            kibanaUser: (react_2.default.createElement("strong", null,
                                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.spaceAwarePrivilegeForm.kibanaUserTitle", defaultMessage: "kibana_user" }))),
                        } }))));
        }
        return (react_2.default.createElement(react_2.Fragment, null,
            this.renderKibanaPrivileges(),
            this.state.showSpacePrivilegeEditor && (react_2.default.createElement(privilege_space_form_1.PrivilegeSpaceForm, { role: this.props.role, privilegeCalculatorFactory: privilegeCalculatorFactory, kibanaPrivileges: this.props.kibanaPrivileges, features: this.props.features, intl: this.props.intl, onChange: this.onSpacesPrivilegeChange, onCancel: this.onCancelEditPrivileges, spaces: this.getAvailableSpaces(this.state.editingIndex), editingIndex: this.state.editingIndex }))));
    }
}
exports.SpaceAwarePrivilegeSection = react_1.injectI18n(SpaceAwarePrivilegeSectionUI);
