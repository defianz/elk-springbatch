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
const host_details_1 = require("./host_details");
const hosts_1 = require("./hosts");
exports.HostsContainer = recompose_1.pure(({ match }) => (react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(react_router_dom_1.Switch, null,
        react_1.default.createElement(react_router_dom_1.Route, { strict: true, exact: true, path: match.url, component: hosts_1.Hosts }),
        react_1.default.createElement(react_router_dom_1.Route, { path: `${match.url}/:hostName`, component: host_details_1.HostDetails }),
        react_1.default.createElement(react_router_dom_1.Redirect, { from: "/hosts/", to: "/hosts" })))));
