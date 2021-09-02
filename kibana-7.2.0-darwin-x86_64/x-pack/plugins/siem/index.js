"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
const path_1 = require("path");
const kibana_index_1 = require("./server/kibana.index");
const saved_objects_1 = require("./server/saved_objects");
const constants_1 = require("./common/constants");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function siem(kibana) {
    return new kibana.Plugin({
        id: constants_1.APP_ID,
        configPrefix: 'xpack.siem',
        publicDir: path_1.resolve(__dirname, 'public'),
        require: ['kibana', 'elasticsearch'],
        uiExports: {
            app: {
                description: i18n_1.i18n.translate('xpack.siem.securityDescription', {
                    defaultMessage: 'Explore your SIEM App',
                }),
                main: 'plugins/siem/app',
                euiIconType: 'securityAnalyticsApp',
                title: constants_1.APP_NAME,
                listed: false,
                url: `/app/${constants_1.APP_ID}`,
            },
            home: ['plugins/siem/register_feature'],
            links: [
                {
                    description: i18n_1.i18n.translate('xpack.siem.linkSecurityDescription', {
                        defaultMessage: 'Explore your SIEM App',
                    }),
                    euiIconType: 'securityAnalyticsApp',
                    id: 'siem',
                    order: 9000,
                    title: constants_1.APP_NAME,
                    url: `/app/${constants_1.APP_ID}`,
                },
            ],
            uiSettingDefaults: {
                [constants_1.DEFAULT_INDEX_KEY]: {
                    name: i18n_1.i18n.translate('xpack.siem.uiSettings.defaultIndexLabel', {
                        defaultMessage: 'Default index',
                    }),
                    value: ['auditbeat-*', 'filebeat-*', 'packetbeat-*', 'winlogbeat-*'],
                    description: i18n_1.i18n.translate('xpack.siem.uiSettings.defaultIndexDescription', {
                        defaultMessage: 'Default Elasticsearch index to search',
                    }),
                    category: ['siem'],
                    requiresPageReload: true,
                },
            },
            mappings: saved_objects_1.savedObjectMappings,
        },
        init(server) {
            kibana_index_1.initServerWithKibana(server);
        },
    });
}
exports.siem = siem;
