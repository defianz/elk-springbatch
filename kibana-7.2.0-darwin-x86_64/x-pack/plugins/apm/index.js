"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const i18n_1 = require("@kbn/i18n");
const path_1 = require("path");
const mappings_json_1 = tslib_1.__importDefault(require("./mappings.json"));
const index_1 = require("./server/new-platform/index");
exports.apm = kibana => {
    return new kibana.Plugin({
        require: ['kibana', 'elasticsearch', 'xpack_main', 'apm_oss'],
        id: 'apm',
        configPrefix: 'xpack.apm',
        publicDir: path_1.resolve(__dirname, 'public'),
        uiExports: {
            app: {
                title: 'APM',
                description: i18n_1.i18n.translate('xpack.apm.apmForESDescription', {
                    defaultMessage: 'APM for the Elastic Stack'
                }),
                main: 'plugins/apm/index',
                icon: 'plugins/apm/icon.svg',
                euiIconType: 'apmApp',
                order: 8100
            },
            styleSheetPaths: path_1.resolve(__dirname, 'public/index.scss'),
            home: ['plugins/apm/register_feature'],
            // TODO: get proper types
            injectDefaultVars(server) {
                const config = server.config();
                return {
                    apmUiEnabled: config.get('xpack.apm.ui.enabled'),
                    apmIndexPatternTitle: config.get('apm_oss.indexPattern') // TODO: rename to apm_oss.indexPatternTitle in 7.0 (breaking change)
                };
            },
            hacks: ['plugins/apm/hacks/toggle_app_link_in_nav'],
            savedObjectSchemas: {
                'apm-telemetry': {
                    isNamespaceAgnostic: true
                }
            },
            mappings: mappings_json_1.default
        },
        // TODO: get proper types
        config(Joi) {
            return Joi.object({
                // display menu item
                ui: Joi.object({
                    enabled: Joi.boolean().default(true),
                    transactionGroupBucketSize: Joi.number().default(100)
                }).default(),
                // enable plugin
                enabled: Joi.boolean().default(true),
                // buckets
                minimumBucketSize: Joi.number().default(15),
                bucketTargetCount: Joi.number().default(27)
            }).default();
        },
        // TODO: get proper types
        init(server) {
            server.plugins.xpack_main.registerFeature({
                id: 'apm',
                name: i18n_1.i18n.translate('xpack.apm.featureRegistry.apmFeatureName', {
                    defaultMessage: 'APM'
                }),
                icon: 'apmApp',
                navLinkId: 'apm',
                app: ['apm', 'kibana'],
                catalogue: ['apm'],
                privileges: {
                    all: {
                        api: ['apm'],
                        catalogue: ['apm'],
                        savedObject: {
                            all: [],
                            read: []
                        },
                        ui: ['show', 'save']
                    },
                    read: {
                        api: ['apm'],
                        catalogue: ['apm'],
                        savedObject: {
                            all: [],
                            read: []
                        },
                        ui: ['show']
                    }
                }
            });
            const initializerContext = {};
            const core = {
                http: {
                    server
                }
            };
            index_1.plugin(initializerContext).setup(core);
        }
    });
};
