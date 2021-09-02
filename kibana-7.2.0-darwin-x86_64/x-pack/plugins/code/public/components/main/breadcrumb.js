"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// @ts-ignore
const eui_1 = require("@elastic/eui");
const react_1 = tslib_1.__importDefault(require("react"));
const url_1 = require("../../utils/url");
class Breadcrumb extends react_1.default.PureComponent {
    render() {
        const { resource, org, repo, revision, path } = this.props.routeParams;
        const repoUri = `${resource}/${org}/${repo}`;
        const breadcrumbs = [];
        const pathSegments = path ? path.split('/') : [];
        pathSegments.forEach((p, index) => {
            const paths = pathSegments.slice(0, index + 1);
            const href = `#${repoUri}/tree/${url_1.encodeRevisionString(revision)}/${paths.join('/')}`;
            breadcrumbs.push({
                text: p,
                href,
                className: 'codeNoMinWidth',
                ['data-test-subj']: `codeFileBreadcrumb-${p}`,
            });
        });
        return react_1.default.createElement(eui_1.EuiBreadcrumbs, { max: Number.MAX_VALUE, breadcrumbs: breadcrumbs });
    }
}
exports.Breadcrumb = Breadcrumb;
