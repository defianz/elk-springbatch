"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const eui_1 = require("@elastic/eui");
const react_1 = tslib_1.__importStar(require("react"));
const useDelayedVisibility_1 = require("../components/shared/useDelayedVisibility");
exports.LoadingIndicatorContext = react_1.default.createContext({
    statuses: {},
    dispatchStatus: (action) => undefined
});
function reducer(statuses, action) {
    // add loading status
    if (action.isLoading) {
        return { ...statuses, [action.id]: true };
    }
    // remove loading status
    const { [action.id]: statusToRemove, ...restStatuses } = statuses;
    return restStatuses;
}
function getIsAnyLoading(statuses) {
    return Object.values(statuses).some(isLoading => isLoading);
}
function LoadingIndicatorProvider({ children }) {
    const [statuses, dispatchStatus] = react_1.useReducer(reducer, {});
    const isLoading = react_1.useMemo(() => getIsAnyLoading(statuses), [statuses]);
    const shouldShowLoadingIndicator = useDelayedVisibility_1.useDelayedVisibility(isLoading);
    const contextValue = react_1.default.useMemo(() => ({ statuses, dispatchStatus }), [
        statuses
    ]);
    return (react_1.default.createElement(react_1.Fragment, null,
        shouldShowLoadingIndicator && (react_1.default.createElement(eui_1.EuiPortal, null,
            react_1.default.createElement(eui_1.EuiProgress, { size: "xs", position: "fixed" }))),
        react_1.default.createElement(exports.LoadingIndicatorContext.Provider, { value: contextValue, children: children })));
}
exports.LoadingIndicatorProvider = LoadingIndicatorProvider;
