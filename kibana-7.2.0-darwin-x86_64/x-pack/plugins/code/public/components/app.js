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
const react_redux_1 = require("react-redux");
const admin_1 = require("./admin_page/admin");
const setup_guide_1 = require("./admin_page/setup_guide");
const diff_1 = require("./diff_page/diff");
const main_1 = require("./main/main");
const not_found_1 = require("./main/not_found");
const route_1 = require("./route");
const ROUTES = tslib_1.__importStar(require("./routes"));
const search_1 = require("./search_page/search");
const RooComponent = (props) => {
    if (props.setupOk) {
        return react_1.default.createElement(react_router_dom_1.Redirect, { to: '/admin' });
    }
    return react_1.default.createElement(setup_guide_1.SetupGuide, null);
};
const mapStateToProps = (state) => ({
    setupOk: state.setup.ok,
});
const Root = react_redux_1.connect(mapStateToProps)(RooComponent);
const Empty = () => null;
exports.App = () => {
    return (react_1.default.createElement(react_router_dom_1.HashRouter, null,
        react_1.default.createElement(react_router_dom_1.Switch, null,
            react_1.default.createElement(route_1.Route, { path: ROUTES.DIFF, exact: true, component: diff_1.Diff }),
            react_1.default.createElement(route_1.Route, { path: ROUTES.ROOT, exact: true, component: Root }),
            react_1.default.createElement(route_1.Route, { path: ROUTES.MAIN, component: main_1.Main, exact: true }),
            react_1.default.createElement(route_1.Route, { path: ROUTES.MAIN_ROOT, component: main_1.Main }),
            react_1.default.createElement(route_1.Route, { path: ROUTES.ADMIN, component: admin_1.Admin }),
            react_1.default.createElement(route_1.Route, { path: ROUTES.SEARCH, component: search_1.Search }),
            react_1.default.createElement(route_1.Route, { path: ROUTES.REPO, render: Empty, exact: true }),
            react_1.default.createElement(route_1.Route, { path: ROUTES.SETUP, component: setup_guide_1.SetupGuide, exact: true }),
            react_1.default.createElement(route_1.Route, { path: "*", component: not_found_1.NotFound }))));
};
