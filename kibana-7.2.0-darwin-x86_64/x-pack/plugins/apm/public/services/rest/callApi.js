"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const lru_cache_1 = tslib_1.__importDefault(require("lru-cache"));
const object_hash_1 = tslib_1.__importDefault(require("object-hash"));
const kfetch_1 = require("ui/kfetch");
function fetchOptionsWithDebug(fetchOptions) {
    const debugEnabled = sessionStorage.getItem('apm_debug') === 'true' &&
        lodash_1.startsWith(fetchOptions.pathname, '/api/apm');
    if (!debugEnabled) {
        return fetchOptions;
    }
    return {
        ...fetchOptions,
        query: {
            ...fetchOptions.query,
            _debug: true
        }
    };
}
const cache = new lru_cache_1.default({ max: 100, maxAge: 1000 * 60 * 60 });
function _clearCache() {
    cache.reset();
}
exports._clearCache = _clearCache;
async function callApi(fetchOptions, options) {
    const cacheKey = getCacheKey(fetchOptions);
    const cacheResponse = cache.get(cacheKey);
    if (cacheResponse) {
        return cacheResponse;
    }
    const combinedFetchOptions = fetchOptionsWithDebug(fetchOptions);
    const res = await kfetch_1.kfetch(combinedFetchOptions, options);
    if (isCachable(fetchOptions)) {
        cache.set(cacheKey, res);
    }
    return res;
}
exports.callApi = callApi;
// only cache items that has a time range with `start` and `end` params,
// and where `end` is not a timestamp in the future
function isCachable(fetchOptions) {
    if (!(fetchOptions.query && fetchOptions.query.start && fetchOptions.query.end)) {
        return false;
    }
    return (lodash_1.isString(fetchOptions.query.end) &&
        new Date(fetchOptions.query.end).getTime() < Date.now());
}
// order the options object to make sure that two objects with the same arguments, produce produce the
// same cache key regardless of the order of properties
function getCacheKey(options) {
    return object_hash_1.default(options);
}
