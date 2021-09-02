"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const kfetch_1 = require("ui/kfetch");
const effects_1 = require("redux-saga/effects");
const actions_1 = require("../actions");
const project_config_1 = require("../actions/project_config");
function putProjectConfig(repoUri, config) {
    return kfetch_1.kfetch({
        pathname: `/api/code/repo/config/${repoUri}`,
        method: 'PUT',
        body: JSON.stringify(config),
    });
}
function* switchProjectLanguageServer(action) {
    try {
        const { repoUri, config } = action.payload;
        yield effects_1.call(putProjectConfig, repoUri, config);
        yield effects_1.put(actions_1.switchLanguageServerSuccess());
    }
    catch (err) {
        yield effects_1.put(actions_1.switchLanguageServerFailed(err));
    }
}
function* watchSwitchProjectLanguageServer() {
    yield effects_1.takeEvery(String(actions_1.switchLanguageServer), switchProjectLanguageServer);
}
exports.watchSwitchProjectLanguageServer = watchSwitchProjectLanguageServer;
function fetchConfigs(repoUri) {
    return kfetch_1.kfetch({
        pathname: `/api/code/repo/config/${repoUri}`,
    });
}
function* loadConfigs(action) {
    try {
        const repositories = action.payload;
        const promises = repositories.map(repo => effects_1.call(fetchConfigs, repo.uri));
        const configs = yield effects_1.all(promises);
        yield effects_1.put(project_config_1.loadConfigsSuccess(configs.reduce((acc, config) => {
            acc[config.uri] = config;
            return acc;
        }, {})));
    }
    catch (err) {
        yield effects_1.put(project_config_1.loadConfigsFailed(err));
    }
}
function* watchLoadConfigs() {
    yield effects_1.takeEvery(String(actions_1.fetchReposSuccess), loadConfigs);
}
exports.watchLoadConfigs = watchLoadConfigs;
