"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const feature_privilege_builder_1 = require("./feature_privilege_builder");
function privilegesFactory(actions, xpackMainPlugin) {
    const featurePrivilegeBuilder = feature_privilege_builder_1.featurePrivilegeBuilderFactory(actions);
    return {
        get() {
            const features = xpackMainPlugin.getFeatures();
            const allActions = lodash_1.uniq(lodash_1.flatten(features.map(feature => Object.values(feature.privileges).reduce((acc, privilege) => {
                return [...acc, ...featurePrivilegeBuilder.getActions(privilege, feature)];
            }, []))));
            const readActions = lodash_1.uniq(lodash_1.flatten(features.map(feature => Object.entries(feature.privileges).reduce((acc, [privilegeId, privilege]) => {
                if (privilegeId !== 'read') {
                    return acc;
                }
                return [...acc, ...featurePrivilegeBuilder.getActions(privilege, feature)];
            }, []))));
            return {
                features: features.reduce((acc, feature) => {
                    if (Object.keys(feature.privileges).length > 0) {
                        acc[feature.id] = lodash_1.mapValues(feature.privileges, (privilege, privilegeId) => [
                            actions.login,
                            actions.version,
                            ...featurePrivilegeBuilder.getActions(privilege, feature),
                            ...(privilegeId === 'all' ? [actions.allHack] : []),
                        ]);
                    }
                    return acc;
                }, {}),
                global: {
                    all: [
                        actions.login,
                        actions.version,
                        actions.api.get('features'),
                        actions.space.manage,
                        actions.ui.get('spaces', 'manage'),
                        ...allActions,
                        actions.allHack,
                    ],
                    read: [actions.login, actions.version, ...readActions],
                },
                space: {
                    all: [actions.login, actions.version, ...allActions, actions.allHack],
                    read: [actions.login, actions.version, ...readActions],
                },
                reserved: features.reduce((acc, feature) => {
                    if (feature.reserved) {
                        acc[feature.id] = [
                            actions.version,
                            ...featurePrivilegeBuilder.getActions(feature.reserved.privilege, feature),
                        ];
                    }
                    return acc;
                }, {}),
            };
        },
    };
}
exports.privilegesFactory = privilegesFactory;
