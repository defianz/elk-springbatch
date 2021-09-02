"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const feature_privilege_builder_1 = require("./feature_privilege_builder");
class FeaturePrivilegeUIBuilder extends feature_privilege_builder_1.BaseFeaturePrivilegeBuilder {
    getActions(privilegeDefinition, feature) {
        return privilegeDefinition.ui.map(ui => this.actions.ui.get(feature.id, ui));
    }
}
exports.FeaturePrivilegeUIBuilder = FeaturePrivilegeUIBuilder;
