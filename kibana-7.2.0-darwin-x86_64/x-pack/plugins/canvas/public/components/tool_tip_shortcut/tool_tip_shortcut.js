"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const prop_types_1 = tslib_1.__importDefault(require("prop-types"));
const eui_1 = require("@elastic/eui");
exports.ToolTipShortcut = ({ shortcut }) => (react_1.default.createElement(eui_1.EuiText, { size: "xs", textAlign: "center", color: "ghost" }, shortcut.replace(/\+/g, ' + ')));
exports.ToolTipShortcut.propTypes = {
    shortcut: prop_types_1.default.string.isRequired,
};
