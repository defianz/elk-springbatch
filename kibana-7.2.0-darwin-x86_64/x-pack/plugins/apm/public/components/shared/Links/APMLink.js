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
const url_1 = tslib_1.__importDefault(require("url"));
const lodash_1 = require("lodash");
const useLocation_1 = require("../../../hooks/useLocation");
const url_helpers_1 = require("./url_helpers");
const constants_1 = require("../../../context/UrlParamsContext/constants");
exports.PERSISTENT_APM_PARAMS = [
    'kuery',
    'rangeFrom',
    'rangeTo',
    'refreshPaused',
    'refreshInterval',
    'environment'
];
function getAPMHref(path, currentSearch, // TODO: Replace with passing in URL PARAMS here
query = {}) {
    const currentQuery = url_helpers_1.toQuery(currentSearch);
    const nextQuery = {
        ...constants_1.TIMEPICKER_DEFAULTS,
        ...lodash_1.pick(currentQuery, exports.PERSISTENT_APM_PARAMS),
        ...query
    };
    const nextSearch = url_helpers_1.fromQuery(nextQuery);
    return url_1.default.format({
        pathname: '',
        hash: `${path}?${nextSearch}`
    });
}
exports.getAPMHref = getAPMHref;
function APMLink({ path = '', query, ...rest }) {
    const { search } = useLocation_1.useLocation();
    const href = getAPMHref(path, search, query);
    return react_1.default.createElement(eui_1.EuiLink, Object.assign({}, rest, { href: href }));
}
exports.APMLink = APMLink;
