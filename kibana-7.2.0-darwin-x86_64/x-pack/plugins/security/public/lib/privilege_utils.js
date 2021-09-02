"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Determines if the passed privilege spec defines global privileges.
 * @param privilegeSpec
 */
function isGlobalPrivilegeDefinition(privilegeSpec) {
    if (!privilegeSpec.spaces || privilegeSpec.spaces.length === 0) {
        return true;
    }
    return privilegeSpec.spaces.includes('*');
}
exports.isGlobalPrivilegeDefinition = isGlobalPrivilegeDefinition;
/**
 * Determines if the passed privilege spec defines feature privileges.
 * @param privilegeSpec
 */
function hasAssignedFeaturePrivileges(privilegeSpec) {
    const featureKeys = Object.keys(privilegeSpec.feature);
    return featureKeys.length > 0 && featureKeys.some(key => privilegeSpec.feature[key].length > 0);
}
exports.hasAssignedFeaturePrivileges = hasAssignedFeaturePrivileges;
