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
class UnsupportedSpacePrivilegesWarning extends react_2.Component {
    constructor() {
        super(...arguments);
        this.getMessage = () => {
            return (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.simplePrivilegeForm.unsupportedSpacePrivilegesWarning", defaultMessage: "This role contains privilege definitions for spaces, but spaces are not enabled in Kibana. Saving this role will remove these privileges." }));
        };
    }
    render() {
        return react_2.default.createElement(eui_1.EuiCallOut, { iconType: "alert", color: "warning", title: this.getMessage() });
    }
}
exports.UnsupportedSpacePrivilegesWarning = UnsupportedSpacePrivilegesWarning;
