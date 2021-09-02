"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const loading_indicator_1 = require("../../lib/loading_indicator");
// @ts-ignore
const modify_path_1 = require("../../lib/modify_path");
const resolved_args_1 = require("../actions/resolved_args");
const pathToKey = (path) => modify_path_1.convert(path).join('/');
exports.inFlightMiddlewareFactory = ({ loadingIndicator, pendingCache, }) => {
    return ({ dispatch }) => (next) => {
        return (action) => {
            if (action.type === resolved_args_1.setLoadingActionType) {
                const cacheKey = pathToKey(action.payload.path);
                pendingCache.push(cacheKey);
                dispatch(resolved_args_1.inFlightActive());
            }
            else if (action.type === resolved_args_1.setValueActionType) {
                const cacheKey = pathToKey(action.payload.path);
                const idx = pendingCache.indexOf(cacheKey);
                if (idx >= 0) {
                    pendingCache.splice(idx, 1);
                }
                if (pendingCache.length === 0) {
                    dispatch(resolved_args_1.inFlightComplete());
                }
            }
            else if (action.type === resolved_args_1.inFlightActiveActionType) {
                loadingIndicator.show();
            }
            else if (action.type === resolved_args_1.inFlightCompleteActionType) {
                loadingIndicator.hide();
            }
            // execute the action
            next(action);
        };
    };
};
exports.inFlight = exports.inFlightMiddlewareFactory({
    loadingIndicator: loading_indicator_1.loadingIndicator,
    pendingCache: [],
});
