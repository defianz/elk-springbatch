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
const url_1 = require("../../utils/url");
const url_2 = require("../../utils/url");
const breadcrumb_1 = require("./breadcrumb");
const search_bar_1 = require("../search_bar");
class TopBar extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.state = {
            value: 'master',
        };
        this.onChange = (e) => {
            const { resource, org, repo, path = '', pathType } = this.props.routeParams;
            this.setState({
                value: e.target.value,
            });
            const revision = this.props.branches.find(b => b.name === e.target.value).commit.id;
            url_2.history.push(`/${resource}/${org}/${repo}/${pathType}/${url_1.encodeRevisionString(revision)}/${path}`);
        };
    }
    render() {
        return (react_1.default.createElement("div", { className: "code-top-bar__container" },
            react_1.default.createElement(search_bar_1.SearchBar, { query: this.props.query, onSearchScopeChanged: this.props.onSearchScopeChanged, enableSubmitWhenOptionsChanged: false, searchOptions: this.props.searchOptions }),
            react_1.default.createElement(eui_1.EuiFlexGroup, { gutterSize: "none", justifyContent: "spaceBetween", className: "codeTopBar__toolbar" },
                react_1.default.createElement(eui_1.EuiFlexItem, null,
                    react_1.default.createElement(eui_1.EuiFlexGroup, { gutterSize: "none" },
                        react_1.default.createElement(eui_1.EuiFlexItem, { className: "codeContainer__select", grow: false, style: { display: 'none' } },
                            react_1.default.createElement(eui_1.EuiSelect, { options: this.props.branches.map(b => ({ value: b.name, text: b.name })), onChange: this.onChange })),
                        react_1.default.createElement(breadcrumb_1.Breadcrumb, { routeParams: this.props.routeParams }))),
                react_1.default.createElement(eui_1.EuiFlexItem, { grow: false }, this.props.buttons))));
    }
}
exports.TopBar = TopBar;
