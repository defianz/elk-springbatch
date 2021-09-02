"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const constants_1 = require("./common/constants");
const plugin_1 = require("./plugin");
const shim_1 = require("./shim");
function snapshotRestore(kibana) {
    return new kibana.Plugin({
        id: constants_1.PLUGIN.ID,
        configPrefix: 'xpack.snapshot_restore',
        publicDir: path_1.resolve(__dirname, 'public'),
        require: ['kibana', 'elasticsearch', 'xpack_main'],
        uiExports: {
            managementSections: ['plugins/snapshot_restore'],
        },
        init(server) {
            const { core, plugins } = shim_1.createShim(server, constants_1.PLUGIN.ID);
            const { i18n } = core;
            const snapshotRestorePlugin = new plugin_1.Plugin();
            // Start plugin
            snapshotRestorePlugin.start(core, plugins);
            // Register license checker
            plugins.license.registerLicenseChecker(server, constants_1.PLUGIN.ID, constants_1.PLUGIN.getI18nName(i18n), constants_1.PLUGIN.MINIMUM_LICENSE_REQUIRED);
        },
    });
}
exports.snapshotRestore = snapshotRestore;
