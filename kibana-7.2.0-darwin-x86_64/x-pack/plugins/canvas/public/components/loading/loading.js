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
const hex_to_rgb_1 = require("../../../common/lib/hex_to_rgb");
exports.Loading = ({ animated = false, text = '', backgroundColor = '#000000', }) => {
    if (animated) {
        return (react_1.default.createElement("div", { className: "canvasLoading" },
            text && (react_1.default.createElement("span", null,
                text,
                "\u00A0")),
            react_1.default.createElement(eui_1.EuiLoadingSpinner, { size: "m" })));
    }
    const rgb = hex_to_rgb_1.hexToRgb(backgroundColor);
    let color = 'text';
    if (rgb && eui_1.isColorDark(rgb[0], rgb[1], rgb[2])) {
        color = 'ghost';
    }
    return (react_1.default.createElement("div", { className: "canvasLoading" },
        text && (react_1.default.createElement("span", null,
            text,
            "\u00A0")),
        react_1.default.createElement(eui_1.EuiIcon, { color: color, type: "clock" })));
};
exports.Loading.propTypes = {
    animated: prop_types_1.default.bool,
    backgroundColor: prop_types_1.default.string,
    text: prop_types_1.default.string,
};
exports.Loading.defaultProps = {
    animated: false,
    backgroundColor: '#000000',
    text: '',
};
