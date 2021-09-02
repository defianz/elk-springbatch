"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const boom_1 = tslib_1.__importDefault(require("boom"));
function initAPIAuthorization(server, authorization) {
    const { actions, checkPrivilegesDynamicallyWithRequest, mode } = authorization;
    server.ext('onPostAuth', async (request, h) => {
        // if the api doesn't start with "/api/" or we aren't using RBAC for this request, just continue
        if (!request.path.startsWith('/api/') || !mode.useRbacForRequest(request)) {
            return h.continue;
        }
        const { tags = [] } = request.route.settings;
        const tagPrefix = 'access:';
        const actionTags = tags.filter(tag => tag.startsWith(tagPrefix));
        // if there are no tags starting with "access:", just continue
        if (actionTags.length === 0) {
            return h.continue;
        }
        const apiActions = actionTags.map(tag => actions.api.get(tag.substring(tagPrefix.length)));
        const checkPrivileges = checkPrivilegesDynamicallyWithRequest(request);
        const checkPrivilegesResponse = await checkPrivileges(apiActions);
        // we've actually authorized the request
        if (checkPrivilegesResponse.hasAllRequested) {
            return h.continue;
        }
        return boom_1.default.notFound();
    });
}
exports.initAPIAuthorization = initAPIAuthorization;
