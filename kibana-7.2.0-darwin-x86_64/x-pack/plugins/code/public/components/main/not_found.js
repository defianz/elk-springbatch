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
const error_panel_1 = require("./error_panel");
exports.NotFound = () => (react_1.default.createElement(eui_1.EuiFlexGroup, { alignItems: "center", justifyContent: "flexStart" },
    react_1.default.createElement(error_panel_1.ErrorPanel, { title: react_1.default.createElement("h2", null, "404"), content: "Unfortunately that page doesn\u2019t exist. You can try searching to find what you\u2019re looking for." })));
