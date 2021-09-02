"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const constants_1 = require("../../../../common/constants");
const constants_2 = require("../../constants");
const http_1 = require("./http");
const use_request_1 = require("./use_request");
exports.loadSnapshots = () => use_request_1.useRequest({
    path: http_1.httpService.addBasePath(`${constants_1.API_BASE_PATH}snapshots`),
    method: 'get',
    initialData: [],
    timeout: constants_2.MINIMUM_TIMEOUT_MS,
});
exports.loadSnapshot = (repositoryName, snapshotId) => use_request_1.useRequest({
    path: http_1.httpService.addBasePath(`${constants_1.API_BASE_PATH}snapshots/${encodeURIComponent(repositoryName)}/${encodeURIComponent(snapshotId)}`),
    method: 'get',
});
