"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Base class that all authentication providers should extend.
 */
class BaseAuthenticationProvider {
    /**
     * Instantiates AuthenticationProvider.
     * @param options Provider options object.
     */
    constructor(options) {
        this.options = options;
    }
}
exports.BaseAuthenticationProvider = BaseAuthenticationProvider;
