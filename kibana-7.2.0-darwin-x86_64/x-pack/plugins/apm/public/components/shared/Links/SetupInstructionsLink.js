"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const i18n_1 = require("@kbn/i18n");
const react_1 = tslib_1.__importDefault(require("react"));
const KibanaLink_1 = require("./KibanaLink");
const SETUP_INSTRUCTIONS_LABEL = i18n_1.i18n.translate('xpack.apm.setupInstructionsButtonLabel', {
    defaultMessage: 'Setup Instructions'
});
// renders a filled button or a link as a kibana link to setup instructions
function SetupInstructionsLink({ buttonFill = false }) {
    return (react_1.default.createElement(KibanaLink_1.KibanaLink, { path: '/home/tutorial/apm' }, buttonFill ? (react_1.default.createElement(eui_1.EuiButton, { size: "s", color: "primary", fill: buttonFill, iconType: "help" }, SETUP_INSTRUCTIONS_LABEL)) : (react_1.default.createElement(eui_1.EuiButtonEmpty, { size: "s", color: "primary", iconType: "help" }, SETUP_INSTRUCTIONS_LABEL))));
}
exports.SetupInstructionsLink = SetupInstructionsLink;
