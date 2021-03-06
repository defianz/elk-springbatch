"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
/**
 * Returns whether given role is enabled or not
 *
 * @param role Object Role JSON, as returned by roles API
 * @return Boolean true if role is enabled; false otherwise
 */
function isRoleEnabled(role) {
    return lodash_1.get(role, 'transient_metadata.enabled', true);
}
exports.isRoleEnabled = isRoleEnabled;
/**
 * Returns whether given role is reserved or not.
 *
 * @param {role} the Role as returned by roles API
 */
function isReservedRole(role) {
    return lodash_1.get(role, 'metadata._reserved', false);
}
exports.isReservedRole = isReservedRole;
/**
 * Returns whether given role is editable through the UI or not.
 *
 * @param role the Role as returned by roles API
 */
function isReadOnlyRole(role) {
    return isReservedRole(role) || !!(role._transform_error && role._transform_error.length > 0);
}
exports.isReadOnlyRole = isReadOnlyRole;
/**
 * Returns a deep copy of the role.
 *
 * @param role the Role to copy.
 */
function copyRole(role) {
    return lodash_1.cloneDeep(role);
}
exports.copyRole = copyRole;
