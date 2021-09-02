"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const feature_privilege_builder_1 = require("./feature_privilege_builder");
const readOperations = ['bulk_get', 'get', 'find'];
const writeOperations = ['create', 'bulk_create', 'update', 'delete'];
const allOperations = [...readOperations, ...writeOperations];
class FeaturePrivilegeSavedObjectBuilder extends feature_privilege_builder_1.BaseFeaturePrivilegeBuilder {
    getActions(privilegeDefinition, feature) {
        return lodash_1.uniq([
            ...lodash_1.flatten(privilegeDefinition.savedObject.all.map(type => [
                ...allOperations.map(operation => this.actions.savedObject.get(type, operation)),
            ])),
            ...lodash_1.flatten(privilegeDefinition.savedObject.read.map(type => [
                ...readOperations.map(operation => this.actions.savedObject.get(type, operation)),
            ])),
        ]);
    }
}
exports.FeaturePrivilegeSavedObjectBuilder = FeaturePrivilegeSavedObjectBuilder;
