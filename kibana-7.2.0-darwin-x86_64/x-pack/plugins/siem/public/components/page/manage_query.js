"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fp_1 = require("lodash/fp");
const react_1 = tslib_1.__importDefault(require("react"));
function manageQuery(WrappedComponent) {
    class ManageQuery extends react_1.default.PureComponent {
        componentDidUpdate(prevProps) {
            const { loading, id, refetch, setQuery } = this.props;
            if (prevProps.loading !== loading) {
                setQuery({ id, loading, refetch });
            }
        }
        render() {
            const otherProps = fp_1.omit(['id', 'refetch', 'setQuery'], this.props);
            return react_1.default.createElement(WrappedComponent, Object.assign({}, otherProps));
        }
    }
    return ManageQuery;
}
exports.manageQuery = manageQuery;
