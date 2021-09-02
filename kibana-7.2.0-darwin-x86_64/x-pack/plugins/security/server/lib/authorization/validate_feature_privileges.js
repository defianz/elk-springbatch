"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const privilege_calculator_utils_1 = require("../../../common/privilege_calculator_utils");
const feature_privilege_builder_1 = require("./privileges/feature_privilege_builder");
function validateFeaturePrivileges(actions, features) {
    const featurePrivilegeBuilder = feature_privilege_builder_1.featurePrivilegeBuilderFactory(actions);
    for (const feature of features) {
        if (feature.privileges.all != null && feature.privileges.read != null) {
            const allActions = featurePrivilegeBuilder.getActions(feature.privileges.all, feature);
            const readActions = featurePrivilegeBuilder.getActions(feature.privileges.read, feature);
            if (!privilege_calculator_utils_1.areActionsFullyCovered(allActions, readActions)) {
                throw new Error(`${feature.id}'s "all" privilege should be a superset of the "read" privilege.`);
            }
        }
    }
}
exports.validateFeaturePrivileges = validateFeaturePrivileges;
