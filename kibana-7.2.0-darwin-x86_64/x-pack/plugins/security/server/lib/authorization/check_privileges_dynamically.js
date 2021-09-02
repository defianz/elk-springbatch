"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function checkPrivilegesDynamicallyWithRequestFactory(checkPrivilegesWithRequest, spaces) {
    return function checkPrivilegesDynamicallyWithRequest(request) {
        const checkPrivileges = checkPrivilegesWithRequest(request);
        return async function checkPrivilegesDynamically(privilegeOrPrivileges) {
            if (spaces.isEnabled) {
                const spaceId = spaces.getSpaceId(request);
                return await checkPrivileges.atSpace(spaceId, privilegeOrPrivileges);
            }
            else {
                return await checkPrivileges.globally(privilegeOrPrivileges);
            }
        };
    };
}
exports.checkPrivilegesDynamicallyWithRequestFactory = checkPrivilegesDynamicallyWithRequestFactory;
