"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const lodash_1 = tslib_1.__importDefault(require("lodash"));
function toggleUICapabilities(features, uiCapabilities, activeSpace) {
    const clonedCapabilities = lodash_1.default.cloneDeep(uiCapabilities);
    toggleDisabledFeatures(features, clonedCapabilities, activeSpace);
    return clonedCapabilities;
}
exports.toggleUICapabilities = toggleUICapabilities;
function toggleDisabledFeatures(features, uiCapabilities, activeSpace) {
    const disabledFeatureKeys = activeSpace.disabledFeatures;
    const disabledFeatures = disabledFeatureKeys
        .map(key => features.find(feature => feature.id === key))
        .filter(feature => typeof feature !== 'undefined');
    const navLinks = uiCapabilities.navLinks;
    const catalogueEntries = uiCapabilities.catalogue;
    const managementItems = uiCapabilities.management;
    for (const feature of disabledFeatures) {
        // Disable associated navLink, if one exists
        if (feature.navLinkId && navLinks.hasOwnProperty(feature.navLinkId)) {
            navLinks[feature.navLinkId] = false;
        }
        // Disable associated catalogue entries
        const privilegeCatalogueEntries = feature.catalogue || [];
        privilegeCatalogueEntries.forEach(catalogueEntryId => {
            catalogueEntries[catalogueEntryId] = false;
        });
        // Disable associated management items
        const privilegeManagementSections = feature.management || {};
        Object.entries(privilegeManagementSections).forEach(([sectionId, sectionItems]) => {
            sectionItems.forEach(item => {
                if (managementItems.hasOwnProperty(sectionId) &&
                    managementItems[sectionId].hasOwnProperty(item)) {
                    managementItems[sectionId][item] = false;
                }
            });
        });
        // TODO: Revisit if/when savedObjectsManagement UI Capabilities are refactored
        if (feature.id === 'savedObjectsManagement') {
            const capability = uiCapabilities[feature.id];
            Object.keys(capability).forEach(savedObjectType => {
                Object.keys(capability[savedObjectType]).forEach(typeCapability => {
                    capability[savedObjectType][typeCapability] = false;
                });
            });
            continue;
        }
        // Disable "sub features" that match the disabled feature
        if (uiCapabilities.hasOwnProperty(feature.id)) {
            const capability = uiCapabilities[feature.id];
            Object.keys(capability).forEach(featureKey => {
                capability[featureKey] = false;
            });
        }
    }
}
