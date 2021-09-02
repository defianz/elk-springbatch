"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const kfetch_1 = require("ui/kfetch");
class RolesApi {
    static async getRoles() {
        return kfetch_1.kfetch({ pathname: '/api/security/role' });
    }
    static async getRole(roleName) {
        return kfetch_1.kfetch({ pathname: `/api/security/role/${encodeURIComponent(roleName)}` });
    }
    static async deleteRole(roleName) {
        return kfetch_1.kfetch({
            pathname: `/api/security/role/${encodeURIComponent(roleName)}`,
            method: 'DELETE',
        });
    }
}
exports.RolesApi = RolesApi;
