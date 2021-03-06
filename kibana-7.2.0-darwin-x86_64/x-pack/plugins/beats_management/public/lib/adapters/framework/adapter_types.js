"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-empty-interface */
const t = tslib_1.__importStar(require("io-ts"));
const security_1 = require("./../../../../common/constants/security");
exports.RuntimeFrameworkInfo = t.type({
    basePath: t.string,
    license: t.type({
        type: t.union(security_1.LICENSES.map(s => t.literal(s))),
        expired: t.boolean,
        expiry_date_in_millis: t.number,
    }),
    security: t.type({
        enabled: t.boolean,
        available: t.boolean,
    }),
    settings: t.type({
        encryptionKey: t.string,
        enrollmentTokensTtlInSeconds: t.number,
        defaultUserRoles: t.array(t.string),
    }),
});
exports.RuntimeFrameworkUser = t.interface({
    username: t.string,
    roles: t.array(t.string),
    full_name: t.union([t.null, t.string]),
    email: t.union([t.null, t.string]),
    enabled: t.boolean,
}, 'FrameworkUser');
