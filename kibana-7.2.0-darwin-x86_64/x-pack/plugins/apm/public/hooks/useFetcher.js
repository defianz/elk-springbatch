"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const LoadingIndicatorContext_1 = require("../context/LoadingIndicatorContext");
const useComponentId_1 = require("./useComponentId");
var FETCH_STATUS;
(function (FETCH_STATUS) {
    FETCH_STATUS["LOADING"] = "loading";
    FETCH_STATUS["SUCCESS"] = "success";
    FETCH_STATUS["FAILURE"] = "failure";
})(FETCH_STATUS = exports.FETCH_STATUS || (exports.FETCH_STATUS = {}));
function useFetcher(fn, useEffectKey) {
    const id = useComponentId_1.useComponentId();
    const { dispatchStatus } = react_1.useContext(LoadingIndicatorContext_1.LoadingIndicatorContext);
    const [result, setResult] = react_1.useState({});
    react_1.useEffect(() => {
        let didCancel = false;
        dispatchStatus({ id, isLoading: true });
        setResult({
            data: result.data,
            status: FETCH_STATUS.LOADING,
            error: undefined
        });
        async function doFetch() {
            try {
                const data = await fn();
                if (!didCancel) {
                    dispatchStatus({ id, isLoading: false });
                    setResult({
                        data,
                        status: FETCH_STATUS.SUCCESS,
                        error: undefined
                    });
                }
            }
            catch (e) {
                if (!didCancel) {
                    dispatchStatus({ id, isLoading: false });
                    setResult({
                        data: undefined,
                        status: FETCH_STATUS.FAILURE,
                        error: e
                    });
                }
            }
        }
        doFetch();
        return () => {
            dispatchStatus({ id, isLoading: false });
            didCancel = true;
        };
    }, useEffectKey);
    return result || {};
}
exports.useFetcher = useFetcher;
