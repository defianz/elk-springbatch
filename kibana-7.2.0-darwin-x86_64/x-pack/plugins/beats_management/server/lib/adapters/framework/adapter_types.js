"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const t = tslib_1.__importStar(require("io-ts"));
exports.internalAuthData = Symbol('internalAuthData');
exports.internalUser = {
    kind: 'internal',
};
exports.RuntimeFrameworkInfo = t.interface({
    kibana: t.type({
        version: t.string,
    }),
    license: t.type({
        type: t.union(['oss', 'trial', 'standard', 'basic', 'gold', 'platinum'].map(s => t.literal(s))),
        expired: t.boolean,
        expiry_date_in_millis: t.number,
    }),
    security: t.type({
        enabled: t.boolean,
        available: t.boolean,
    }),
    watcher: t.type({
        enabled: t.boolean,
        available: t.boolean,
    }),
}, 'FrameworkInfo');
exports.RuntimeKibanaServerRequest = t.interface({
    params: t.object,
    payload: t.object,
    query: t.object,
    headers: t.type({
        authorization: t.union([t.string, t.null]),
    }),
    info: t.type({
        remoteAddress: t.string,
    }),
}, 'KibanaServerRequest');
exports.RuntimeKibanaUser = t.interface({
    username: t.string,
    roles: t.array(t.string),
    full_name: t.union([t.null, t.string]),
    email: t.union([t.null, t.string]),
    enabled: t.boolean,
}, 'KibanaUser');
