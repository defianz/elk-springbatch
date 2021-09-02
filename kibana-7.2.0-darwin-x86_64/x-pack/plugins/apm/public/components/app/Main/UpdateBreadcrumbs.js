"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const react_1 = tslib_1.__importDefault(require("react"));
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const APMLink_1 = require("../../shared/Links/APMLink");
const ProvideBreadcrumbs_1 = require("./ProvideBreadcrumbs");
const routeConfig_1 = require("./routeConfig");
class UpdateBreadcrumbsComponent extends react_1.default.Component {
    updateHeaderBreadcrumbs() {
        const breadcrumbs = this.props.breadcrumbs.map(({ value, match }) => ({
            text: value,
            href: APMLink_1.getAPMHref(match.url, this.props.location.search)
        }));
        const current = lodash_1.last(breadcrumbs) || { text: '' };
        document.title = current.text;
        chrome_1.default.breadcrumbs.set(breadcrumbs);
    }
    componentDidMount() {
        this.updateHeaderBreadcrumbs();
    }
    componentDidUpdate() {
        this.updateHeaderBreadcrumbs();
    }
    render() {
        return null;
    }
}
function UpdateBreadcrumbs() {
    return (react_1.default.createElement(ProvideBreadcrumbs_1.ProvideBreadcrumbs, { routes: routeConfig_1.routes, render: ({ breadcrumbs, location }) => (react_1.default.createElement(UpdateBreadcrumbsComponent, { breadcrumbs: breadcrumbs, location: location })) }));
}
exports.UpdateBreadcrumbs = UpdateBreadcrumbs;
