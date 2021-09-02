"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class RepositoryIndexInitializerFactory {
    constructor(client, log) {
        this.client = client;
        this.log = log;
    }
    async create(repoUri, revision) {
        return new _1.RepositoryIndexInitializer(repoUri, revision, this.client, this.log);
    }
}
exports.RepositoryIndexInitializerFactory = RepositoryIndexInitializerFactory;
