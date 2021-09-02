"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
const init_server_1 = require("./init_server");
const kibana_1 = require("./lib/compose/kibana");
const logger_1 = require("./utils/logger");
const saved_objects_1 = require("./saved_objects");
const APP_ID = 'siem';
exports.amMocking = () => process.env.INGEST_MOCKS === 'true';
exports.initServerWithKibana = (kbnServer) => {
    // bind is so "this" binds correctly to the logger since hapi server does not auto-bind its methods
    const logger = logger_1.createLogger(kbnServer.log.bind(kbnServer));
    logger.info('Plugin initializing');
    const mocking = exports.amMocking();
    if (mocking) {
        logger.info(`Mocks for ${APP_ID} is activated. No real ${APP_ID} data will be used, only mocks will be used.`);
    }
    const libs = kibana_1.compose(kbnServer);
    init_server_1.initServer(libs, { mocking, logger });
    logger.info('Plugin done initializing');
    const xpackMainPlugin = kbnServer.plugins.xpack_main;
    xpackMainPlugin.registerFeature({
        id: APP_ID,
        name: i18n_1.i18n.translate('xpack.siem.featureRegistry.linkSiemTitle', {
            defaultMessage: 'SIEM',
        }),
        icon: 'securityAnalyticsApp',
        navLinkId: 'siem',
        app: ['siem', 'kibana'],
        catalogue: ['siem'],
        privileges: {
            all: {
                api: ['siem'],
                savedObject: {
                    all: [saved_objects_1.noteSavedObjectType, saved_objects_1.pinnedEventSavedObjectType, saved_objects_1.timelineSavedObjectType],
                    read: ['config'],
                },
                ui: ['show'],
            },
            read: {
                api: ['siem'],
                savedObject: {
                    all: [],
                    read: [
                        'config',
                        saved_objects_1.noteSavedObjectType,
                        saved_objects_1.pinnedEventSavedObjectType,
                        saved_objects_1.timelineSavedObjectType,
                    ],
                },
                ui: ['show'],
            },
        },
    });
};
