"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const kfetch_1 = require("ui/kfetch");
const effects_1 = require("redux-saga/effects");
const language_server_1 = require("../actions/language_server");
function fetchLangServers() {
    return kfetch_1.kfetch({
        pathname: '/api/code/install',
    });
}
function installLanguageServer(languageServer) {
    return kfetch_1.kfetch({
        pathname: `/api/code/install/${languageServer}`,
        method: 'POST',
    });
}
function* handleInstallLanguageServer(action) {
    try {
        yield effects_1.call(installLanguageServer, action.payload);
        yield effects_1.put(language_server_1.requestInstallLanguageServerSuccess(action.payload));
    }
    catch (err) {
        yield effects_1.put(language_server_1.requestInstallLanguageServerFailed(err));
    }
}
function* handleLoadLanguageServer() {
    try {
        const langServers = yield effects_1.call(fetchLangServers);
        yield effects_1.put(language_server_1.loadLanguageServersSuccess(langServers));
    }
    catch (err) {
        yield effects_1.put(language_server_1.loadLanguageServersFailed(err));
    }
}
function* watchLoadLanguageServers() {
    yield effects_1.takeEvery(String(language_server_1.loadLanguageServers), handleLoadLanguageServer);
}
exports.watchLoadLanguageServers = watchLoadLanguageServers;
function* watchInstallLanguageServer() {
    yield effects_1.takeEvery(String(language_server_1.requestInstallLanguageServer), handleInstallLanguageServer);
}
exports.watchInstallLanguageServer = watchInstallLanguageServer;
