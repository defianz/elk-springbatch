"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const prop_types_1 = tslib_1.__importDefault(require("prop-types"));
const react_redux_1 = require("react-redux");
// @ts-ignore unconverted local file
const workpad_1 = require("../../../state/selectors/workpad");
const element_settings_1 = require("./element_settings");
const mapStateToProps = (state, { selectedElementId }) => ({
    element: workpad_1.getElementById(state, selectedElementId, workpad_1.getSelectedPage(state)),
});
exports.ElementSettings = react_redux_1.connect(mapStateToProps)(element_settings_1.ElementSettings);
exports.ElementSettings.propTypes = {
    selectedElementId: prop_types_1.default.string.isRequired,
};
