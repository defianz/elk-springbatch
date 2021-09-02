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
const ip_details_1 = require("./ip_details");
const network_1 = require("./network");
exports.NetworkContainer = recompose_1.pure(({ match }) => (react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(react_router_dom_1.Switch, null,
        react_1.default.createElement(react_router_dom_1.Route, { strict: true, exact: true, path: match.url, component: network_1.Network }),
        react_1.default.createElement(react_router_dom_1.Route, { path: `${match.url}/ip/:ip`, component: ip_details_1.IPDetails }),
        react_1.default.createElement(react_router_dom_1.Redirect, { from: "/network/", to: "/network" })))));
