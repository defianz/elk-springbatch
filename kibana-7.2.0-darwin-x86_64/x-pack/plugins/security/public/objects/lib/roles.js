"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const role_utils_1 = require("../../lib/role_utils");
const transform_role_for_save_1 = require("../../lib/transform_role_for_save");
const apiBase = chrome_1.default.addBasePath(`/api/security/role`);
async function saveRole($http, role, spacesEnabled) {
    const data = transform_role_for_save_1.transformRoleForSave(role_utils_1.copyRole(role), spacesEnabled);
    return await $http.put(`${apiBase}/${role.name}`, data);
}
exports.saveRole = saveRole;
async function deleteRole($http, name) {
    return await $http.delete(`${apiBase}/${name}`);
}
exports.deleteRole = deleteRole;
