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
const color_dot_1 = require("../color_dot");
const color_picker_1 = require("../color_picker");
// @ts-ignore
const popover_1 = require("../popover");
exports.ColorPickerPopover = (props) => {
    const { value, anchorPosition, ...rest } = props;
    const button = (handleClick) => (react_1.default.createElement(eui_1.EuiLink, { style: { fontSize: 0 }, onClick: handleClick },
        react_1.default.createElement(color_dot_1.ColorDot, { value: value })));
    return (react_1.default.createElement(popover_1.Popover, { id: "color-picker-popover", panelClassName: "canvas canvasColorPickerPopover__popover", button: button, anchorPosition: anchorPosition }, () => react_1.default.createElement(color_picker_1.ColorPicker, Object.assign({ value: value }, rest))));
};
exports.ColorPickerPopover.propTypes = {
    ...color_picker_1.ColorPicker.propTypes,
    anchorPosition: prop_types_1.default.string,
};
