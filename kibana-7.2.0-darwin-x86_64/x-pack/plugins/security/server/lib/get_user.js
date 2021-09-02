"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const get_client_shield_1 = require("../../../../server/lib/get_client_shield");
function getUserProvider(server) {
    const callWithRequest = get_client_shield_1.getClient(server).callWithRequest;
    server.expose('getUser', async (request) => {
        const xpackInfo = server.plugins.xpack_main.info;
        if (xpackInfo && xpackInfo.isAvailable() && !xpackInfo.feature('security').isEnabled()) {
            return Promise.resolve(null);
        }
        return await callWithRequest(request, 'shield.authenticate');
    });
}
exports.getUserProvider = getUserProvider;
