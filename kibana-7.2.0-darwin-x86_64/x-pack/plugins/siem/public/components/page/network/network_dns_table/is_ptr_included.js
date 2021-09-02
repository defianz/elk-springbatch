"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = tslib_1.__importDefault(require("react"));
const recompose_1 = require("recompose");
const i18n = tslib_1.__importStar(require("./translations"));
exports.IsPtrIncluded = recompose_1.pure(({ isPtrIncluded, onChange }) => (react_1.default.createElement(eui_1.EuiSwitch, { name: "switch-ptr-included", label: i18n.INCLUDE_PTR_RECORDS, checked: isPtrIncluded, onChange: onChange })));
