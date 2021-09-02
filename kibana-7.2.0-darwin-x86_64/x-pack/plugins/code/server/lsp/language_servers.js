"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const installation_1 = require("../../common/installation");
const go_launcher_1 = require("./go_launcher");
const java_launcher_1 = require("./java_launcher");
const ts_launcher_1 = require("./ts_launcher");
exports.TYPESCRIPT = {
    name: 'TypeScript',
    builtinWorkspaceFolders: false,
    languages: ['typescript', 'javascript'],
    launcher: ts_launcher_1.TypescriptServerLauncher,
    installationType: installation_1.InstallationType.Embed,
    embedPath: require.resolve('@elastic/javascript-typescript-langserver/lib/language-server.js'),
};
exports.JAVA = {
    name: 'Java',
    builtinWorkspaceFolders: true,
    languages: ['java'],
    launcher: java_launcher_1.JavaLauncher,
    installationType: installation_1.InstallationType.Plugin,
    installationPluginName: 'java-langserver',
    installationFolderName: 'jdt',
    downloadUrl: (version, devMode) => devMode
        ? `https://snapshots.elastic.co/downloads/java-langserver-plugins/java-langserver/java-langserver-${version}-SNAPSHOT-$OS.zip`
        : `https://artifacts.elastic.co/downloads/java-langserver-plugins/java-langserver/java-langserver-${version}-$OS.zip`,
};
exports.GO = {
    name: 'Go',
    builtinWorkspaceFolders: true,
    languages: ['go'],
    launcher: go_launcher_1.GoLauncher,
    installationType: installation_1.InstallationType.Plugin,
    installationPluginName: 'goLanguageServer',
};
exports.LanguageServers = [exports.TYPESCRIPT, exports.JAVA];
exports.LanguageServersDeveloping = [exports.GO];
