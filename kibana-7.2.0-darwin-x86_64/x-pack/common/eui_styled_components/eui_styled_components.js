"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const styledComponents = tslib_1.__importStar(require("styled-components"));
const styled_components_1 = require("styled-components");
const eui_theme_dark_json_1 = tslib_1.__importDefault(require("@elastic/eui/dist/eui_theme_dark.json"));
const eui_theme_light_json_1 = tslib_1.__importDefault(require("@elastic/eui/dist/eui_theme_light.json"));
const EuiThemeProvider = ({ darkMode = false, ...otherProps }) => (react_1.default.createElement(styled_components_1.ThemeProvider, Object.assign({}, otherProps, { theme: () => ({
        eui: darkMode ? eui_theme_dark_json_1.default : eui_theme_light_json_1.default,
        darkMode,
    }) })));
exports.EuiThemeProvider = EuiThemeProvider;
const { default: euiStyled, css, injectGlobal, keyframes, withTheme, } = styledComponents;
exports.euiStyled = euiStyled;
exports.css = css;
exports.injectGlobal = injectGlobal;
exports.keyframes = keyframes;
exports.withTheme = withTheme;
