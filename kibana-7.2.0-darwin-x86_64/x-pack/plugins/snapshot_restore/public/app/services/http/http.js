"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class HttpService {
    constructor() {
        this.addBasePath = () => '';
    }
    init(httpClient, chrome) {
        this.client = httpClient;
        this.addBasePath = chrome.addBasePath.bind(chrome);
    }
    get httpClient() {
        return this.client;
    }
}
exports.httpService = new HttpService();
