"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const eui_1 = require("@elastic/eui");
const react_2 = require("@kbn/i18n/react");
const role_utils_1 = require("../../../../lib/role_utils");
exports.ReservedRoleBadge = (props) => {
    const { role } = props;
    if (role_utils_1.isReservedRole(role)) {
        return (react_1.default.createElement(eui_1.EuiToolTip, { "data-test-subj": "reservedRoleBadgeTooltip", content: react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.security.management.editRole.reversedRoleBadge.reservedRolesCanNotBeModifiedTooltip", defaultMessage: "Reserved roles are built-in and cannot be removed or modified." }) },
            react_1.default.createElement(eui_1.EuiIcon, { style: { verticalAlign: 'super' }, type: 'lock' })));
    }
    return null;
};
