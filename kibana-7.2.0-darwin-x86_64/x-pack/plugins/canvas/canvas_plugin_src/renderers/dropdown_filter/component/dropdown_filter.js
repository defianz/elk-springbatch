"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const prop_types_1 = tslib_1.__importDefault(require("prop-types"));
const react_1 = tslib_1.__importDefault(require("react"));
exports.DropdownFilter = ({ value, onChange, commit, choices = [], }) => {
    let options = [{ value: '%%CANVAS_MATCH_ALL%%', text: '-- ANY --' }];
    options = options.concat(choices.map(choice => ({ value: choice, text: choice })));
    const changeHandler = (e) => {
        if (e && e.target) {
            const target = e.target;
            onChange(target.value);
            commit(target.value);
        }
    };
    const dropdownOptions = options.map(option => {
        const { text } = option;
        const optionValue = option.value;
        const selected = optionValue === value;
        return (react_1.default.createElement("option", { key: optionValue, value: optionValue, "aria-selected": selected }, text));
    });
    return (react_1.default.createElement("div", { className: "canvasDropdownFilter" },
        react_1.default.createElement("select", { className: "canvasDropdownFilter__select", value: value, onChange: changeHandler }, dropdownOptions),
        react_1.default.createElement(eui_1.EuiIcon, { className: "canvasDropdownFilter__icon", type: "arrowDown" })));
};
exports.DropdownFilter.propTypes = {
    choices: prop_types_1.default.array,
    value: prop_types_1.default.string,
    onChange: prop_types_1.default.func.isRequired,
    commit: prop_types_1.default.func.isRequired,
};
