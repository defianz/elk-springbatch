"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const on_post_auth_interceptor_1 = require("./on_post_auth_interceptor");
const on_request_interceptor_1 = require("./on_request_interceptor");
function initSpacesRequestInterceptors(server) {
    on_request_interceptor_1.initSpacesOnRequestInterceptor(server);
    on_post_auth_interceptor_1.initSpacesOnPostAuthRequestInterceptor(server);
}
exports.initSpacesRequestInterceptors = initSpacesRequestInterceptors;
