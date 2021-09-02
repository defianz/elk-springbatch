"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const rison_node_1 = require("rison-node");
const query_string_1 = require("ui/utils/query_string");
const history_context_1 = require("./history_context");
exports.useUrlState = ({ defaultState, decodeUrlState, encodeUrlState, urlStateKey, }) => {
    const history = history_context_1.useHistory();
    const urlStateString = react_1.useMemo(() => {
        if (!history) {
            return;
        }
        return getParamFromQueryString(getQueryStringFromLocation(history.location), urlStateKey);
    }, [history && history.location, urlStateKey]);
    const decodedState = react_1.useMemo(() => decodeUrlState(decodeRisonUrlState(urlStateString)), [
        decodeUrlState,
        urlStateString,
    ]);
    const state = react_1.useMemo(() => (typeof decodedState !== 'undefined' ? decodedState : defaultState), [
        defaultState,
        decodedState,
    ]);
    const setState = react_1.useCallback((newState) => {
        if (!history) {
            return;
        }
        const location = history.location;
        const newLocation = replaceQueryStringInLocation(location, exports.replaceStateKeyInQueryString(urlStateKey, typeof newState !== 'undefined' ? encodeUrlState(newState) : undefined)(getQueryStringFromLocation(location)));
        if (newLocation !== location) {
            history.replace(newLocation);
        }
    }, [encodeUrlState, history, history && history.location, urlStateKey]);
    return [state, setState];
};
const decodeRisonUrlState = (value) => {
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
const encodeRisonUrlState = (state) => rison_node_1.encode(state);
const getQueryStringFromLocation = (location) => location.search.substring(1);
const getParamFromQueryString = (queryString, key) => {
    const queryParam = query_string_1.QueryString.decode(queryString)[key];
    return Array.isArray(queryParam) ? queryParam[0] : queryParam;
};
exports.replaceStateKeyInQueryString = (stateKey, urlState) => (queryString) => {
    const previousQueryValues = query_string_1.QueryString.decode(queryString);
    const encodedUrlState = typeof urlState !== 'undefined' ? encodeRisonUrlState(urlState) : undefined;
    return query_string_1.QueryString.encode({
        ...previousQueryValues,
        [stateKey]: encodedUrlState,
    });
};
const replaceQueryStringInLocation = (location, queryString) => {
    if (queryString === getQueryStringFromLocation(location)) {
        return location;
    }
    else {
        return {
            ...location,
            search: `?${queryString}`,
        };
    }
};
