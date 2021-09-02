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
const redirect_to_hosts_1 = require("./redirect_to_hosts");
const redirect_to_network_1 = require("./redirect_to_network");
const redirect_to_overview_1 = require("./redirect_to_overview");
const redirect_to_timelines_1 = require("./redirect_to_timelines");
exports.LinkToPage = recompose_1.pure(({ match }) => (react_1.default.createElement(react_router_dom_1.Switch, null,
    react_1.default.createElement(react_router_dom_1.Route, { path: `${match.url}/overview`, component: redirect_to_overview_1.RedirectToOverviewPage }),
    react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: `${match.url}/hosts`, component: redirect_to_hosts_1.RedirectToHostsPage }),
    react_1.default.createElement(react_router_dom_1.Route, { path: `${match.url}/hosts/:hostName`, component: redirect_to_hosts_1.RedirectToHostsPage }),
    react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: `${match.url}/network`, component: redirect_to_network_1.RedirectToNetworkPage }),
    react_1.default.createElement(react_router_dom_1.Route, { path: `${match.url}/network/ip/:ip`, component: redirect_to_network_1.RedirectToNetworkPage }),
    react_1.default.createElement(react_router_dom_1.Route, { path: `${match.url}/timelines`, component: redirect_to_timelines_1.RedirectToTimelinesPage }),
    react_1.default.createElement(react_router_dom_1.Redirect, { to: "/" }))));
