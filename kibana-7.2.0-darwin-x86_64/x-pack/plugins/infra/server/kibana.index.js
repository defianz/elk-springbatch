"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
const infra_server_1 = require("./infra_server");
const kibana_1 = require("./lib/compose/kibana");
const usage_collector_1 = require("./usage/usage_collector");
exports.initServerWithKibana = (kbnServer) => {
    const libs = kibana_1.compose(kbnServer);
    infra_server_1.initInfraServer(libs);
    kbnServer.expose('defineInternalSourceConfiguration', libs.sources.defineInternalSourceConfiguration.bind(libs.sources));
    // Register a function with server to manage the collection of usage stats
    kbnServer.usage.collectorSet.register(usage_collector_1.UsageCollector.getUsageCollector(kbnServer));
    const xpackMainPlugin = kbnServer.plugins.xpack_main;
    xpackMainPlugin.registerFeature({
        id: 'infrastructure',
        name: i18n_1.i18n.translate('xpack.infra.featureRegistry.linkInfrastructureTitle', {
            defaultMessage: 'Infrastructure',
        }),
        icon: 'infraApp',
        navLinkId: 'infra:home',
        app: ['infra', 'kibana'],
        catalogue: ['infraops'],
        privileges: {
            all: {
                api: ['infra'],
                savedObject: {
                    all: ['infrastructure-ui-source'],
                    read: ['index-pattern'],
                },
                ui: ['show', 'configureSource', 'save'],
            },
            read: {
                api: ['infra'],
                savedObject: {
                    all: [],
                    read: ['infrastructure-ui-source', 'index-pattern'],
                },
                ui: ['show'],
            },
        },
    });
    xpackMainPlugin.registerFeature({
        id: 'logs',
        name: i18n_1.i18n.translate('xpack.infra.featureRegistry.linkLogsTitle', {
            defaultMessage: 'Logs',
        }),
        icon: 'loggingApp',
        navLinkId: 'infra:logs',
        app: ['infra', 'kibana'],
        catalogue: ['infralogging'],
        privileges: {
            all: {
                api: ['infra'],
                savedObject: {
                    all: ['infrastructure-ui-source'],
                    read: [],
                },
                ui: ['show', 'configureSource', 'save'],
            },
            read: {
                api: ['infra'],
                savedObject: {
                    all: [],
                    read: ['infrastructure-ui-source'],
                },
                ui: ['show'],
            },
        },
    });
};
exports.getConfigSchema = (Joi) => {
    const InfraDefaultSourceConfigSchema = Joi.object({
        metricAlias: Joi.string(),
        logAlias: Joi.string(),
        fields: Joi.object({
            container: Joi.string(),
            host: Joi.string(),
            message: Joi.array()
                .items(Joi.string())
                .single(),
            pod: Joi.string(),
            tiebreaker: Joi.string(),
            timestamp: Joi.string(),
        }),
    });
    const InfraRootConfigSchema = Joi.object({
        enabled: Joi.boolean().default(true),
        query: Joi.object({
            partitionSize: Joi.number(),
            partitionFactor: Joi.number(),
        }).default(),
        sources: Joi.object()
            .keys({
            default: InfraDefaultSourceConfigSchema,
        })
            .default(),
    }).default();
    return InfraRootConfigSchema;
};
