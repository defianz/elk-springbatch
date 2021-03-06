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
const constants_1 = require("../../../../lib/constants");
class PrivilegeSelector extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {};
        this.onChange = (e) => {
            this.props.onChange(e.target.value);
        };
    }
    render() {
        const { availablePrivileges, value, disabled, allowNone, compressed } = this.props;
        const options = [];
        if (allowNone) {
            options.push({ value: constants_1.NO_PRIVILEGE_VALUE, text: 'none' });
        }
        options.push(...availablePrivileges.map(p => ({
            value: p,
            text: p,
        })));
        return (react_1.default.createElement(eui_1.EuiSelect, { "data-test-subj": this.props['data-test-subj'], options: options, hasNoInitialSelection: !allowNone && !value, value: value || undefined, onChange: this.onChange, disabled: disabled, compressed: compressed }));
    }
}
exports.PrivilegeSelector = PrivilegeSelector;
