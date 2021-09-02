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
const recompose_1 = require("recompose");
const _404_1 = require("./pages/404");
const home_1 = require("./pages/home");
exports.PageRouter = recompose_1.pure(({ history }) => (react_1.default.createElement(react_router_dom_1.Router, { history: history },
    react_1.default.createElement(react_router_dom_1.Switch, null,
        react_1.default.createElement(react_router_dom_1.Route, { path: "/", component: home_1.HomePage }),
        react_1.default.createElement(react_router_dom_1.Route, { component: _404_1.NotFoundPage })))));
