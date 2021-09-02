"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const react_1 = require("react");
const index_1 = require("./index");
const ui_metric_1 = require("../ui_metric");
const { trackUiMetric } = ui_metric_1.uiMetricService;
exports.sendRequest = async ({ path, method, body, uimActionType, }) => {
    try {
        const response = await index_1.httpService.httpClient[method](path, body);
        if (!response.data) {
            throw new Error(response.statusText);
        }
        // Track successful request
        if (uimActionType) {
            trackUiMetric(uimActionType);
        }
        return {
            data: response.data,
        };
    }
    catch (e) {
        return {
            error: e,
        };
    }
};
exports.useRequest = ({ path, method, body, interval, initialData, timeout, uimActionType, }) => {
    const [error, setError] = react_1.useState(null);
    const [loading, setLoading] = react_1.useState(true);
    const [data, setData] = react_1.useState(initialData);
    // Tied to every render and bound to each request.
    let isOutdatedRequest = false;
    const request = async () => {
        setError(null);
        setData(initialData);
        setLoading(true);
        const requestBody = {
            path,
            method,
            body,
            uimActionType,
        };
        let response;
        if (timeout) {
            [response] = await Promise.all([
                exports.sendRequest(requestBody),
                new Promise(resolve => setTimeout(resolve, timeout)),
            ]);
        }
        else {
            response = await exports.sendRequest(requestBody);
        }
        // Don't update state if an outdated request has resolved.
        if (isOutdatedRequest) {
            return;
        }
        setError(response.error);
        setData(response.data);
        setLoading(false);
    };
    react_1.useEffect(() => {
        function cancelOutdatedRequest() {
            isOutdatedRequest = true;
        }
        request();
        if (interval) {
            const intervalRequest = setInterval(request, interval);
            return () => {
                cancelOutdatedRequest();
                clearInterval(intervalRequest);
            };
        }
        // Called when a new render will trigger this effect.
        return cancelOutdatedRequest;
    }, [path]);
    return {
        error,
        loading,
        data,
        request,
    };
};
