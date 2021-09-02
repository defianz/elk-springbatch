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
const common_1 = require("../../../../../../../../../spaces/common");
const privilege_utils_1 = require("../../../../../../../lib/privilege_utils");
const role_utils_1 = require("../../../../../../../lib/role_utils");
const constants_1 = require("../../../../lib/constants");
const spaces_popover_list_1 = require("../../../spaces_popover_list");
const privilege_display_1 = require("./privilege_display");
const SPACES_DISPLAY_COUNT = 4;
class PrivilegeSpaceTable extends react_2.Component {
    constructor() {
        super(...arguments);
        this.state = {
            expandedSpacesGroups: [],
        };
        this.renderKibanaPrivileges = () => {
            const { privilegeCalculatorFactory, displaySpaces, intl } = this.props;
            const spacePrivileges = this.getSortedPrivileges();
            const privilegeCalculator = privilegeCalculatorFactory.getInstance(this.props.role);
            const effectivePrivileges = privilegeCalculator.calculateEffectivePrivileges(false);
            const allowedPrivileges = privilegeCalculator.calculateAllowedPrivileges();
            const rows = spacePrivileges.map((spacePrivs, spacesIndex) => {
                const spaces = spacePrivs.spaces.map(spaceId => displaySpaces.find(space => space.id === spaceId) || {
                    id: spaceId,
                    name: spaceId,
                    disabledFeatures: [],
                    deleted: true,
                });
                return {
                    spaces,
                    spacesIndex,
                    isGlobal: privilege_utils_1.isGlobalPrivilegeDefinition(spacePrivs),
                    privileges: {
                        spaces: spacePrivs.spaces,
                        base: spacePrivs.base || [],
                        feature: spacePrivs.feature || {},
                    },
                };
            });
            const getExtraBadgeProps = (space) => {
                if (space.deleted) {
                    return {
                        iconType: 'trash',
                    };
                }
                return {};
            };
            const columns = [
                {
                    field: 'spaces',
                    name: 'Spaces',
                    width: '60%',
                    render: (spaces, record) => {
                        const isExpanded = this.state.expandedSpacesGroups.includes(record.spacesIndex);
                        const displayedSpaces = isExpanded ? spaces : spaces.slice(0, SPACES_DISPLAY_COUNT);
                        let button = null;
                        if (record.isGlobal) {
                            button = (react_2.default.createElement(spaces_popover_list_1.SpacesPopoverList, { spaces: this.props.displaySpaces, intl: this.props.intl, buttonText: this.props.intl.formatMessage({
                                    id: 'xpack.security.management.editRole.spacePrivilegeTable.showAllSpacesLink',
                                    defaultMessage: 'show spaces',
                                }) }));
                        }
                        else if (spaces.length > displayedSpaces.length) {
                            button = (react_2.default.createElement(eui_1.EuiButtonEmpty, { size: "xs", onClick: () => this.toggleExpandSpacesGroup(record.spacesIndex) },
                                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.spacePrivilegeTable.showNMoreSpacesLink", defaultMessage: "+{count} more", values: { count: spaces.length - displayedSpaces.length } })));
                        }
                        else if (isExpanded) {
                            button = (react_2.default.createElement(eui_1.EuiButtonEmpty, { size: "xs", onClick: () => this.toggleExpandSpacesGroup(record.spacesIndex) },
                                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.spacePrivilegeTable.showLessSpacesLink", defaultMessage: "show less" })));
                        }
                        return (react_2.default.createElement("div", null,
                            displayedSpaces.map((space) => (react_2.default.createElement(eui_1.EuiBadge, Object.assign({ key: space.id }, getExtraBadgeProps(space), { color: common_1.getSpaceColor(space) }), space.name))),
                            button));
                    },
                },
                {
                    field: 'privileges',
                    name: 'Privileges',
                    render: (privileges, record) => {
                        const hasCustomizations = privilege_utils_1.hasAssignedFeaturePrivileges(privileges);
                        const effectivePrivilege = effectivePrivileges[record.spacesIndex];
                        const basePrivilege = effectivePrivilege.base;
                        const isAllowedCustomizations = allowedPrivileges[record.spacesIndex].base.privileges.length > 1;
                        const showCustomize = hasCustomizations && isAllowedCustomizations;
                        if (effectivePrivilege.reserved != null && effectivePrivilege.reserved.length > 0) {
                            return react_2.default.createElement(privilege_display_1.PrivilegeDisplay, { privilege: effectivePrivilege.reserved });
                        }
                        else if (record.isGlobal) {
                            return (react_2.default.createElement(privilege_display_1.PrivilegeDisplay, { privilege: showCustomize ? constants_1.CUSTOM_PRIVILEGE_VALUE : basePrivilege.actualPrivilege }));
                        }
                        else {
                            return (react_2.default.createElement(privilege_display_1.PrivilegeDisplay, { explanation: basePrivilege, privilege: showCustomize ? constants_1.CUSTOM_PRIVILEGE_VALUE : basePrivilege.actualPrivilege }));
                        }
                    },
                },
            ];
            if (!this.props.disabled) {
                columns.push({
                    name: 'Actions',
                    actions: [
                        {
                            render: (record) => {
                                return (react_2.default.createElement(eui_1.EuiButtonIcon, { "aria-label": intl.formatMessage({
                                        id: 'xpack.security.management.editRole.spacePrivilegeTable.editPrivilegesLabel',
                                        defaultMessage: `Edit privileges for the following spaces: {spaceNames}.`,
                                    }, {
                                        spaceNames: record.spaces.map(s => s.name).join(', '),
                                    }), color: 'primary', iconType: 'pencil', onClick: () => this.props.onEdit(record.spacesIndex) }));
                            },
                        },
                        {
                            render: (record) => {
                                return (react_2.default.createElement(eui_1.EuiButtonIcon, { "aria-label": intl.formatMessage({
                                        id: 'xpack.security.management.editRole.spacePrivilegeTable.deletePrivilegesLabel',
                                        defaultMessage: `Delete privileges for the following spaces: {spaceNames}.`,
                                    }, {
                                        spaceNames: record.spaces.map(s => s.name).join(', '),
                                    }), color: 'danger', iconType: 'trash', onClick: () => this.onDeleteSpacePrivilege(record) }));
                            },
                        },
                    ],
                });
            }
            return (
            // @ts-ignore missing rowProps from typedef
            react_2.default.createElement(eui_1.EuiInMemoryTable, { columns: columns, items: rows, hasActions: true, 
                // @ts-ignore missing rowProps from typedef
                rowProps: (item) => {
                    return {
                        className: privilege_utils_1.isGlobalPrivilegeDefinition(item.privileges)
                            ? 'secPrivilegeTable__row--isGlobalSpace'
                            : '',
                    };
                } }));
        };
        this.getSortedPrivileges = () => {
            const spacePrivileges = this.props.role.kibana;
            return spacePrivileges.sort((priv1, priv2) => {
                return privilege_utils_1.isGlobalPrivilegeDefinition(priv1) ? -1 : privilege_utils_1.isGlobalPrivilegeDefinition(priv2) ? 1 : 0;
            });
        };
        this.toggleExpandSpacesGroup = (spacesIndex) => {
            if (this.state.expandedSpacesGroups.includes(spacesIndex)) {
                this.setState({
                    expandedSpacesGroups: this.state.expandedSpacesGroups.filter(i => i !== spacesIndex),
                });
            }
            else {
                this.setState({
                    expandedSpacesGroups: [...this.state.expandedSpacesGroups, spacesIndex],
                });
            }
        };
        this.onDeleteSpacePrivilege = (item) => {
            const roleCopy = role_utils_1.copyRole(this.props.role);
            roleCopy.kibana.splice(item.spacesIndex, 1);
            this.props.onChange(roleCopy);
            this.setState({
                expandedSpacesGroups: this.state.expandedSpacesGroups.filter(i => i !== item.spacesIndex),
            });
        };
    }
    render() {
        return this.renderKibanaPrivileges();
    }
}
exports.PrivilegeSpaceTable = PrivilegeSpaceTable;
