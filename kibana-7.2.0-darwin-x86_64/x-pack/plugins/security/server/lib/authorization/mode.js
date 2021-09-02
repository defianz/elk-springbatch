"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function authorizationModeFactory(securityXPackFeature) {
    const useRbacForRequestCache = new WeakMap();
    return {
        useRbacForRequest(request) {
            if (!useRbacForRequestCache.has(request)) {
                useRbacForRequestCache.set(request, Boolean(securityXPackFeature.getLicenseCheckResults().allowRbac));
            }
            return useRbacForRequestCache.get(request);
        },
    };
}
exports.authorizationModeFactory = authorizationModeFactory;
