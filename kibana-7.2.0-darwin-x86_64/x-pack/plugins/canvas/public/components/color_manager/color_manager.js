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
const tinycolor2_1 = tslib_1.__importDefault(require("tinycolor2"));
const color_dot_1 = require("../color_dot/color_dot");
exports.ColorManager = ({ value = '', onAddColor, onRemoveColor, onChange, hasButtons = false, }) => {
    const tc = tinycolor2_1.default(value);
    const validColor = tc.isValid();
    let buttons = null;
    if (hasButtons) {
        buttons = (react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
            react_1.default.createElement(eui_1.EuiButtonIcon, { "aria-label": "Add Color", iconType: "plusInCircle", isDisabled: !validColor || !onAddColor, onClick: () => onAddColor && onAddColor(value) }),
            react_1.default.createElement(eui_1.EuiButtonIcon, { "aria-label": "Remove Color", iconType: "minusInCircle", isDisabled: !validColor || !onRemoveColor, onClick: () => onRemoveColor && onRemoveColor(value) })));
    }
    return (react_1.default.createElement(eui_1.EuiFlexGroup, { gutterSize: "xs", alignItems: "center" },
        react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
            react_1.default.createElement(color_dot_1.ColorDot, { value: validColor ? value : undefined })),
        react_1.default.createElement(eui_1.EuiFlexItem, { style: { display: 'inline-block' } },
            react_1.default.createElement(eui_1.EuiFieldText, { value: value, isInvalid: !validColor && value.length > 0, placeholder: "Color code", onChange: e => onChange(e.target.value) })),
        buttons));
};
exports.ColorManager.propTypes = {
    hasButtons: prop_types_1.default.bool,
    onAddColor: prop_types_1.default.func,
    onChange: prop_types_1.default.func.isRequired,
    onRemoveColor: prop_types_1.default.func,
    value: prop_types_1.default.string,
};
