"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const privilege_serializer_1 = require("./privilege_serializer");
exports.serializePrivileges = (application, privilegeMap) => {
    return {
        [application]: {
            ...Object.entries(privilegeMap.global).reduce((acc, [privilegeName, privilegeActions]) => {
                const name = privilege_serializer_1.PrivilegeSerializer.serializeGlobalBasePrivilege(privilegeName);
                acc[name] = {
                    application,
                    name: privilegeName,
                    actions: privilegeActions,
                    metadata: {},
                };
                return acc;
            }, {}),
            ...Object.entries(privilegeMap.space).reduce((acc, [privilegeName, privilegeActions]) => {
                const name = privilege_serializer_1.PrivilegeSerializer.serializeSpaceBasePrivilege(privilegeName);
                acc[name] = {
                    application,
                    name,
                    actions: privilegeActions,
                    metadata: {},
                };
                return acc;
            }, {}),
            ...Object.entries(privilegeMap.features).reduce((acc, [featureName, featurePrivileges]) => {
                Object.entries(featurePrivileges).forEach(([privilegeName, privilegeActions]) => {
                    const name = privilege_serializer_1.PrivilegeSerializer.serializeFeaturePrivilege(featureName, privilegeName);
                    if (Object.keys(acc).includes(name)) {
                        throw new Error(`Detected duplicate feature privilege name: ${name}`);
                    }
                    acc[name] = {
                        application,
                        name,
                        actions: privilegeActions,
                        metadata: {},
                    };
                });
                return acc;
            }, {}),
            ...Object.entries(privilegeMap.reserved).reduce((acc, [privilegeName, privilegeActions]) => {
                const name = privilege_serializer_1.PrivilegeSerializer.serializeReservedPrivilege(privilegeName);
                acc[name] = {
                    application,
                    name,
                    actions: privilegeActions,
                    metadata: {},
                };
                return acc;
            }, {}),
        },
    };
};
