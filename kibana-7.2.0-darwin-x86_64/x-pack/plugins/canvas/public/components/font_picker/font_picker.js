"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// @ts-ignore (elastic/eui#1262) EuiSuperSelect is not exported yet
const eui_1 = require("@elastic/eui");
const prop_types_1 = tslib_1.__importDefault(require("prop-types"));
const react_1 = tslib_1.__importDefault(require("react"));
const fonts_1 = require("../../../common/lib/fonts");
exports.FontPicker = props => {
    const { value, onSelect } = props;
    // While fonts are strongly-typed, we also support custom fonts someone might type in.
    // So let's cast the fonts and allow for additions.
    const displayedFonts = fonts_1.fonts;
    if (value && !fonts_1.fonts.find(font => font.value === value)) {
        const label = (value.indexOf(',') >= 0 ? value.split(',')[0] : value).replace(/['"]/g, '');
        displayedFonts.push({ value, label });
        displayedFonts.sort((a, b) => a.label.localeCompare(b.label));
    }
    return (react_1.default.createElement(eui_1.EuiSuperSelect, { compressed: true, options: displayedFonts.map(font => ({
            value: font.value,
            inputDisplay: react_1.default.createElement("div", { style: { fontFamily: font.value } }, font.label),
        })), valueOfSelected: value, onChange: (newValue) => onSelect && onSelect(newValue) }));
};
exports.FontPicker.propTypes = {
    /** Initial value of the Font Picker. */
    value: prop_types_1.default.string,
    /** Function to execute when a Font is selected. */
    onSelect: prop_types_1.default.func,
};
exports.FontPicker.displayName = 'FontPicker';
