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
exports.Tag = ({ name, color = '#666666', type = 'health', ...rest }) => {
    switch (type) {
        case 'health':
            return (react_1.default.createElement(eui_1.EuiHealth, Object.assign({ color: color }, rest), name));
        case 'badge':
            return (react_1.default.createElement(eui_1.EuiBadge, Object.assign({ color: color }, rest), name));
    }
};
exports.Tag.propTypes = {
    name: prop_types_1.default.string.isRequired,
    color: prop_types_1.default.string,
    type: prop_types_1.default.string,
};
