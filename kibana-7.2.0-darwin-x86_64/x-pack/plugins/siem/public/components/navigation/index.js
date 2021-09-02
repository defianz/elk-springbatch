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
const breadcrumbs_1 = require("./breadcrumbs");
const tab_navigation_1 = require("./tab_navigation");
class SiemNavigationComponent extends react_1.default.Component {
    shouldComponentUpdate(nextProps) {
        if (this.props.location.pathname === nextProps.location.pathname) {
            return false;
        }
        return true;
    }
    componentWillMount() {
        const { location } = this.props;
        if (location.pathname) {
            breadcrumbs_1.setBreadcrumbs(location.pathname);
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            breadcrumbs_1.setBreadcrumbs(nextProps.location.pathname);
        }
    }
    render() {
        const { location } = this.props;
        return react_1.default.createElement(tab_navigation_1.TabNavigation, { location: location.pathname });
    }
}
exports.SiemNavigationComponent = SiemNavigationComponent;
exports.SiemNavigation = react_router_dom_1.withRouter(SiemNavigationComponent);
