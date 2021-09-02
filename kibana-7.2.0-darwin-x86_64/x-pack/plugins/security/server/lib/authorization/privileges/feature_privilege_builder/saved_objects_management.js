"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const feature_privilege_builder_1 = require("./feature_privilege_builder");
class FeaturePrivilegeSavedObjectsManagementBuilder extends feature_privilege_builder_1.BaseFeaturePrivilegeBuilder {
    getActions(privilegeDefinition, feature) {
        // TODO: Revisit if/when savedObjectsManagement UI Capabilities are refactored
        if (feature.id !== 'savedObjectsManagement') {
            return [];
        }
        return lodash_1.uniq([
            ...lodash_1.flatten(privilegeDefinition.savedObject.all.map(type => [
                this.actions.ui.get('savedObjectsManagement', type, 'delete'),
                this.actions.ui.get('savedObjectsManagement', type, 'edit'),
                this.actions.ui.get('savedObjectsManagement', type, 'read'),
            ])),
            ...privilegeDefinition.savedObject.read.map(type => this.actions.ui.get('savedObjectsManagement', type, 'read')),
        ]);
    }
}
exports.FeaturePrivilegeSavedObjectsManagementBuilder = FeaturePrivilegeSavedObjectsManagementBuilder;
