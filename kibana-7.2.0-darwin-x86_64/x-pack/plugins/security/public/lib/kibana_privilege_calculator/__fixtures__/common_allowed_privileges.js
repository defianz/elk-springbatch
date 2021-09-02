"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.unrestrictedBasePrivileges = {
    base: {
        privileges: ['all', 'read'],
        canUnassign: true,
    },
};
exports.unrestrictedFeaturePrivileges = {
    feature: {
        feature1: {
            privileges: ['all', 'read'],
            canUnassign: true,
        },
        feature2: {
            privileges: ['all', 'read'],
            canUnassign: true,
        },
        feature3: {
            privileges: ['all'],
            canUnassign: true,
        },
    },
};
exports.fullyRestrictedBasePrivileges = {
    base: {
        privileges: ['all'],
        canUnassign: false,
    },
};
exports.fullyRestrictedFeaturePrivileges = {
    feature: {
        feature1: {
            privileges: ['all'],
            canUnassign: false,
        },
        feature2: {
            privileges: ['all'],
            canUnassign: false,
        },
        feature3: {
            privileges: ['all'],
            canUnassign: false,
        },
    },
};
