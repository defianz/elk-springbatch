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
const redirect_to_logs_1 = require("./redirect_to_logs");
const redirect_to_node_detail_1 = require("./redirect_to_node_detail");
const redirect_to_node_logs_1 = require("./redirect_to_node_logs");
const redirect_to_host_detail_via_ip_1 = require("./redirect_to_host_detail_via_ip");
class LinkToPage extends react_1.default.Component {
    render() {
        const { match } = this.props;
        return (react_1.default.createElement(react_router_dom_1.Switch, null,
            react_1.default.createElement(react_router_dom_1.Route, { path: `${match.url}/:sourceId?/:nodeType(host|container|pod)-logs/:nodeId`, component: redirect_to_node_logs_1.RedirectToNodeLogs }),
            react_1.default.createElement(react_router_dom_1.Route, { path: `${match.url}/:nodeType(host|container|pod)-detail/:nodeId`, component: redirect_to_node_detail_1.RedirectToNodeDetail }),
            react_1.default.createElement(react_router_dom_1.Route, { path: `${match.url}/host-detail-via-ip/:hostIp`, component: redirect_to_host_detail_via_ip_1.RedirectToHostDetailViaIP }),
            react_1.default.createElement(react_router_dom_1.Route, { path: `${match.url}/:sourceId?/logs`, component: redirect_to_logs_1.RedirectToLogs }),
            react_1.default.createElement(react_router_dom_1.Redirect, { to: "/infrastructure" })));
    }
}
exports.LinkToPage = LinkToPage;
