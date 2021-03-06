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
const APP_ID = 'infra';
function infra(kibana) {
    return new kibana.Plugin({
        id: APP_ID,
        configPrefix: 'xpack.infra',
        publicDir: path_1.resolve(__dirname, 'public'),
        require: ['kibana', 'elasticsearch', 'metrics'],
        uiExports: {
            app: {
                description: i18n_1.i18n.translate('xpack.infra.infrastructureDescription', {
                    defaultMessage: 'Explore your infrastructure',
                }),
                icon: 'plugins/infra/images/infra_mono_white.svg',
                main: 'plugins/infra/app',
                title: i18n_1.i18n.translate('xpack.infra.infrastructureTitle', {
                    defaultMessage: 'Infrastructure',
                }),
                listed: false,
                url: `/app/${APP_ID}#/infrastructure`,
            },
            styleSheetPaths: path_1.resolve(__dirname, 'public/index.scss'),
            home: ['plugins/infra/register_feature'],
            links: [
                {
                    description: i18n_1.i18n.translate('xpack.infra.linkInfrastructureDescription', {
                        defaultMessage: 'Explore your infrastructure',
                    }),
                    icon: 'plugins/infra/images/infra_mono_white.svg',
                    euiIconType: 'infraApp',
                    id: 'infra:home',
                    order: 8000,
                    title: i18n_1.i18n.translate('xpack.infra.linkInfrastructureTitle', {
                        defaultMessage: 'Infrastructure',
                    }),
                    url: `/app/${APP_ID}#/infrastructure`,
                },
                {
                    description: i18n_1.i18n.translate('xpack.infra.linkLogsDescription', {
                        defaultMessage: 'Explore your logs',
                    }),
                    icon: 'plugins/infra/images/logging_mono_white.svg',
                    euiIconType: 'loggingApp',
                    id: 'infra:logs',
                    order: 8001,
                    title: i18n_1.i18n.translate('xpack.infra.linkLogsTitle', {
                        defaultMessage: 'Logs',
                    }),
                    url: `/app/${APP_ID}#/logs`,
                },
            ],
            mappings: saved_objects_1.savedObjectMappings,
        },
        config(Joi) {
            return kibana_index_1.getConfigSchema(Joi);
        },
        init(server) {
            kibana_index_1.initServerWithKibana(server);
        },
    });
}
exports.infra = infra;
