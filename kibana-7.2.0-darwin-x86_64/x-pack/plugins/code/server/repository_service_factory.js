"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const repository_service_1 = require("./repository_service");
class RepositoryServiceFactory {
    newInstance(repoPath, credsPath, log, enableGitCertCheck) {
        return new repository_service_1.RepositoryService(repoPath, credsPath, log, enableGitCertCheck);
    }
}
exports.RepositoryServiceFactory = RepositoryServiceFactory;
