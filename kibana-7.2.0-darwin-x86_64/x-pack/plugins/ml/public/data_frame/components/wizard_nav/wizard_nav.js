"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const i18n_1 = require("@kbn/i18n");
const eui_1 = require("@elastic/eui");
exports.WizardNav = ({ previous, previousActive = true, next, nextActive = true, }) => (react_1.default.createElement(eui_1.EuiFlexGroup, null,
    react_1.default.createElement(eui_1.EuiFlexItem, null),
    previous && (react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
        react_1.default.createElement(eui_1.EuiButton, { disabled: !previousActive, onClick: previous, iconType: "arrowLeft", size: "s" }, i18n_1.i18n.translate('xpack.ml.dataframe.wizard.previousStepButton', {
            defaultMessage: 'Previous',
        })))),
    next && (react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
        react_1.default.createElement(eui_1.EuiButton, { disabled: !nextActive, onClick: next, iconType: "arrowRight", size: "s" }, i18n_1.i18n.translate('xpack.ml.dataframe.wizard.nextStepButton', {
            defaultMessage: 'Next',
        }))))));
