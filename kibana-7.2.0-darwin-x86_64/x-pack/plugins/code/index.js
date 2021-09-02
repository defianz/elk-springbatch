"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const path_1 = require("path");
const init_1 = require("./server/init");
const constants_1 = require("./common/constants");
exports.code = (kibana) => new kibana.Plugin({
    require: ['kibana', 'elasticsearch', 'xpack_main'],
    id: 'code',
    configPrefix: 'xpack.code',
    publicDir: path_1.resolve(__dirname, 'public'),
    uiExports: {
        app: {
            title: constants_1.APP_TITLE,
            main: 'plugins/code/app',
            euiIconType: 'codeApp',
        },
        styleSheetPaths: path_1.resolve(__dirname, 'public/index.scss'),
        injectDefaultVars(server) {
            const config = server.config();
            return {
                codeUiEnabled: config.get('xpack.code.ui.enabled'),
            };
        },
        hacks: ['plugins/code/hacks/toggle_app_link_in_nav'],
    },
    config(Joi) {
        return Joi.object({
            ui: Joi.object({
                enabled: Joi.boolean().default(false),
            }).default(),
            enabled: Joi.boolean().default(true),
            queueIndex: Joi.string().default('.code_internal-worker-queue'),
            // 1 hour by default.
            queueTimeoutMs: Joi.number().default(moment_1.default.duration(1, 'hour').asMilliseconds()),
            // The frequency which update scheduler executes. 5 minutes by default.
            updateFrequencyMs: Joi.number().default(moment_1.default.duration(5, 'minute').asMilliseconds()),
            // The frequency which index scheduler executes. 1 day by default.
            indexFrequencyMs: Joi.number().default(moment_1.default.duration(1, 'day').asMilliseconds()),
            // The frequency which each repo tries to update. 1 hour by default.
            updateRepoFrequencyMs: Joi.number().default(moment_1.default.duration(1, 'hour').asMilliseconds()),
            // The frequency which each repo tries to index. 1 day by default.
            indexRepoFrequencyMs: Joi.number().default(moment_1.default.duration(1, 'day').asMilliseconds()),
            lsp: Joi.object({
                // timeout of a request
                requestTimeoutMs: Joi.number().default(moment_1.default.duration(10, 'second').asMilliseconds()),
                // if we want the language server run in seperately
                detach: Joi.boolean().default(false),
                // whether we want to show more language server logs
                verbose: Joi.boolean().default(false),
            }).default(),
            repos: Joi.array().default([]),
            security: Joi.object({
                enableMavenImport: Joi.boolean().default(true),
                enableGradleImport: Joi.boolean().default(false),
                installNodeDependency: Joi.boolean().default(true),
                gitHostWhitelist: Joi.array()
                    .items(Joi.string())
                    .default([
                    'github.com',
                    'gitlab.com',
                    'bitbucket.org',
                    'gitbox.apache.org',
                    'eclipse.org',
                ]),
                gitProtocolWhitelist: Joi.array()
                    .items(Joi.string())
                    .default(['https', 'git', 'ssh']),
                enableGitCertCheck: Joi.boolean().default(true),
            }).default(),
            maxWorkspace: Joi.number().default(5),
            disableIndexScheduler: Joi.boolean().default(true),
            enableGlobalReference: Joi.boolean().default(false),
            codeNodeUrl: Joi.string(),
        }).default();
    },
    init: init_1.init,
});
