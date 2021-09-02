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
const readable_color_1 = require("../../lib/readable_color");
const color_dot_1 = require("../color_dot");
const item_grid_1 = require("../item_grid");
exports.ColorPalette = ({ colors = [], colorsPerRow = 6, onChange, value = '', }) => {
    if (colors.length === 0) {
        return null;
    }
    colors = colors.filter(color => {
        return tinycolor2_1.default(color).isValid();
    });
    return (react_1.default.createElement("div", { className: "canvasColorPalette" },
        react_1.default.createElement(item_grid_1.ItemGrid, { items: colors, itemsPerRow: colorsPerRow }, color => {
            const match = tinycolor2_1.default.equals(color, value);
            const icon = match ? (react_1.default.createElement(eui_1.EuiIcon, { type: "check", className: "selected-color", color: readable_color_1.readableColor(value) })) : null;
            return (react_1.default.createElement(eui_1.EuiLink, { style: { fontSize: 0 }, key: color, onClick: () => !match && onChange(color), className: "canvasColorPalette__dot" },
                react_1.default.createElement(color_dot_1.ColorDot, { value: color }, icon)));
        })));
};
exports.ColorPalette.propTypes = {
    colors: prop_types_1.default.array,
    colorsPerRow: prop_types_1.default.number,
    onChange: prop_types_1.default.func.isRequired,
    value: prop_types_1.default.string,
};
