"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const rison_node_1 = require("rison-node");
const query_string_1 = require("ui/utils/query_string");
const constants_1 = require("./constants");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.decodeRisonUrlState = (value) => {
    try {
        return value ? rison_node_1.decode(value) : undefined;
    }
    catch (error) {
        if (error instanceof Error && error.message.startsWith('rison decoder error')) {
            return {};
        }
        throw error;
    }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.encodeRisonUrlState = (state) => rison_node_1.encode(state);
exports.getQueryStringFromLocation = (location) => location.search.substring(1);
exports.getParamFromQueryString = (queryString, key) => {
    const queryParam = query_string_1.QueryString.decode(queryString)[key];
    return Array.isArray(queryParam) ? queryParam[0] : queryParam;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.replaceStateKeyInQueryString = (stateKey, urlState) => (queryString) => {
    const previousQueryValues = query_string_1.QueryString.decode(queryString);
    // ಠ_ಠ Code was copied from x-pack/plugins/infra/public/utils/url_state.tsx ಠ_ಠ
    // Remove this if these utilities are promoted to kibana core
    const encodedUrlState = typeof urlState !== 'undefined' ? exports.encodeRisonUrlState(urlState) : undefined;
    return query_string_1.QueryString.encode({
        ...previousQueryValues,
        [stateKey]: encodedUrlState,
    });
};
exports.replaceQueryStringInLocation = (location, queryString) => {
    if (queryString === exports.getQueryStringFromLocation(location)) {
        return location;
    }
    else {
        return {
            ...location,
            search: `?${queryString}`,
        };
    }
};
exports.getCurrentLocation = (pathname) => {
    const trailingPath = pathname.match(/([^\/]+$)/);
    if (trailingPath !== null) {
        if (trailingPath[0] === 'hosts') {
            return constants_1.CONSTANTS.hostsPage;
        }
        if (trailingPath[0] === 'network') {
            return constants_1.CONSTANTS.networkPage;
        }
        if (pathname.match(/hosts\/.*?/)) {
            return constants_1.CONSTANTS.hostsDetails;
        }
        if (pathname.match(/network\/ip\/.*?/)) {
            return constants_1.CONSTANTS.networkDetails;
        }
    }
    return null;
};
exports.isKqlForRoute = (pathname, kql) => {
    const currentLocation = exports.getCurrentLocation(pathname);
    if ((currentLocation === constants_1.CONSTANTS.hostsPage && kql.queryLocation === constants_1.CONSTANTS.hostsPage) ||
        (currentLocation === constants_1.CONSTANTS.networkPage && kql.queryLocation === constants_1.CONSTANTS.networkPage) ||
        (currentLocation === constants_1.CONSTANTS.hostsDetails && kql.queryLocation === constants_1.CONSTANTS.hostsDetails) ||
        (currentLocation === constants_1.CONSTANTS.networkDetails && kql.queryLocation === constants_1.CONSTANTS.networkDetails)) {
        return true;
    }
    return false;
};
