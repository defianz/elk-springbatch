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
class RoutedTabs extends react_1.default.Component {
    render() {
        return react_1.default.createElement(eui_1.EuiTabs, null, this.renderTabs());
    }
    renderTabs() {
        return this.props.tabs.map(tab => {
            return (react_1.default.createElement(react_router_dom_1.Route, { key: `${tab.path}${tab.title}`, path: tab.path, children: ({ match, history }) => (react_1.default.createElement(eui_1.EuiTab, { onClick: () => (match ? undefined : history.push(tab.path)), isSelected: match !== null }, tab.title)) }));
        });
    }
}
exports.RoutedTabs = RoutedTabs;
