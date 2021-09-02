"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const feature_privilege_builder_1 = require("./feature_privilege_builder");
class FeaturePrivilegeCatalogueBuilder extends feature_privilege_builder_1.BaseFeaturePrivilegeBuilder {
    getActions(privilegeDefinition, feature) {
        const catalogueEntries = privilegeDefinition.catalogue || feature.catalogue;
        if (!catalogueEntries) {
            return [];
        }
        return catalogueEntries.map(catalogueEntryId => this.actions.ui.get('catalogue', catalogueEntryId));
    }
}
exports.FeaturePrivilegeCatalogueBuilder = FeaturePrivilegeCatalogueBuilder;
