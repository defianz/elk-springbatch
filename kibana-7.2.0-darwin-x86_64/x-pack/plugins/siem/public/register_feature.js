"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const feature_catalogue_1 = require("ui/registry/feature_catalogue");
const APP_ID = 'siem';
feature_catalogue_1.FeatureCatalogueRegistryProvider.register(() => ({
    id: 'siem',
    title: 'SIEM',
    description: 'Explore security metrics and logs for events and alerts',
    icon: 'securityAnalyticsApp',
    path: `/app/${APP_ID}`,
    showOnHomePage: true,
    category: feature_catalogue_1.FeatureCatalogueCategory.DATA,
}));
