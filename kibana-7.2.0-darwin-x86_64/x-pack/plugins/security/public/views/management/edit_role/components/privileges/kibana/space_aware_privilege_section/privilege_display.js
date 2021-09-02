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
const react_2 = tslib_1.__importDefault(require("react"));
const kibana_privilege_calculator_1 = require("../../../../../../../lib/kibana_privilege_calculator");
const constants_1 = require("../../../../lib/constants");
exports.PrivilegeDisplay = (props) => {
    const { explanation } = props;
    if (!explanation) {
        return react_2.default.createElement(SimplePrivilegeDisplay, Object.assign({}, props));
    }
    if (explanation.supersededPrivilege) {
        return react_2.default.createElement(exports.SupersededPrivilegeDisplay, Object.assign({}, props));
    }
    if (!explanation.isDirectlyAssigned) {
        return react_2.default.createElement(exports.EffectivePrivilegeDisplay, Object.assign({}, props));
    }
    return react_2.default.createElement(SimplePrivilegeDisplay, Object.assign({}, props));
};
const SimplePrivilegeDisplay = (props) => {
    const { privilege, iconType, tooltipContent, explanation, ...rest } = props;
    return (react_2.default.createElement(eui_1.EuiText, Object.assign({}, rest),
        getDisplayValue(privilege),
        " ",
        getIconTip(iconType, tooltipContent)));
};
exports.SupersededPrivilegeDisplay = (props) => {
    const { supersededPrivilege, actualPrivilegeSource } = props.explanation || {};
    return (react_2.default.createElement(SimplePrivilegeDisplay, Object.assign({}, props, { iconType: 'lock', tooltipContent: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.spaceAwarePrivilegeDisplay.privilegeSupercededMessage", defaultMessage: "Original privilege of {supersededPrivilege} has been overriden by {actualPrivilegeSource}", values: {
                supersededPrivilege: `'${supersededPrivilege}'`,
                actualPrivilegeSource: getReadablePrivilegeSource(actualPrivilegeSource),
            } }) })));
};
exports.EffectivePrivilegeDisplay = (props) => {
    const { explanation, ...rest } = props;
    const source = getReadablePrivilegeSource(explanation.actualPrivilegeSource);
    const tooltipContent = (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.spaceAwarePrivilegeDisplay.effectivePrivilegeMessage", defaultMessage: "Granted via {source}.", values: { source } }));
    return react_2.default.createElement(SimplePrivilegeDisplay, Object.assign({}, rest, { iconType: 'lock', tooltipContent: tooltipContent }));
};
exports.PrivilegeDisplay.defaultProps = {
    privilege: [],
};
function getDisplayValue(privilege) {
    const privileges = coerceToArray(privilege);
    let displayValue;
    const isPrivilegeMissing = privileges.length === 0 || (privileges.length === 1 && privileges.includes(constants_1.NO_PRIVILEGE_VALUE));
    if (isPrivilegeMissing) {
        displayValue = react_2.default.createElement(eui_1.EuiIcon, { color: "subdued", type: 'minusInCircle' });
    }
    else {
        displayValue = privileges.map(p => lodash_1.default.capitalize(p)).join(', ');
    }
    return displayValue;
}
function getIconTip(iconType, tooltipContent) {
    if (!iconType || !tooltipContent) {
        return null;
    }
    return (react_2.default.createElement(eui_1.EuiIconTip, { iconProps: {
            className: 'eui-alignTop',
        }, color: "subdued", type: iconType, content: tooltipContent, size: 's' }));
}
function coerceToArray(privilege) {
    if (privilege === undefined) {
        return [];
    }
    if (Array.isArray(privilege)) {
        return privilege;
    }
    return [privilege];
}
function getReadablePrivilegeSource(privilegeSource) {
    switch (privilegeSource) {
        case kibana_privilege_calculator_1.PRIVILEGE_SOURCE.GLOBAL_BASE:
            return (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.spaceAwarePrivilegeDisplay.globalBasePrivilegeSource", defaultMessage: "global base privilege" }));
        case kibana_privilege_calculator_1.PRIVILEGE_SOURCE.GLOBAL_FEATURE:
            return (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.spaceAwarePrivilegeDisplay.globalFeaturePrivilegeSource", defaultMessage: "global feature privilege" }));
        case kibana_privilege_calculator_1.PRIVILEGE_SOURCE.SPACE_BASE:
            return (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.spaceAwarePrivilegeDisplay.spaceBasePrivilegeSource", defaultMessage: "space base privilege" }));
        case kibana_privilege_calculator_1.PRIVILEGE_SOURCE.SPACE_FEATURE:
            return (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.spaceAwarePrivilegeDisplay.spaceFeaturePrivilegeSource", defaultMessage: "space feature privilege" }));
        default:
            return (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.spaceAwarePrivilegeDisplay.unknownPrivilegeSource", defaultMessage: "**UNKNOWN**" }));
    }
}
