"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/* eslint-disable react/forbid-elements */
const eui_1 = require("@elastic/eui");
const prop_types_1 = tslib_1.__importDefault(require("prop-types"));
const react_1 = tslib_1.__importDefault(require("react"));
exports.ConfirmModal = props => {
    const { isOpen, title, message, onConfirm, onCancel, confirmButtonText, cancelButtonText, className, ...rest } = props;
    // render nothing if this component isn't open
    if (!isOpen) {
        return null;
    }
    return (react_1.default.createElement(eui_1.EuiOverlayMask, null,
        react_1.default.createElement(eui_1.EuiConfirmModal, Object.assign({}, rest, { className: `canvasConfirmModal ${className || ''}`, title: title, onCancel: onCancel, onConfirm: onConfirm, confirmButtonText: confirmButtonText, cancelButtonText: cancelButtonText, defaultFocusedButton: "confirm", buttonColor: "danger" }), message)));
};
exports.ConfirmModal.propTypes = {
    isOpen: prop_types_1.default.bool,
    title: prop_types_1.default.string,
    message: prop_types_1.default.string.isRequired,
    onConfirm: prop_types_1.default.func.isRequired,
    onCancel: prop_types_1.default.func.isRequired,
    cancelButtonText: prop_types_1.default.string,
    confirmButtonText: prop_types_1.default.string,
    className: prop_types_1.default.string,
};
exports.ConfirmModal.defaultProps = {
    title: 'Confirm',
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
};
