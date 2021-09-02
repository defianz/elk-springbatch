"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fp_1 = require("lodash/fp");
const memoize_one_1 = tslib_1.__importDefault(require("memoize-one"));
const keury_1 = require("../../lib/keury");
const data_provider_1 = require("./data_providers/data_provider");
const convertDateFieldToQuery = (field, value) => `${field}: ${fp_1.isNumber(value) ? value : new Date(value).valueOf()}`;
const getBaseFields = memoize_one_1.default((browserFields) => {
    const baseFields = fp_1.get('base', browserFields);
    if (baseFields != null && baseFields.fields != null) {
        return Object.keys(baseFields.fields);
    }
    return [];
});
const getBrowserFieldPath = (field, browserFields) => {
    const splitFields = field.split('.');
    const baseFields = getBaseFields(browserFields);
    if (baseFields.includes(field)) {
        return ['base', 'fields', field];
    }
    return [splitFields[0], 'fields', field];
};
const checkIfFieldTypeIsDate = (field, browserFields) => {
    const pathBrowserField = getBrowserFieldPath(field, browserFields);
    const browserField = fp_1.get(pathBrowserField, browserFields);
    if (browserField != null && browserField.type === 'date') {
        return true;
    }
    return false;
};
const buildQueryMatch = (dataProvider, browserFields) => `${dataProvider.excluded ? 'NOT ' : ''}${dataProvider.queryMatch.operator !== data_provider_1.EXISTS_OPERATOR
    ? checkIfFieldTypeIsDate(dataProvider.queryMatch.field, browserFields)
        ? convertDateFieldToQuery(dataProvider.queryMatch.field, dataProvider.queryMatch.value)
        : `${dataProvider.queryMatch.field} : ${fp_1.isNumber(dataProvider.queryMatch.value)
            ? dataProvider.queryMatch.value
            : keury_1.escapeQueryValue(dataProvider.queryMatch.value)}`
    : `${dataProvider.queryMatch.field} ${data_provider_1.EXISTS_OPERATOR}`}`.trim();
const buildQueryForAndProvider = (dataAndProviders, browserFields) => dataAndProviders
    .reduce((andQuery, andDataProvider) => {
    const prepend = (q) => `${q !== '' ? `${q} and ` : ''}`;
    return andDataProvider.enabled
        ? `${prepend(andQuery)} ${buildQueryMatch(andDataProvider, browserFields)}`
        : andQuery;
}, '')
    .trim();
exports.buildGlobalQuery = (dataProviders, browserFields) => dataProviders
    .reduce((query, dataProvider) => {
    const prepend = (q) => `${q !== '' ? `${q} or ` : ''}`;
    return dataProvider.enabled
        ? `${prepend(query)}(
        ${buildQueryMatch(dataProvider, browserFields)}
        ${dataProvider.and.length > 0
            ? ` and ${buildQueryForAndProvider(dataProvider.and, browserFields)}`
            : ''})`.trim()
        : query;
}, '')
    .trim();
exports.combineQueries = (dataProviders, indexPattern, browserFields, kqlQuery, kqlMode, start, end) => {
    if (fp_1.isEmpty(dataProviders) && fp_1.isEmpty(kqlQuery)) {
        return null;
    }
    else if (fp_1.isEmpty(dataProviders) && !fp_1.isEmpty(kqlQuery)) {
        return {
            filterQuery: keury_1.convertKueryToElasticSearchQuery(`(${kqlQuery}) and @timestamp >= ${start} and @timestamp <= ${end}`, indexPattern),
        };
    }
    else if (!fp_1.isEmpty(dataProviders) && fp_1.isEmpty(kqlQuery)) {
        return {
            filterQuery: keury_1.convertKueryToElasticSearchQuery(`((${exports.buildGlobalQuery(dataProviders, browserFields)}) and @timestamp >= ${start} and @timestamp <= ${end})`, indexPattern),
        };
    }
    const operatorKqlQuery = kqlMode === 'filter' ? 'and' : 'or';
    const postpend = (q) => `${!fp_1.isEmpty(q) ? ` ${operatorKqlQuery} (${q})` : ''}`;
    const globalQuery = `((${exports.buildGlobalQuery(dataProviders, browserFields)}${postpend(kqlQuery)}) and @timestamp >= ${start} and @timestamp <= ${end})`;
    return {
        filterQuery: keury_1.convertKueryToElasticSearchQuery(globalQuery, indexPattern),
    };
};
exports.calculateBodyHeight = ({ flyoutHeight = 0, flyoutHeaderHeight = 0, timelineHeaderHeight = 0, timelineFooterHeight = 0, }) => flyoutHeight - (flyoutHeaderHeight + timelineHeaderHeight + timelineFooterHeight);
