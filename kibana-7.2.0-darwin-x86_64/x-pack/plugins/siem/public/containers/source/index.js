"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const fp_1 = require("lodash/fp");
const react_apollo_1 = require("react-apollo");
const react_1 = tslib_1.__importDefault(require("react"));
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const memoize_one_1 = tslib_1.__importDefault(require("memoize-one"));
const constants_1 = require("../../../common/constants");
const index_gql_query_1 = require("./index.gql_query");
exports.getAllBrowserFields = (browserFields) => Object.values(browserFields).reduce((acc, namespace) => [
    ...acc,
    ...Object.values(namespace.fields != null ? namespace.fields : {}),
], []);
exports.getAllFieldsByName = (browserFields) => fp_1.keyBy('name', exports.getAllBrowserFields(browserFields));
class WithSource extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.getIndexFields = (title, fields) => fields && fields.length > 0
            ? {
                fields: fields.map(field => fp_1.pick(['name', 'searchable', 'type', 'aggregatable'], field)),
                title,
            }
            : { fields: [], title };
        this.getBrowserFields = (fields) => fields && fields.length > 0
            ? fields.reduce((accumulator, field) => fp_1.set([field.category, 'fields', field.name], field, accumulator), {})
            : {};
        this.memoizedIndexFields = memoize_one_1.default(this.getIndexFields);
        this.memoizedBrowserFields = memoize_one_1.default(this.getBrowserFields);
    }
    render() {
        const { children, sourceId } = this.props;
        return (react_1.default.createElement(react_apollo_1.Query, { query: index_gql_query_1.sourceQuery, fetchPolicy: "cache-first", notifyOnNetworkStatusChange: true, variables: {
                sourceId,
                defaultIndex: chrome_1.default.getUiSettingsClient().get(constants_1.DEFAULT_INDEX_KEY),
            } }, ({ data }) => {
            return children({
                indicesExist: fp_1.get('source.status.indicesExist', data),
                browserFields: this.memoizedBrowserFields(fp_1.get('source.status.indexFields', data)),
                indexPattern: this.memoizedIndexFields(chrome_1.default
                    .getUiSettingsClient()
                    .get(constants_1.DEFAULT_INDEX_KEY)
                    .join(), fp_1.get('source.status.indexFields', data)),
            });
        }));
    }
}
exports.WithSource = WithSource;
exports.indicesExistOrDataTemporarilyUnavailable = (indicesExist) => indicesExist || lodash_1.isUndefined(indicesExist);
