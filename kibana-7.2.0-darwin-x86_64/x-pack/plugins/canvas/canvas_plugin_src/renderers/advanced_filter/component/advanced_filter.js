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
exports.AdvancedFilter = ({ value = '', onChange, commit }) => (react_1.default.createElement("form", { onSubmit: e => {
        e.preventDefault();
        commit(value);
    }, className: "canvasAdvancedFilter" },
    react_1.default.createElement(eui_1.EuiFlexGroup, { gutterSize: "xs" },
        react_1.default.createElement(eui_1.EuiFlexItem, null,
            react_1.default.createElement("input", { type: "text", className: "canvasAdvancedFilter__input", placeholder: "Enter filter expression", value: value, onChange: e => onChange(e.target.value) })),
        react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
            react_1.default.createElement("button", { className: "canvasAdvancedFilter__button", type: "submit" }, "Apply")))));
exports.AdvancedFilter.defaultProps = {
    value: '',
};
exports.AdvancedFilter.propTypes = {
    onChange: prop_types_1.default.func.isRequired,
    value: prop_types_1.default.string,
    commit: prop_types_1.default.func.isRequired,
};
