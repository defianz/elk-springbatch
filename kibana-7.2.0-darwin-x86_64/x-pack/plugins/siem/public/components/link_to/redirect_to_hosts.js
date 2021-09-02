"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const redirect_wrapper_1 = require("./redirect_wrapper");
exports.RedirectToHostsPage = ({ match: { params: { hostName }, }, }) => react_1.default.createElement(redirect_wrapper_1.RedirectWrapper, { to: hostName ? `/hosts/${hostName}` : '/hosts' });
exports.getHostsUrl = () => '#/link-to/hosts';
