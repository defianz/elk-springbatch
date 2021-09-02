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
const components_1 = require("../../../../../../../../../spaces/public/components");
const privilege_utils_1 = require("../../../../../../../lib/privilege_utils");
const spaces_popover_list_1 = require("../../../spaces_popover_list");
const privilege_display_1 = require("./privilege_display");
const SPACES_DISPLAY_COUNT = 4;
class PrivilegeMatrix extends react_2.Component {
    constructor() {
        super(...arguments);
        this.state = {
            showModal: false,
        };
        this.renderTable = () => {
            const { role, features, intl } = this.props;
            const spacePrivileges = role.kibana;
            const globalPrivilege = this.locateGlobalPrivilege();
            const spacesColumns = [];
            spacePrivileges.forEach((spacePrivs, spacesIndex) => {
                spacesColumns.push({
                    isGlobal: privilege_utils_1.isGlobalPrivilegeDefinition(spacePrivs),
                    spacesIndex,
                    spaces: spacePrivs.spaces
                        .map(spaceId => this.props.spaces.find(space => space.id === spaceId))
                        .filter(Boolean),
                    privileges: {
                        base: spacePrivs.base,
                        feature: spacePrivs.feature,
                    },
                });
            });
            const rows = [
                {
                    feature: {
                        id: '*base*',
                        isBase: true,
                        name: intl.formatMessage({
                            id: 'xpack.security.management.editRole.spacePrivilegeMatrix.basePrivilegeText',
                            defaultMessage: 'Base privilege',
                        }),
                        app: [],
                        privileges: {},
                    },
                    role,
                },
                ...features.map(feature => ({
                    feature: {
                        ...feature,
                        isBase: false,
                    },
                    role,
                })),
            ];
            const columns = [
                {
                    field: 'feature',
                    name: intl.formatMessage({
                        id: 'xpack.security.management.editRole.spacePrivilegeMatrix.featureColumnTitle',
                        defaultMessage: 'Feature',
                    }),
                    width: '230px',
                    render: (feature) => {
                        return feature.isBase ? (react_2.default.createElement(react_2.Fragment, null,
                            react_2.default.createElement("strong", null, feature.name),
                            react_2.default.createElement(eui_1.EuiIconTip, { iconProps: {
                                    className: 'eui-alignTop',
                                }, type: "questionInCircle", content: intl.formatMessage({
                                    id: 'xpack.security.management.editRole.spacePrivilegeMatrix.basePrivilegeTooltip',
                                    defaultMessage: 'The base privilege is automatically granted to all features.',
                                }), color: "subdued" }))) : (react_2.default.createElement(react_2.Fragment, null,
                            feature.icon && (react_2.default.createElement(eui_1.EuiIcon, { className: "secPrivilegeFeatureIcon", size: "m", type: feature.icon })),
                            feature.name));
                    },
                },
                ...spacesColumns.map(item => {
                    let columnWidth;
                    if (item.isGlobal) {
                        columnWidth = '100px';
                    }
                    else if (item.spaces.length - SPACES_DISPLAY_COUNT) {
                        columnWidth = '90px';
                    }
                    else {
                        columnWidth = '80px';
                    }
                    return {
                        // TODO: this is a hacky way to determine if we are looking at the global feature
                        // used for cellProps below...
                        field: item.isGlobal ? 'global' : 'feature',
                        width: columnWidth,
                        name: (react_2.default.createElement("div", null,
                            item.spaces.slice(0, SPACES_DISPLAY_COUNT).map((space) => (react_2.default.createElement("span", { key: space.id },
                                react_2.default.createElement(components_1.SpaceAvatar, { size: "s", space: space }),
                                ' ',
                                item.isGlobal && (react_2.default.createElement("span", null,
                                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.spacePrivilegeMatrix.globalSpaceName", defaultMessage: "Global" }),
                                    react_2.default.createElement("br", null),
                                    react_2.default.createElement(spaces_popover_list_1.SpacesPopoverList, { spaces: this.props.spaces.filter(s => s.id !== '*'), intl: this.props.intl, buttonText: this.props.intl.formatMessage({
                                            id: 'xpack.security.management.editRole.spacePrivilegeMatrix.showAllSpacesLink',
                                            defaultMessage: '(all spaces)',
                                        }) })))))),
                            item.spaces.length > SPACES_DISPLAY_COUNT && (react_2.default.createElement(react_2.Fragment, null,
                                react_2.default.createElement("br", null),
                                react_2.default.createElement(spaces_popover_list_1.SpacesPopoverList, { spaces: item.spaces, intl: this.props.intl, buttonText: this.props.intl.formatMessage({
                                        id: 'xpack.security.management.editRole.spacePrivilegeMatrix.showNMoreSpacesLink',
                                        defaultMessage: '+{count} more',
                                    }, { count: item.spaces.length - SPACES_DISPLAY_COUNT }) }))))),
                        render: (feature, record) => {
                            return this.renderPrivilegeDisplay(item, record, globalPrivilege.base);
                        },
                    };
                }),
            ];
            return (
            // @ts-ignore missing rowProps from typedef
            react_2.default.createElement(eui_1.EuiInMemoryTable, { columns: columns, items: rows, 
                // @ts-ignore missing rowProps from typedef
                rowProps: (item) => {
                    return {
                        className: item.feature.isBase ? 'secPrivilegeMatrix__row--isBasePrivilege' : '',
                    };
                }, cellProps: (item, column) => {
                    return {
                        className: column.field === 'global' ? 'secPrivilegeMatrix__cell--isGlobalPrivilege' : '',
                    };
                } }));
        };
        this.renderPrivilegeDisplay = (column, { feature }, globalBasePrivilege) => {
            if (column.isGlobal) {
                if (feature.isBase) {
                    return react_2.default.createElement(privilege_display_1.PrivilegeDisplay, { privilege: globalBasePrivilege });
                }
                const featureCalculatedPrivilege = this.props.calculatedPrivileges[column.spacesIndex]
                    .feature[feature.id];
                return (react_2.default.createElement(privilege_display_1.PrivilegeDisplay, { privilege: featureCalculatedPrivilege && featureCalculatedPrivilege.actualPrivilege }));
            }
            else {
                // not global
                const calculatedPrivilege = this.props.calculatedPrivileges[column.spacesIndex];
                if (feature.isBase) {
                    // Space base privilege
                    const actualBasePrivileges = calculatedPrivilege.base.actualPrivilege;
                    return (react_2.default.createElement(privilege_display_1.PrivilegeDisplay, { explanation: calculatedPrivilege.base, privilege: actualBasePrivileges }));
                }
                const featurePrivilegeExplanation = calculatedPrivilege.feature[feature.id];
                return (react_2.default.createElement(privilege_display_1.PrivilegeDisplay, { explanation: featurePrivilegeExplanation, privilege: featurePrivilegeExplanation && featurePrivilegeExplanation.actualPrivilege }));
            }
        };
        this.locateGlobalPrivilege = () => {
            return (this.props.role.kibana.find(spacePriv => privilege_utils_1.isGlobalPrivilegeDefinition(spacePriv)) || {
                spaces: ['*'],
                base: [],
                feature: [],
            });
        };
        this.hideModal = () => {
            this.setState({
                showModal: false,
            });
        };
        this.showModal = () => {
            this.setState({
                showModal: true,
            });
        };
    }
    render() {
        let modal = null;
        if (this.state.showModal) {
            modal = (react_2.default.createElement(eui_1.EuiOverlayMask, null,
                react_2.default.createElement(eui_1.EuiModal, { className: "secPrivilegeMatrix__modal", onClose: this.hideModal },
                    react_2.default.createElement(eui_1.EuiModalHeader, null,
                        react_2.default.createElement(eui_1.EuiModalHeaderTitle, null,
                            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.spacePrivilegeMatrix.modalTitle", defaultMessage: "Privilege summary" }))),
                    react_2.default.createElement(eui_1.EuiModalBody, null, this.renderTable()),
                    react_2.default.createElement(eui_1.EuiModalFooter, null,
                        react_2.default.createElement(eui_1.EuiButton, { onClick: this.hideModal, fill: true },
                            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.spacePrivilegeMatrix.closeButton", defaultMessage: "Close" }))))));
        }
        return (react_2.default.createElement(react_2.Fragment, null,
            react_2.default.createElement(eui_1.EuiButtonEmpty, { onClick: this.showModal },
                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.spacePrivilegeMatrix.showSummaryText", defaultMessage: "View privilege summary" })),
            modal));
    }
}
exports.PrivilegeMatrix = PrivilegeMatrix;
