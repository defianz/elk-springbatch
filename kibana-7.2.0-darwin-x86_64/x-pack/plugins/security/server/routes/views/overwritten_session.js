"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function initOverwrittenSessionView(server) {
    server.route({
        method: 'GET',
        path: '/overwritten_session',
        handler(request, h) {
            return h.renderAppWithDefaultConfig(server.getHiddenUiAppById('overwritten_session'));
        },
    });
}
exports.initOverwrittenSessionView = initOverwrittenSessionView;
