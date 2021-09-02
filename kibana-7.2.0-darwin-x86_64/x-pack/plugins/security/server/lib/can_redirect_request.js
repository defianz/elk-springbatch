"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const ROUTE_TAG_API = 'api';
const KIBANA_XSRF_HEADER = 'kbn-xsrf';
const KIBANA_VERSION_HEADER = 'kbn-version';
/**
 * Checks whether we can reply to the request with redirect response. We can do that
 * only for non-AJAX and non-API requests.
 * @param request HapiJS request instance to check redirection possibility for.
 */
function canRedirectRequest(request) {
    const hasVersionHeader = lodash_1.has(request.raw.req.headers, KIBANA_VERSION_HEADER);
    const hasXsrfHeader = lodash_1.has(request.raw.req.headers, KIBANA_XSRF_HEADER);
    const isApiRoute = lodash_1.contains(lodash_1.get(request, 'route.settings.tags'), ROUTE_TAG_API);
    const isAjaxRequest = hasVersionHeader || hasXsrfHeader;
    return !isApiRoute && !isAjaxRequest;
}
exports.canRedirectRequest = canRedirectRequest;
