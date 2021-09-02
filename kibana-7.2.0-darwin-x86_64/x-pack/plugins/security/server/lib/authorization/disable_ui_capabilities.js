"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function disableUICapabilitesFactory(server, request) {
    const { security: { authorization }, xpack_main: xpackMainPlugin, } = server.plugins;
    const features = xpackMainPlugin.getFeatures();
    const featureNavLinkIds = features
        .map(feature => feature.navLinkId)
        .filter(navLinkId => navLinkId != null);
    const actions = authorization.actions;
    const shouldDisableFeatureUICapability = (featureId, uiCapability) => {
        // if the navLink isn't for a feature that we have registered, we don't wish to
        // disable it based on privileges
        return featureId !== 'navLinks' || featureNavLinkIds.includes(uiCapability);
    };
    const disableAll = (uiCapabilities) => {
        return lodash_1.mapValues(uiCapabilities, (featureUICapabilities, featureId) => lodash_1.mapValues(featureUICapabilities, (value, uiCapability) => {
            if (typeof value === 'boolean') {
                if (shouldDisableFeatureUICapability(featureId, uiCapability)) {
                    return false;
                }
                return value;
            }
            if (lodash_1.isObject(value)) {
                return lodash_1.mapValues(value, () => false);
            }
            throw new Error(`Expected value type of boolean or object, but found ${value}`);
        }));
    };
    const usingPrivileges = async (uiCapabilities) => {
        function getActionsForFeatureCapability(featureId, uiCapability, value) {
            if (typeof value === 'boolean') {
                return [actions.ui.get(featureId, uiCapability)];
            }
            if (lodash_1.isObject(value)) {
                return Object.keys(value).map(item => actions.ui.get(featureId, uiCapability, item));
            }
            throw new Error(`Expected value type of boolean or object, but found ${value}`);
        }
        const uiActions = Object.entries(uiCapabilities).reduce((acc, [featureId, featureUICapabilities]) => [
            ...acc,
            ...lodash_1.flatten(Object.entries(featureUICapabilities).map(([uiCapability, value]) => {
                return getActionsForFeatureCapability(featureId, uiCapability, value);
            })),
        ], []);
        let checkPrivilegesResponse;
        try {
            const checkPrivilegesDynamically = authorization.checkPrivilegesDynamicallyWithRequest(request);
            checkPrivilegesResponse = await checkPrivilegesDynamically(uiActions);
        }
        catch (err) {
            // if we get a 401/403, then we want to disable all uiCapabilities, as this
            // is generally when the user hasn't authenticated yet and we're displaying the
            // login screen, which isn't driven any uiCapabilities
            if (err.statusCode === 401 || err.statusCode === 403) {
                server.log(['security', 'debug'], `Disabling all uiCapabilities because we received a ${err.statusCode}: ${err.message}`);
                return disableAll(uiCapabilities);
            }
            throw err;
        }
        const checkPrivilegesForCapability = (enabled, featureId, ...uiCapabilityParts) => {
            // if the uiCapability has already been disabled, we don't want to re-enable it
            if (enabled === false) {
                return false;
            }
            const action = actions.ui.get(featureId, ...uiCapabilityParts);
            return checkPrivilegesResponse.privileges[action] === true;
        };
        return lodash_1.mapValues(uiCapabilities, (featureUICapabilities, featureId) => {
            return lodash_1.mapValues(featureUICapabilities, (value, uiCapability) => {
                if (typeof value === 'boolean') {
                    if (!shouldDisableFeatureUICapability(featureId, uiCapability)) {
                        return value;
                    }
                    return checkPrivilegesForCapability(value, featureId, uiCapability);
                }
                if (lodash_1.isObject(value)) {
                    const res = lodash_1.mapValues(value, (enabled, subUiCapability) => {
                        return checkPrivilegesForCapability(enabled, featureId, uiCapability, subUiCapability);
                    });
                    return res;
                }
                throw new Error(`Unexpected UI Capability value. Expected boolean or object, but found ${value}`);
            });
        });
    };
    return {
        all: disableAll,
        usingPrivileges,
    };
}
exports.disableUICapabilitesFactory = disableUICapabilitesFactory;
