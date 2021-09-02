"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const feature_privilege_builder_1 = require("./feature_privilege_builder");
class FeaturePrivilegeManagementBuilder extends feature_privilege_builder_1.BaseFeaturePrivilegeBuilder {
    getActions(privilegeDefinition, feature) {
        const managementSections = privilegeDefinition.management || feature.management;
        if (!managementSections) {
            return [];
        }
        return Object.entries(managementSections).reduce((acc, [sectionId, items]) => {
            return [...acc, ...items.map(item => this.actions.ui.get('management', sectionId, item))];
        }, []);
    }
}
exports.FeaturePrivilegeManagementBuilder = FeaturePrivilegeManagementBuilder;
