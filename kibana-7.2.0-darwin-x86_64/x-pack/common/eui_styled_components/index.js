"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const eui_styled_components_1 = require("./eui_styled_components");
exports.css = eui_styled_components_1.css;
exports.euiStyled = eui_styled_components_1.euiStyled;
exports.EuiThemeProvider = eui_styled_components_1.EuiThemeProvider;
exports.injectGlobal = eui_styled_components_1.injectGlobal;
exports.keyframes = eui_styled_components_1.keyframes;
exports.withTheme = eui_styled_components_1.withTheme;
// In order to to mimic the styled-components module we need to ignore the following
// eslint-disable-next-line import/no-default-export
exports.default = eui_styled_components_1.euiStyled;
