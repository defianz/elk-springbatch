"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
class QueryTemplate extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.setFetchMore = (val) => {
            this.fetchMore = val;
        };
        this.setFetchMoreOptions = (val) => {
            this.fetchMoreOptions = val;
        };
        this.wrappedLoadMore = (newCursor, tiebreaker) => this.fetchMore(this.fetchMoreOptions(newCursor, tiebreaker));
    }
}
exports.QueryTemplate = QueryTemplate;
