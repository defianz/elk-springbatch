"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const react_1 = tslib_1.__importStar(require("react"));
const constants_1 = require("../../../../common/constants");
const consumer_1 = require("./consumer");
class BreadcrumbManager extends react_1.Component {
    componentWillUnmount() {
        const { text, href, context } = this.props;
        context.removeCrumb({
            text,
            href,
        });
    }
    componentDidMount() {
        const { text, href, parents, context } = this.props;
        context.addCrumb({
            text,
            href,
        }, parents);
    }
    render() {
        return react_1.default.createElement("span", null);
    }
}
exports.Breadcrumb = ({ title, path, parentBreadcrumbs }) => (react_1.default.createElement(consumer_1.BreadcrumbConsumer, null, context => (react_1.default.createElement(BreadcrumbManager, { text: title, href: `#${constants_1.BASE_PATH}${path}`, parents: parentBreadcrumbs, context: context }))));
