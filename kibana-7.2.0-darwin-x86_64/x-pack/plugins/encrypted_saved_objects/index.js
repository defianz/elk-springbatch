"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const audit_logger_1 = require("../../server/lib/audit_logger");
const plugin_1 = require("./server/plugin");
exports.encryptedSavedObjects = (kibana) => new kibana.Plugin({
    id: plugin_1.PLUGIN_ID,
    configPrefix: plugin_1.CONFIG_PREFIX,
    require: ['kibana', 'elasticsearch', 'xpack_main'],
    config(Joi) {
        return Joi.object({
            enabled: Joi.boolean().default(true),
            encryptionKey: Joi.when(Joi.ref('$dist'), {
                is: true,
                then: Joi.string().min(32),
                otherwise: Joi.string()
                    .min(32)
                    .default('a'.repeat(32)),
            }),
        }).default();
    },
    async init(server) {
        const loggerFacade = {
            fatal: (errorOrMessage) => server.log(['fatal', plugin_1.PLUGIN_ID], errorOrMessage),
            trace: (message) => server.log(['debug', plugin_1.PLUGIN_ID], message),
            error: (message) => server.log(['error', plugin_1.PLUGIN_ID], message),
            warn: (message) => server.log(['warning', plugin_1.PLUGIN_ID], message),
            debug: (message) => server.log(['debug', plugin_1.PLUGIN_ID], message),
            info: (message) => server.log(['info', plugin_1.PLUGIN_ID], message),
        };
        const config = server.config();
        const encryptedSavedObjectsSetup = new plugin_1.Plugin(loggerFacade).setup({
            config: {
                encryptionKey: config.get(`${plugin_1.CONFIG_PREFIX}.encryptionKey`),
            },
            savedObjects: server.savedObjects,
            elasticsearch: server.plugins.elasticsearch,
        }, { audit: new audit_logger_1.AuditLogger(server, plugin_1.PLUGIN_ID, config, server.plugins.xpack_main.info) });
        // Re-expose plugin setup contract through legacy mechanism.
        for (const [setupMethodName, setupMethod] of Object.entries(encryptedSavedObjectsSetup)) {
            server.expose(setupMethodName, setupMethod);
        }
    },
});
