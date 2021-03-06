"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const feature_catalogue_1 = require("ui/registry/feature_catalogue");
const APP_ID = 'infra';
feature_catalogue_1.FeatureCatalogueRegistryProvider.register((i18n) => ({
    id: 'infraops',
    title: i18n('xpack.infra.registerFeatures.infraOpsTitle', {
        defaultMessage: 'Infrastructure',
    }),
    description: i18n('xpack.infra.registerFeatures.infraOpsDescription', {
        defaultMessage: 'Explore infrastructure metrics and logs for common servers, containers, and services.',
    }),
    icon: 'infraApp',
    path: `/app/${APP_ID}#infrastructure`,
    showOnHomePage: true,
    category: feature_catalogue_1.FeatureCatalogueCategory.DATA,
}));
feature_catalogue_1.FeatureCatalogueRegistryProvider.register((i18n) => ({
    id: 'infralogging',
    title: i18n('xpack.infra.registerFeatures.logsTitle', {
        defaultMessage: 'Logs',
    }),
    description: i18n('xpack.infra.registerFeatures.logsDescription', {
        defaultMessage: 'Stream logs in real time or scroll through historical views in a console-like experience.',
    }),
    icon: 'loggingApp',
    path: `/app/${APP_ID}#logs`,
    showOnHomePage: true,
    category: feature_catalogue_1.FeatureCatalogueCategory.DATA,
}));
