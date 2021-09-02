"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
async function checkCodeNode(url, log, rndStr) {
    const res = await node_fetch_1.default(`${url}/api/code/codeNode?rndStr=${rndStr}`, {});
    if (res.ok) {
        return await res.json();
    }
    log.info(`Access code node ${url} failed, try again later.`);
    return null;
}
exports.checkCodeNode = checkCodeNode;
function checkRoute(server, rndStr) {
    server.route({
        method: 'GET',
        path: '/api/code/codeNode',
        options: { auth: false },
        handler(req) {
            return { me: req.query.rndStr === rndStr };
        },
    });
}
exports.checkRoute = checkRoute;
