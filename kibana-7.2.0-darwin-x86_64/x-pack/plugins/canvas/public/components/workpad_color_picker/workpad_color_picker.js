"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const color_picker_popover_1 = require("../color_picker_popover");
exports.WorkpadColorPicker = (props) => {
    return react_1.default.createElement(color_picker_popover_1.ColorPickerPopover, Object.assign({}, props, { hasButtons: true }));
};
exports.WorkpadColorPicker.propTypes = color_picker_popover_1.ColorPickerPopover.propTypes;
