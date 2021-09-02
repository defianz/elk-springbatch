"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const ELIGIBLE_FLAT_MERGE_KEYS = ['catalogue'];
function uiCapabilitiesForFeatures(xpackMainPlugin) {
    const features = xpackMainPlugin.getFeatures();
    const featureCapabilities = features.map(getCapabilitiesFromFeature);
    return buildCapabilities(...featureCapabilities);
}
exports.uiCapabilitiesForFeatures = uiCapabilitiesForFeatures;
function getCapabilitiesFromFeature(feature) {
    const UIFeatureCapabilities = {
        catalogue: {},
        [feature.id]: {},
    };
    if (feature.catalogue) {
        UIFeatureCapabilities.catalogue = {
            ...UIFeatureCapabilities.catalogue,
            ...feature.catalogue.reduce((acc, capability) => ({
                ...acc,
                [capability]: true,
            }), {}),
        };
    }
    Object.values(feature.privileges).forEach(privilege => {
        UIFeatureCapabilities[feature.id] = {
            ...UIFeatureCapabilities[feature.id],
            ...privilege.ui.reduce((privilegeAcc, capability) => ({
                ...privilegeAcc,
                [capability]: true,
            }), {}),
        };
    });
    return UIFeatureCapabilities;
}
function buildCapabilities(...allFeatureCapabilities) {
    return allFeatureCapabilities.reduce((acc, capabilities) => {
        const mergableCapabilities = lodash_1.default.omit(capabilities, ...ELIGIBLE_FLAT_MERGE_KEYS);
        const mergedFeatureCapabilities = {
            ...mergableCapabilities,
            ...acc,
        };
        ELIGIBLE_FLAT_MERGE_KEYS.forEach(key => {
            mergedFeatureCapabilities[key] = {
                ...mergedFeatureCapabilities[key],
                ...capabilities[key],
            };
        });
        return mergedFeatureCapabilities;
    }, {});
}
