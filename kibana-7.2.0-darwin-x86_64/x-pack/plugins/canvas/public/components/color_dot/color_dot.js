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
exports.ColorDot = ({ value, children }) => {
    const tc = tinycolor2_1.default(value);
    let style = {};
    if (tc.isValid()) {
        style = { background: value };
    }
    return (react_1.default.createElement("div", { className: "canvasColorDot" },
        react_1.default.createElement("div", { className: "canvasColorDot__background canvasCheckered" }),
        react_1.default.createElement("div", { className: "canvasColorDot__foreground", style: style }, children)));
};
exports.ColorDot.propTypes = {
    value: prop_types_1.default.string,
    children: prop_types_1.default.node,
};
