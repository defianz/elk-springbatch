"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
// @ts-ignore
const workpad_1 = require("../../state/actions/workpad");
// @ts-ignore
const workpad_2 = require("../../state/selectors/workpad");
const workpad_color_picker_1 = require("../workpad_color_picker/workpad_color_picker");
const mapStateToProps = (state) => ({
    colors: workpad_2.getWorkpadColors(state),
});
const mapDispatchToProps = {
    onAddColor: workpad_1.addColor,
    onRemoveColor: workpad_1.removeColor,
};
exports.WorkpadColorPicker = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(workpad_color_picker_1.WorkpadColorPicker);
