"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const lodash_1 = require("lodash");
const helpers_1 = require("./helpers");
const resolveUrlParams_1 = require("./resolveUrlParams");
function useUiFilters({ kuery, environment }) {
    return react_1.useMemo(() => ({ kuery, environment }), [kuery, environment]);
}
exports.useUiFilters = useUiFilters;
const defaultRefresh = (time) => { };
const UrlParamsContext = react_1.createContext({
    urlParams: {},
    refreshTimeRange: defaultRefresh,
    uiFilters: {}
});
exports.UrlParamsContext = UrlParamsContext;
const UrlParamsProvider = react_router_dom_1.withRouter(({ location, children }) => {
    const refUrlParams = react_1.useRef(resolveUrlParams_1.resolveUrlParams(location, {}));
    const [, forceUpdate] = react_1.useState('');
    const urlParams = react_1.useMemo(() => resolveUrlParams_1.resolveUrlParams(location, {
        start: refUrlParams.current.start,
        end: refUrlParams.current.end,
        rangeFrom: refUrlParams.current.rangeFrom,
        rangeTo: refUrlParams.current.rangeTo
    }), [location, refUrlParams.current]);
    refUrlParams.current = urlParams;
    const refreshTimeRange = react_1.useCallback((timeRange) => {
        refUrlParams.current = {
            ...refUrlParams.current,
            start: helpers_1.getParsedDate(timeRange.rangeFrom),
            end: helpers_1.getParsedDate(timeRange.rangeTo, { roundUp: true })
        };
        forceUpdate(lodash_1.uniqueId());
    }, [forceUpdate]);
    const uiFilters = useUiFilters(urlParams);
    const contextValue = react_1.useMemo(() => {
        return {
            urlParams,
            refreshTimeRange,
            uiFilters
        };
    }, [urlParams, refreshTimeRange, uiFilters]);
    return (react_1.default.createElement(UrlParamsContext.Provider, { children: children, value: contextValue }));
});
exports.UrlParamsProvider = UrlParamsProvider;
