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
const react_2 = tslib_1.__importStar(require("react"));
const privilege_utils_1 = require("../../../../../../../lib/privilege_utils");
const role_utils_1 = require("../../../../../../../lib/role_utils");
const constants_1 = require("../../../../lib/constants");
const feature_table_1 = require("../feature_table");
const space_selector_1 = require("./space_selector");
class PrivilegeSpaceForm extends react_2.Component {
    constructor(props) {
        super(props);
        this.getForm = () => {
            const { intl, spaces, privilegeCalculatorFactory } = this.props;
            const privilegeCalculator = privilegeCalculatorFactory.getInstance(this.state.role);
            const calculatedPrivileges = privilegeCalculator.calculateEffectivePrivileges()[this.state.editingIndex];
            const allowedPrivileges = privilegeCalculator.calculateAllowedPrivileges()[this.state.editingIndex];
            const baseExplanation = calculatedPrivileges.base;
            const hasSelectedSpaces = this.state.selectedSpaceIds.length > 0;
            return (react_2.default.createElement(eui_1.EuiForm, null,
                react_2.default.createElement(eui_1.EuiFormRow, { fullWidth: true, label: intl.formatMessage({
                        id: 'xpack.security.management.editRole.spacePrivilegeForm.spaceSelectorFormLabel',
                        defaultMessage: 'Spaces',
                    }) },
                    react_2.default.createElement(space_selector_1.SpaceSelector, { selectedSpaceIds: this.state.selectedSpaceIds, onChange: this.onSelectedSpacesChange, spaces: spaces, intl: this.props.intl })),
                this.getPrivilegeCallout(),
                react_2.default.createElement(eui_1.EuiFormRow, { fullWidth: true, label: intl.formatMessage({
                        id: 'xpack.security.management.editRole.spacePrivilegeForm.privilegeSelectorFormLabel',
                        defaultMessage: 'Privilege',
                    }) },
                    react_2.default.createElement(eui_1.EuiSuperSelect, { "data-test-subj": 'basePrivilegeComboBox', fullWidth: true, onChange: this.onSpaceBasePrivilegeChange, options: [
                            {
                                value: 'basePrivilege_custom',
                                disabled: !this.canCustomizeFeaturePrivileges(baseExplanation, allowedPrivileges),
                                inputDisplay: (react_2.default.createElement(eui_1.EuiText, null,
                                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.spacePrivilegeForm.customPrivilegeDisplay", defaultMessage: "Custom" }))),
                                dropdownDisplay: (react_2.default.createElement(eui_1.EuiText, null,
                                    react_2.default.createElement("strong", null,
                                        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.spacePrivilegeForm.customPrivilegeDropdownDisplay", defaultMessage: "Custom" })),
                                    react_2.default.createElement("p", null,
                                        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.spacePrivilegeForm.customPrivilegeDetails", defaultMessage: "Customize access by feature in selected spaces." })))),
                            },
                            {
                                value: 'basePrivilege_read',
                                disabled: !allowedPrivileges.base.privileges.includes('read'),
                                inputDisplay: (react_2.default.createElement(eui_1.EuiText, null,
                                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.spacePrivilegeForm.readPrivilegeDisplay", defaultMessage: "Read" }))),
                                dropdownDisplay: (react_2.default.createElement(eui_1.EuiText, null,
                                    react_2.default.createElement("strong", null,
                                        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.spacePrivilegeForm.readPrivilegeDropdownDisplay", defaultMessage: "Read" })),
                                    react_2.default.createElement("p", null,
                                        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.spacePrivilegeForm.readPrivilegeDetails", defaultMessage: "Grant read-only access to all features in selected spaces." })))),
                            },
                            {
                                value: 'basePrivilege_all',
                                inputDisplay: (react_2.default.createElement(eui_1.EuiText, null,
                                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.spacePrivilegeForm.allPrivilegeDisplay", defaultMessage: "All" }))),
                                dropdownDisplay: (react_2.default.createElement(eui_1.EuiText, null,
                                    react_2.default.createElement("strong", null,
                                        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.spacePrivilegeForm.allPrivilegeDropdownDisplay", defaultMessage: "All" })),
                                    react_2.default.createElement("p", null,
                                        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.spacePrivilegeForm.allPrivilegeDetails", defaultMessage: "Grant full access to all features in selected spaces." })))),
                            },
                        ], hasDividers: true, valueOfSelected: `basePrivilege_${this.getDisplayedBasePrivilege(allowedPrivileges, baseExplanation)}`, disabled: !hasSelectedSpaces })),
                react_2.default.createElement(eui_1.EuiSpacer, { size: "s" }),
                react_2.default.createElement(eui_1.EuiTitle, { size: "xxs" },
                    react_2.default.createElement("h3", null, this.getFeatureListLabel(this.state.selectedBasePrivilege.length > 0))),
                react_2.default.createElement(eui_1.EuiSpacer, { size: "xs" }),
                react_2.default.createElement(eui_1.EuiText, { size: "s" },
                    react_2.default.createElement("p", null, this.getFeatureListDescription(this.state.selectedBasePrivilege.length > 0))),
                react_2.default.createElement(eui_1.EuiSpacer, { size: "l" }),
                react_2.default.createElement(feature_table_1.FeatureTable, { role: this.state.role, features: this.props.features, calculatedPrivileges: calculatedPrivileges, allowedPrivileges: allowedPrivileges, rankedFeaturePrivileges: privilegeCalculator.rankedFeaturePrivileges, intl: this.props.intl, onChange: this.onFeaturePrivilegesChange, onChangeAll: this.onChangeAllFeaturePrivileges, kibanaPrivileges: this.props.kibanaPrivileges, spacesIndex: this.state.editingIndex, disabled: this.state.selectedBasePrivilege.length > 0 || !hasSelectedSpaces }),
                this.requiresGlobalPrivilegeWarning() && (react_2.default.createElement(react_2.Fragment, null,
                    react_2.default.createElement(eui_1.EuiSpacer, { size: "l" }),
                    react_2.default.createElement(eui_1.EuiCallOut, { color: "warning", iconType: "alert", title: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.spacePrivilegeForm.globalPrivilegeWarning", defaultMessage: "Creating a global privilege might impact your other space privileges." }) })))));
        };
        this.getSaveButton = () => {
            const { mode } = this.state;
            const isGlobal = this.isDefiningGlobalPrivilege();
            let buttonText;
            switch (mode) {
                case 'create':
                    if (isGlobal) {
                        buttonText = (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRolespacePrivilegeForm.createGlobalPrivilegeButton", defaultMessage: "Create global privilege" }));
                    }
                    else {
                        buttonText = (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRolespacePrivilegeForm.createPrivilegeButton", defaultMessage: "Create space privilege" }));
                    }
                    break;
                case 'update':
                    if (isGlobal) {
                        buttonText = (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRolespacePrivilegeForm.updateGlobalPrivilegeButton", defaultMessage: "Update global privilege" }));
                    }
                    else {
                        buttonText = (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRolespacePrivilegeForm.updatePrivilegeButton", defaultMessage: "Update space privilege" }));
                    }
                    break;
                default:
                    throw new Error(`Unsupported mode: ${mode}`);
            }
            let buttonColor = 'primary';
            if (this.requiresGlobalPrivilegeWarning()) {
                buttonColor = 'warning';
            }
            return (react_2.default.createElement(eui_1.EuiButton, { onClick: this.onSaveClick, fill: true, disabled: !this.canSave(), color: buttonColor, "data-test-subj": 'createSpacePrivilegeButton' }, buttonText));
        };
        this.getFeatureListLabel = (disabled) => {
            if (disabled) {
                return this.props.intl.formatMessage({
                    id: 'xpack.security.management.editRole.spacePrivilegeForm.summaryOfFeaturePrivileges',
                    defaultMessage: 'Summary of feature privileges',
                });
            }
            else {
                return this.props.intl.formatMessage({
                    id: 'xpack.security.management.editRole.spacePrivilegeForm.customizeFeaturePrivileges',
                    defaultMessage: 'Customize by feature',
                });
            }
        };
        this.getFeatureListDescription = (disabled) => {
            if (disabled) {
                return this.props.intl.formatMessage({
                    id: 'xpack.security.management.editRole.spacePrivilegeForm.featurePrivilegeSummaryDescription',
                    defaultMessage: 'Some features might be hidden by the space or affected by a global space privilege.',
                });
            }
            else {
                return this.props.intl.formatMessage({
                    id: 'xpack.security.management.editRole.spacePrivilegeForm.customizeFeaturePrivilegeDescription',
                    defaultMessage: 'Increase privilege levels on a per feature basis. Some features might be hidden by the space or affected by a global space privilege.',
                });
            }
        };
        this.getPrivilegeCallout = () => {
            if (this.isDefiningGlobalPrivilege()) {
                return (react_2.default.createElement(eui_1.EuiFormRow, { fullWidth: true },
                    react_2.default.createElement(eui_1.EuiCallOut, { color: "primary", iconType: "iInCircle", title: this.props.intl.formatMessage({
                            id: 'xpack.security.management.editRole.spacePrivilegeForm.globalPrivilegeNotice',
                            defaultMessage: 'These privileges will apply to all current and future spaces.',
                        }) })));
            }
            return null;
        };
        this.closeFlyout = () => {
            this.props.onCancel();
        };
        this.onSaveClick = () => {
            const role = role_utils_1.copyRole(this.state.role);
            const form = role.kibana[this.state.editingIndex];
            // remove any spaces that no longer exist
            if (!this.isDefiningGlobalPrivilege()) {
                form.spaces = form.spaces.filter(spaceId => this.props.spaces.find(space => space.id === spaceId));
            }
            this.props.onChange(role);
        };
        this.onSelectedSpacesChange = (selectedSpaceIds) => {
            const role = role_utils_1.copyRole(this.state.role);
            const form = role.kibana[this.state.editingIndex];
            form.spaces = [...selectedSpaceIds];
            this.setState({
                selectedSpaceIds,
                role,
            });
        };
        this.onSpaceBasePrivilegeChange = (basePrivilege) => {
            const role = role_utils_1.copyRole(this.state.role);
            const form = role.kibana[this.state.editingIndex];
            const privilegeName = basePrivilege.split('basePrivilege_')[1];
            let isCustomizingFeaturePrivileges = false;
            if (privilegeName === constants_1.CUSTOM_PRIVILEGE_VALUE) {
                form.base = [];
                isCustomizingFeaturePrivileges = true;
            }
            else {
                form.base = [privilegeName];
                form.feature = {};
            }
            this.setState({
                selectedBasePrivilege: privilegeName === constants_1.CUSTOM_PRIVILEGE_VALUE ? [] : [privilegeName],
                role,
                isCustomizingFeaturePrivileges,
            });
        };
        this.getDisplayedBasePrivilege = (allowedPrivileges, explanation) => {
            if (this.canCustomizeFeaturePrivileges(explanation, allowedPrivileges)) {
                const form = this.state.role.kibana[this.state.editingIndex];
                if (privilege_utils_1.hasAssignedFeaturePrivileges(form) ||
                    explanation.actualPrivilege === constants_1.NO_PRIVILEGE_VALUE ||
                    this.state.isCustomizingFeaturePrivileges) {
                    return constants_1.CUSTOM_PRIVILEGE_VALUE;
                }
            }
            return explanation.actualPrivilege;
        };
        this.canCustomizeFeaturePrivileges = (basePrivilegeExplanation, allowedPrivileges) => {
            if (basePrivilegeExplanation.isDirectlyAssigned) {
                return true;
            }
            const featureEntries = Object.values(allowedPrivileges.feature);
            return featureEntries.some(entry => {
                return entry != null && (entry.canUnassign || entry.privileges.length > 1);
            });
        };
        this.onFeaturePrivilegesChange = (featureId, privileges) => {
            const role = role_utils_1.copyRole(this.state.role);
            const form = role.kibana[this.state.editingIndex];
            if (privileges.length === 0) {
                delete form.feature[featureId];
            }
            else {
                form.feature[featureId] = [...privileges];
            }
            this.setState({
                role,
            });
        };
        this.onChangeAllFeaturePrivileges = (privileges) => {
            const role = role_utils_1.copyRole(this.state.role);
            const form = role.kibana[this.state.editingIndex];
            const calculator = this.props.privilegeCalculatorFactory.getInstance(role);
            const allowedPrivs = calculator.calculateAllowedPrivileges();
            if (privileges.length === 0) {
                form.feature = {};
            }
            else {
                this.props.features.forEach(feature => {
                    const allowedPrivilegesFeature = allowedPrivs[this.state.editingIndex].feature[feature.id];
                    const canAssign = allowedPrivilegesFeature && allowedPrivilegesFeature.privileges.includes(privileges[0]);
                    if (canAssign) {
                        form.feature[feature.id] = [...privileges];
                    }
                });
            }
            this.setState({
                role,
            });
        };
        this.canSave = () => {
            if (this.state.selectedSpaceIds.length === 0) {
                return false;
            }
            const form = this.state.role.kibana[this.state.editingIndex];
            if (form.base.length === 0 && Object.keys(form.feature).length === 0) {
                return false;
            }
            return true;
        };
        this.isDefiningGlobalPrivilege = () => this.state.selectedSpaceIds.includes('*');
        this.requiresGlobalPrivilegeWarning = () => {
            const hasOtherSpacePrivilegesDefined = this.props.role.kibana.length > 0;
            return (this.state.mode === 'create' &&
                this.isDefiningGlobalPrivilege() &&
                hasOtherSpacePrivilegesDefined);
        };
        const role = role_utils_1.copyRole(props.role);
        let editingIndex = props.editingIndex;
        if (editingIndex < 0) {
            // create new form
            editingIndex =
                role.kibana.push({
                    spaces: [],
                    base: [],
                    feature: {},
                }) - 1;
        }
        this.state = {
            role,
            editingIndex,
            selectedSpaceIds: [...role.kibana[editingIndex].spaces],
            selectedBasePrivilege: [...(role.kibana[editingIndex].base || [])],
            mode: props.editingIndex < 0 ? 'create' : 'update',
            isCustomizingFeaturePrivileges: false,
        };
    }
    render() {
        return (react_2.default.createElement(eui_1.EuiOverlayMask, null,
            react_2.default.createElement(eui_1.EuiFlyout, { onClose: this.closeFlyout, size: "m", maxWidth: true },
                react_2.default.createElement(eui_1.EuiFlyoutHeader, { hasBorder: true },
                    react_2.default.createElement(eui_1.EuiTitle, { size: "m" },
                        react_2.default.createElement("h2", null,
                            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.spacePrivilegeForm.modalTitle", defaultMessage: "Space privileges" })))),
                react_2.default.createElement(eui_1.EuiFlyoutBody, null, this.getForm()),
                react_2.default.createElement(eui_1.EuiFlyoutFooter, null,
                    react_2.default.createElement(eui_1.EuiFlexGroup, { justifyContent: "spaceBetween" },
                        react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                            react_2.default.createElement(eui_1.EuiButtonEmpty, { iconType: "cross", onClick: this.closeFlyout, flush: "left", "data-test-subj": 'cancelSpacePrivilegeButton' },
                                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRolespacePrivilegeForm.cancelButton", defaultMessage: "Cancel" }))),
                        react_2.default.createElement(eui_1.EuiFlexItem, { grow: false }, this.getSaveButton()))))));
    }
}
PrivilegeSpaceForm.defaultProps = {
    editingIndex: -1,
};
exports.PrivilegeSpaceForm = PrivilegeSpaceForm;
