"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const recompose_1 = require("recompose");
const react_2 = require("@kbn/i18n/react");
exports.NotFoundPage = recompose_1.pure(() => (react_1.default.createElement("div", null,
    react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.siem.pages.fourohfour.noContentFoundDescription", defaultMessage: "No content found" }))));
