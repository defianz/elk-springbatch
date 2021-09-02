"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const kfetch_1 = require("ui/kfetch");
const usersUrl = '/api/security/v1/users';
const rolesUrl = '/api/security/role';
class UserAPIClient {
    async getCurrentUser() {
        return await kfetch_1.kfetch({ pathname: `/api/security/v1/me` });
    }
    async getUsers() {
        return await kfetch_1.kfetch({ pathname: usersUrl });
    }
    async getUser(username) {
        const url = `${usersUrl}/${encodeURIComponent(username)}`;
        return await kfetch_1.kfetch({ pathname: url });
    }
    async deleteUser(username) {
        const url = `${usersUrl}/${encodeURIComponent(username)}`;
        await kfetch_1.kfetch({ pathname: url, method: 'DELETE' }, {});
    }
    async saveUser(user) {
        const url = `${usersUrl}/${encodeURIComponent(user.username)}`;
        await kfetch_1.kfetch({ pathname: url, body: JSON.stringify(user), method: 'POST' });
    }
    async getRoles() {
        return await kfetch_1.kfetch({ pathname: rolesUrl });
    }
    async getRole(name) {
        const url = `${rolesUrl}/${encodeURIComponent(name)}`;
        return await kfetch_1.kfetch({ pathname: url });
    }
    async changePassword(username, password, currentPassword) {
        const data = {
            newPassword: password,
        };
        if (currentPassword) {
            data.password = currentPassword;
        }
        await kfetch_1.kfetch({
            pathname: `${usersUrl}/${encodeURIComponent(username)}/password`,
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
}
exports.UserAPIClient = UserAPIClient;
