"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// @ts-ignore (elastic/eui#1262) EuiFilePicker is not exported yet
const eui_1 = require("@elastic/eui");
const prop_types_1 = tslib_1.__importDefault(require("prop-types"));
const react_1 = tslib_1.__importDefault(require("react"));
exports.FileUpload = props => (react_1.default.createElement(eui_1.EuiFilePicker, { compressed: true, id: props.id, className: props.className, onChange: props.onUpload }));
exports.FileUpload.defaultProps = {
    id: '',
    className: 'canvasFileUpload',
};
exports.FileUpload.propTypes = {
    /** Optional ID of the component */
    id: prop_types_1.default.string,
    /** Optional className of the component */
    className: prop_types_1.default.string,
    /** Function to invoke when the file is successfully uploaded */
    onUpload: prop_types_1.default.func.isRequired,
};
exports.FileUpload.displayName = 'FileUpload';
