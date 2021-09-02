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
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const react_2 = tslib_1.__importStar(require("react"));
const privilege_utils_1 = require("../../../../../../../lib/privilege_utils");
const constants_1 = require("../../../../lib/constants");
const privilege_display_1 = require("../space_aware_privilege_section/privilege_display");
const change_all_privileges_1 = require("./change_all_privileges");
class FeatureTable extends react_2.Component {
    constructor() {
        super(...arguments);
        this.onChange = (featureId) => (featurePrivilegeId) => {
            const privilege = featurePrivilegeId.substr(`${featureId}_`.length);
            if (privilege === constants_1.NO_PRIVILEGE_VALUE) {
                this.props.onChange(featureId, []);
            }
            else {
                this.props.onChange(featureId, [privilege]);
            }
        };
        this.getColumns = (availablePrivileges) => [
            {
                field: 'feature',
                name: this.props.intl.formatMessage({
                    id: 'xpack.security.management.editRole.featureTable.enabledRoleFeaturesFeatureColumnTitle',
                    defaultMessage: 'Feature',
                }),
                render: (feature) => {
                    let tooltipElement = null;
                    if (feature.privilegesTooltip) {
                        const tooltipContent = (react_2.default.createElement(eui_1.EuiText, null,
                            react_2.default.createElement("p", null, feature.privilegesTooltip)));
                        tooltipElement = (react_2.default.createElement(eui_1.EuiIconTip, { iconProps: {
                                className: 'eui-alignTop',
                            }, type: 'iInCircle', color: 'subdued', content: tooltipContent }));
                    }
                    return (react_2.default.createElement("span", null,
                        react_2.default.createElement(eui_1.EuiIcon, { size: "m", type: feature.icon, className: "secPrivilegeFeatureIcon" }),
                        feature.name,
                        " ",
                        tooltipElement));
                },
            },
            {
                field: 'privilege',
                name: (react_2.default.createElement("span", null,
                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.featureTable.enabledRoleFeaturesEnabledColumnTitle", defaultMessage: "Privilege" }),
                    !this.props.disabled && (react_2.default.createElement(change_all_privileges_1.ChangeAllPrivilegesControl, { privileges: [...availablePrivileges, constants_1.NO_PRIVILEGE_VALUE], onChange: this.onChangeAllFeaturePrivileges })))),
                render: (roleEntry, record) => {
                    const { id: featureId, reserved } = record.feature;
                    if (reserved) {
                        return react_2.default.createElement(eui_1.EuiText, { size: 's' }, reserved.description);
                    }
                    const featurePrivileges = this.props.kibanaPrivileges
                        .getFeaturePrivileges()
                        .getPrivileges(featureId);
                    if (featurePrivileges.length === 0) {
                        return null;
                    }
                    const enabledFeaturePrivileges = this.getEnabledFeaturePrivileges(featurePrivileges, featureId);
                    const privilegeExplanation = this.getPrivilegeExplanation(featureId);
                    const allowsNone = this.allowsNoneForPrivilegeAssignment(featureId);
                    const actualPrivilegeValue = privilegeExplanation.actualPrivilege;
                    const canChangePrivilege = !this.props.disabled && (allowsNone || enabledFeaturePrivileges.length > 1);
                    if (!canChangePrivilege) {
                        return (react_2.default.createElement(privilege_display_1.PrivilegeDisplay, { privilege: actualPrivilegeValue, explanation: privilegeExplanation }));
                    }
                    const options = availablePrivileges.map(priv => {
                        return {
                            id: `${featureId}_${priv}`,
                            label: lodash_1.default.capitalize(priv),
                            isDisabled: !enabledFeaturePrivileges.includes(priv),
                        };
                    });
                    options.push({
                        id: `${featureId}_${constants_1.NO_PRIVILEGE_VALUE}`,
                        label: 'None',
                        isDisabled: !allowsNone,
                    });
                    return (
                    // @ts-ignore missing name from typedef
                    react_2.default.createElement(eui_1.EuiButtonGroup
                    // @ts-ignore missing rowProps from typedef
                    , { 
                        // @ts-ignore missing rowProps from typedef
                        name: `featurePrivilege_${featureId}`, options: options, idSelected: `${featureId}_${actualPrivilegeValue || constants_1.NO_PRIVILEGE_VALUE}`, onChange: this.onChange(featureId) }));
                },
            },
        ];
        this.getEnabledFeaturePrivileges = (featurePrivileges, featureId) => {
            const { allowedPrivileges } = this.props;
            if (this.isConfiguringGlobalPrivileges()) {
                // Global feature privileges are not limited by effective privileges.
                return featurePrivileges;
            }
            const allowedFeaturePrivileges = allowedPrivileges.feature[featureId];
            if (allowedFeaturePrivileges == null) {
                throw new Error('Unable to get enabled feature privileges for a feature without privileges');
            }
            return allowedFeaturePrivileges.privileges;
        };
        this.getPrivilegeExplanation = (featureId) => {
            const { calculatedPrivileges } = this.props;
            const calculatedFeaturePrivileges = calculatedPrivileges.feature[featureId];
            if (calculatedFeaturePrivileges == null) {
                throw new Error('Unable to get privilege explanation for a feature without privileges');
            }
            return calculatedFeaturePrivileges;
        };
        this.allowsNoneForPrivilegeAssignment = (featureId) => {
            const { allowedPrivileges } = this.props;
            const allowedFeaturePrivileges = allowedPrivileges.feature[featureId];
            if (allowedFeaturePrivileges == null) {
                throw new Error('Unable to determine if none is allowed for a feature without privileges');
            }
            return allowedFeaturePrivileges.canUnassign;
        };
        this.onChangeAllFeaturePrivileges = (privilege) => {
            if (privilege === constants_1.NO_PRIVILEGE_VALUE) {
                this.props.onChangeAll([]);
            }
            else {
                this.props.onChangeAll([privilege]);
            }
        };
        this.isConfiguringGlobalPrivileges = () => privilege_utils_1.isGlobalPrivilegeDefinition(this.props.role.kibana[this.props.spacesIndex]);
    }
    render() {
        const { role, features, calculatedPrivileges, rankedFeaturePrivileges } = this.props;
        const items = features
            .sort((feature1, feature2) => {
            if (feature1.reserved && !feature2.reserved) {
                return 1;
            }
            if (feature2.reserved && !feature1.reserved) {
                return -1;
            }
            return 0;
        })
            .map(feature => {
            const calculatedFeaturePrivileges = calculatedPrivileges.feature[feature.id];
            const hasAnyPrivilegeAssigned = Boolean(calculatedFeaturePrivileges &&
                calculatedFeaturePrivileges.actualPrivilege !== constants_1.NO_PRIVILEGE_VALUE);
            return {
                feature: {
                    ...feature,
                    hasAnyPrivilegeAssigned,
                },
                role,
            };
        });
        // TODO: This simply grabs the available privileges from the first feature we encounter.
        // As of now, features can have 'all' and 'read' as available privileges. Once that assumption breaks,
        // this will need updating. This is a simplifying measure to enable the new UI.
        const availablePrivileges = Object.values(rankedFeaturePrivileges)[0];
        return (
        // @ts-ignore missing responsive from typedef
        react_2.default.createElement(eui_1.EuiInMemoryTable
        // @ts-ignore missing rowProps from typedef
        , { 
            // @ts-ignore missing rowProps from typedef
            responsive: false, columns: this.getColumns(availablePrivileges), items: items }));
    }
}
FeatureTable.defaultProps = {
    spacesIndex: -1,
    showLocks: true,
};
exports.FeatureTable = FeatureTable;
