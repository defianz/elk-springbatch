"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = tslib_1.__importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const useLocation_1 = require("../../../hooks/useLocation");
const history_1 = require("../../../utils/history");
function isTabSelected(tab, currentPath) {
    if (tab.routePath) {
        return !!react_router_dom_1.matchPath(currentPath, { path: tab.routePath, exact: true });
    }
    return currentPath === tab.path;
}
function HistoryTabs({ tabs }) {
    const location = useLocation_1.useLocation();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(eui_1.EuiTabs, null, tabs.map((tab, i) => (react_1.default.createElement(eui_1.EuiTab, { onClick: () => history_1.history.push({ ...location, pathname: tab.path }), isSelected: isTabSelected(tab, location.pathname), key: `${tab.path}--${i}` }, tab.name)))),
        react_1.default.createElement(eui_1.EuiSpacer, null),
        tabs.map(tab => tab.render ? (react_1.default.createElement(react_router_dom_1.Route, { path: tab.routePath || tab.path, render: tab.render, key: tab.path })) : null)));
}
exports.HistoryTabs = HistoryTabs;
