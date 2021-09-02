"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const querystring_1 = tslib_1.__importDefault(require("querystring"));
const react_1 = tslib_1.__importDefault(require("react"));
const url_1 = tslib_1.__importDefault(require("url"));
const model_1 = require("../../../model");
const url_2 = require("../../utils/url");
class ScopeTabs extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.onTabClicked = (scope) => {
            return () => {
                const { query } = this.props;
                const queries = querystring_1.default.parse(url_2.history.location.search.replace('?', ''));
                url_2.history.push(url_1.default.format({
                    pathname: '/search',
                    query: {
                        ...queries,
                        q: query,
                        scope,
                    },
                }));
            };
        };
    }
    render() {
        return (react_1.default.createElement("div", { className: "codeContainer__tabs" },
            react_1.default.createElement(eui_1.EuiTabs, { style: { height: '100%' } },
                react_1.default.createElement(eui_1.EuiTab, { className: "codeUtility__width--half", isSelected: this.props.scope !== model_1.SearchScope.REPOSITORY, onClick: this.onTabClicked(model_1.SearchScope.DEFAULT) }, "Code"),
                react_1.default.createElement(eui_1.EuiTab, { className: "codeUtility__width--half", isSelected: this.props.scope === model_1.SearchScope.REPOSITORY, onClick: this.onTabClicked(model_1.SearchScope.REPOSITORY) }, "Repository"))));
    }
}
exports.ScopeTabs = ScopeTabs;
