"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const eui_1 = require("@elastic/eui");
exports.GroupSettings = () => (react_1.default.createElement(eui_1.EuiText, { size: "s" },
    react_1.default.createElement("p", null, "Ungroup (U) to edit individual element settings."),
    react_1.default.createElement("p", null, "Save this group as a new element to re-use it throughout your workpad.")));
