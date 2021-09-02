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
const react_2 = require("ui/capabilities/react");
const _404_1 = require("./pages/404");
const infrastructure_1 = require("./pages/infrastructure");
const link_to_1 = require("./pages/link_to");
const logs_1 = require("./pages/logs");
const metrics_1 = require("./pages/metrics");
const PageRouterComponent = ({ history, uiCapabilities }) => {
    return (react_1.default.createElement(react_router_dom_1.Router, { history: history },
        react_1.default.createElement(react_router_dom_1.Switch, null,
            uiCapabilities.infrastructure.show && (react_1.default.createElement(react_router_dom_1.Redirect, { from: "/", exact: true, to: "/infrastructure/inventory" })),
            uiCapabilities.infrastructure.show && (react_1.default.createElement(react_router_dom_1.Redirect, { from: "/infrastructure", exact: true, to: "/infrastructure/inventory" })),
            uiCapabilities.infrastructure.show && (react_1.default.createElement(react_router_dom_1.Redirect, { from: "/infrastructure/snapshot", exact: true, to: "/infrastructure/inventory" })),
            uiCapabilities.infrastructure.show && (react_1.default.createElement(react_router_dom_1.Redirect, { from: "/home", exact: true, to: "/infrastructure/inventory" })),
            uiCapabilities.logs.show && react_1.default.createElement(react_router_dom_1.Route, { path: "/logs", component: logs_1.LogsPage }),
            uiCapabilities.infrastructure.show && (react_1.default.createElement(react_router_dom_1.Route, { path: "/infrastructure", component: infrastructure_1.InfrastructurePage })),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/link-to", component: link_to_1.LinkToPage }),
            uiCapabilities.infrastructure.show && (react_1.default.createElement(react_router_dom_1.Route, { path: "/metrics/:type/:node", component: metrics_1.MetricDetail })),
            react_1.default.createElement(react_router_dom_1.Route, { component: _404_1.NotFoundPage }))));
};
exports.PageRouter = react_2.injectUICapabilities(PageRouterComponent);
