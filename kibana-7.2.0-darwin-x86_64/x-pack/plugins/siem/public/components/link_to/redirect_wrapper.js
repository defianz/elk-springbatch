"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const scroll_to_top_1 = require("../scroll_to_top");
exports.RedirectWrapper = ({ to }) => {
    scroll_to_top_1.scrollToTop();
    return react_1.default.createElement(react_router_dom_1.Redirect, { to: to });
};
