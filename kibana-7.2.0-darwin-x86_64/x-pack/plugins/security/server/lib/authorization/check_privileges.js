"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const constants_1 = require("../../../common/constants");
const resource_serializer_1 = require("./resource_serializer");
const validate_es_response_1 = require("./validate_es_response");
function checkPrivilegesWithRequestFactory(actions, application, shieldClient) {
    const { callWithRequest } = shieldClient;
    const hasIncompatibileVersion = (applicationPrivilegesResponse) => {
        return Object.values(applicationPrivilegesResponse).some(resource => !resource[actions.version] && resource[actions.login]);
    };
    return function checkPrivilegesWithRequest(request) {
        const checkPrivilegesAtResources = async (resources, privilegeOrPrivileges) => {
            const privileges = Array.isArray(privilegeOrPrivileges)
                ? privilegeOrPrivileges
                : [privilegeOrPrivileges];
            const allApplicationPrivileges = lodash_1.uniq([actions.version, actions.login, ...privileges]);
            const hasPrivilegesResponse = await callWithRequest(request, 'shield.hasPrivileges', {
                body: {
                    applications: [
                        {
                            application,
                            resources,
                            privileges: allApplicationPrivileges,
                        },
                    ],
                },
            });
            validate_es_response_1.validateEsPrivilegeResponse(hasPrivilegesResponse, application, allApplicationPrivileges, resources);
            const applicationPrivilegesResponse = hasPrivilegesResponse.application[application];
            if (hasIncompatibileVersion(applicationPrivilegesResponse)) {
                throw new Error('Multiple versions of Kibana are running against the same Elasticsearch cluster, unable to authorize user.');
            }
            return {
                hasAllRequested: hasPrivilegesResponse.has_all_requested,
                username: hasPrivilegesResponse.username,
                // we need to filter out the non requested privileges from the response
                resourcePrivileges: lodash_1.transform(applicationPrivilegesResponse, (result, value, key) => {
                    result[key] = lodash_1.pick(value, privileges);
                }),
            };
        };
        const checkPrivilegesAtResource = async (resource, privilegeOrPrivileges) => {
            const { hasAllRequested, username, resourcePrivileges } = await checkPrivilegesAtResources([resource], privilegeOrPrivileges);
            return {
                hasAllRequested,
                username,
                privileges: resourcePrivileges[resource],
            };
        };
        return {
            async atSpace(spaceId, privilegeOrPrivileges) {
                const spaceResource = resource_serializer_1.ResourceSerializer.serializeSpaceResource(spaceId);
                return await checkPrivilegesAtResource(spaceResource, privilegeOrPrivileges);
            },
            async atSpaces(spaceIds, privilegeOrPrivileges) {
                const spaceResources = spaceIds.map(spaceId => resource_serializer_1.ResourceSerializer.serializeSpaceResource(spaceId));
                const { hasAllRequested, username, resourcePrivileges } = await checkPrivilegesAtResources(spaceResources, privilegeOrPrivileges);
                return {
                    hasAllRequested,
                    username,
                    // we need to turn the resource responses back into the space ids
                    spacePrivileges: lodash_1.transform(resourcePrivileges, (result, value, key) => {
                        result[resource_serializer_1.ResourceSerializer.deserializeSpaceResource(key)] = value;
                    }),
                };
            },
            async globally(privilegeOrPrivileges) {
                return await checkPrivilegesAtResource(constants_1.GLOBAL_RESOURCE, privilegeOrPrivileges);
            },
        };
    };
}
exports.checkPrivilegesWithRequestFactory = checkPrivilegesWithRequestFactory;
