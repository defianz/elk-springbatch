"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
/**
 *  Manages the creation of the scopes attached to the credentials which result
 *  from authentication.
 *
 *  These scopes are used by plugins like dashboard_mode to tag relevant
 *  requests as `xpack:dashboardMode`, which it then uses to determine
 *  how it's filter should behave.
 *
 *  This service's primary reason for existing it to track the list of functions
 *  that have been provided by plugins to which should be used to create the scopes
 *  for requests.
 */
class AuthScopeService {
    constructor() {
        this.getterFunctions = [];
    }
    /**
     *  Add a function that will be used to determine the list of scopes for a
     *  request+user combo.
     *
     *  The getterFunction should take two arguments: a `Hapi.Request` object
     *  and the `user` object returned by the es Security API.
     *
     *  The function should return either an array of tags (strings) or a
     *  promise that resolves to an array of tags.
     *
     *  @param getterFunction Auth scope getter function.
     */
    registerGetter(getterFunction) {
        if (typeof getterFunction !== 'function') {
            throw new TypeError('Expected `getterFunction` to be a function');
        }
        this.getterFunctions.push(getterFunction);
    }
    /**
     *  Determine the scope for a specific user/request. Hapi credentials (the
     *  result of a hapi auth scheme) can have a `scope` property that lists scope
     *  "tags" which can then be required by routes using the
     *  `route.config.auth.access.scope` property, or accessed in pre-functions,
     *  extensions, or route handlers as `request.auth.credentials.scope`.
     *
     *  @param request Request instance.
     *  @param user User object from the security API
     */
    async getForRequestAndUser(request, user) {
        if (!request || typeof request !== 'object') {
            throw new TypeError('getCredentialsScope() requires a request object');
        }
        if (!user || typeof user !== 'object') {
            throw new TypeError('getCredentialsScope() requires a user object');
        }
        const getterResults = await Promise.all(this.getterFunctions.map(fn => fn(request, user)));
        return lodash_1.uniq(lodash_1.flattenDeep(getterResults).filter(Boolean));
    }
}
exports.AuthScopeService = AuthScopeService;
