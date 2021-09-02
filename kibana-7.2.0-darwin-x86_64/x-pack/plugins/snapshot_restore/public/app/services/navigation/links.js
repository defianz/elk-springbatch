"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
function linkToRepositories() {
    return `#${constants_1.BASE_PATH}/repositories`;
}
exports.linkToRepositories = linkToRepositories;
function linkToRepository(repositoryName) {
    return `#${constants_1.BASE_PATH}/repositories/${encodeURIComponent(repositoryName)}`;
}
exports.linkToRepository = linkToRepository;
function linkToSnapshots(repositoryName) {
    if (repositoryName) {
        return `#${constants_1.BASE_PATH}/snapshots?repository=${repositoryName}`;
    }
    return `#${constants_1.BASE_PATH}/snapshots`;
}
exports.linkToSnapshots = linkToSnapshots;
