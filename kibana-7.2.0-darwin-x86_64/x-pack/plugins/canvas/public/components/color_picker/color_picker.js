"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const prop_types_1 = tslib_1.__importDefault(require("prop-types"));
const react_1 = tslib_1.__importDefault(require("react"));
const tinycolor2_1 = tslib_1.__importDefault(require("tinycolor2"));
const color_manager_1 = require("../color_manager");
const color_palette_1 = require("../color_palette");
exports.ColorPicker = ({ colors = [], hasButtons = false, onAddColor, onChange, onRemoveColor, value = '', }) => {
    const tc = tinycolor2_1.default(value);
    const isValidColor = tc.isValid();
    colors = colors.filter(color => {
        return tinycolor2_1.default(color).isValid();
    });
    let canRemove = false;
    let canAdd = false;
    if (isValidColor) {
        const match = colors.filter(color => tinycolor2_1.default.equals(value, color));
        canRemove = match.length > 0;
        canAdd = match.length === 0;
    }
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(color_palette_1.ColorPalette, { onChange: onChange, value: value, colors: colors }),
        react_1.default.createElement(color_manager_1.ColorManager, { onChange: onChange, value: value, onAddColor: canAdd ? onAddColor : undefined, onRemoveColor: canRemove ? onRemoveColor : undefined, hasButtons: hasButtons })));
};
exports.ColorPicker.propTypes = {
    colors: prop_types_1.default.array,
    hasButtons: prop_types_1.default.bool,
    onAddColor: prop_types_1.default.func,
    onChange: prop_types_1.default.func.isRequired,
    onRemoveColor: prop_types_1.default.func,
    value: prop_types_1.default.string,
};
