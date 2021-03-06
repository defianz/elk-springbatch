"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = tslib_1.__importStar(require("react"));
const role_utils_1 = require("../../../../../../lib/role_utils");
// @ts-ignore
const role_privileges_1 = require("../../../../../../services/role_privileges");
class ClusterPrivileges extends react_1.Component {
    constructor() {
        super(...arguments);
        this.buildComboBox = (items) => {
            const role = this.props.role;
            const options = items.map(i => ({
                label: i,
            }));
            const selectedOptions = (role.elasticsearch.cluster || []).map(k => ({ label: k }));
            return (react_1.default.createElement(eui_1.EuiFlexItem, { key: 'clusterPrivs' },
                react_1.default.createElement(eui_1.EuiComboBox, { options: options, selectedOptions: selectedOptions, onChange: this.onClusterPrivilegesChange, isDisabled: role_utils_1.isReadOnlyRole(role) })));
        };
        this.onClusterPrivilegesChange = (selectedPrivileges) => {
            this.props.onChange(selectedPrivileges.map((priv) => priv.label));
        };
    }
    render() {
        const clusterPrivileges = role_privileges_1.getClusterPrivileges();
        return react_1.default.createElement(eui_1.EuiFlexGroup, null, this.buildComboBox(clusterPrivileges));
    }
}
exports.ClusterPrivileges = ClusterPrivileges;
