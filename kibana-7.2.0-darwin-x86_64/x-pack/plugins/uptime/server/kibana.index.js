"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
const constants_1 = require("../common/constants");
const kibana_1 = require("./lib/compose/kibana");
const uptime_server_1 = require("./uptime_server");
exports.initServerWithKibana = (server) => {
    const libs = kibana_1.compose(server);
    uptime_server_1.initUptimeServer(libs);
    const xpackMainPlugin = server.plugins.xpack_main;
    xpackMainPlugin.registerFeature({
        id: constants_1.PLUGIN.ID,
        name: i18n_1.i18n.translate('xpack.uptime.featureRegistry.uptimeFeatureName', {
            defaultMessage: 'Uptime',
        }),
        navLinkId: constants_1.PLUGIN.ID,
        icon: 'uptimeApp',
        app: ['uptime', 'kibana'],
        catalogue: ['uptime'],
        privileges: {
            all: {
                api: ['uptime'],
                savedObject: {
                    all: [],
                    read: [],
                },
                ui: ['save'],
            },
            read: {
                api: ['uptime'],
                savedObject: {
                    all: [],
                    read: [],
                },
                ui: [],
            },
        },
    });
};
