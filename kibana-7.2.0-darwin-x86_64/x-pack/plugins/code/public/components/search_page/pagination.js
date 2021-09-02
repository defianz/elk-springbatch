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
const url_2 = require("../../utils/url");
class Pagination extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.onPageClicked = (page) => {
            const { query } = this.props;
            const queries = querystring_1.default.parse(url_2.history.location.search.replace('?', ''));
            url_2.history.push(url_1.default.format({
                pathname: '/search',
                query: {
                    ...queries,
                    q: query,
                    p: page + 1,
                },
            }));
        };
    }
    render() {
        return (react_1.default.createElement(eui_1.EuiFlexGroup, { gutterSize: "l" },
            react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                react_1.default.createElement(eui_1.EuiPagination, { pageCount: this.props.totalPage, activePage: this.props.currentPage, onPageClick: this.onPageClicked }))));
    }
}
exports.Pagination = Pagination;
