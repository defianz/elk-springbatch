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
exports.loadRepositories = () => {
    return use_request_1.useRequest({
        path: http_1.httpService.addBasePath(`${constants_1.API_BASE_PATH}repositories`),
        method: 'get',
        initialData: [],
        timeout: constants_2.MINIMUM_TIMEOUT_MS,
    });
};
exports.loadRepository = (name) => {
    return use_request_1.useRequest({
        path: http_1.httpService.addBasePath(`${constants_1.API_BASE_PATH}repositories/${encodeURIComponent(name)}`),
        method: 'get',
    });
};
exports.verifyRepository = (name) => {
    return use_request_1.sendRequest({
        path: http_1.httpService.addBasePath(`${constants_1.API_BASE_PATH}repositories/${encodeURIComponent(name)}/verify`),
        method: 'get',
        uimActionType: constants_2.UIM_REPOSITORY_DETAIL_PANEL_VERIFY,
    });
};
exports.loadRepositoryTypes = () => {
    return use_request_1.useRequest({
        path: http_1.httpService.addBasePath(`${constants_1.API_BASE_PATH}repository_types`),
        method: 'get',
        initialData: [],
    });
};
exports.addRepository = async (newRepository) => {
    return use_request_1.sendRequest({
        path: http_1.httpService.addBasePath(`${constants_1.API_BASE_PATH}repositories`),
        method: 'put',
        body: newRepository,
        uimActionType: constants_2.UIM_REPOSITORY_CREATE,
    });
};
exports.editRepository = async (editedRepository) => {
    return use_request_1.sendRequest({
        path: http_1.httpService.addBasePath(`${constants_1.API_BASE_PATH}repositories/${encodeURIComponent(editedRepository.name)}`),
        method: 'put',
        body: editedRepository,
        uimActionType: constants_2.UIM_REPOSITORY_UPDATE,
    });
};
exports.deleteRepositories = async (names) => {
    return use_request_1.sendRequest({
        path: http_1.httpService.addBasePath(`${constants_1.API_BASE_PATH}repositories/${names.map(name => encodeURIComponent(name)).join(',')}`),
        method: 'delete',
        uimActionType: names.length > 1 ? constants_2.UIM_REPOSITORY_DELETE_MANY : constants_2.UIM_REPOSITORY_DELETE,
    });
};
