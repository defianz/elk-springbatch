"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const api_1 = require("./api");
const app_1 = require("./app");
const catalogue_1 = require("./catalogue");
const management_1 = require("./management");
const navlink_1 = require("./navlink");
const saved_object_1 = require("./saved_object");
const saved_objects_management_1 = require("./saved_objects_management");
const ui_1 = require("./ui");
exports.featurePrivilegeBuilderFactory = (actions) => {
    const builders = [
        new api_1.FeaturePrivilegeApiBuilder(actions),
        new app_1.FeaturePrivilegeAppBuilder(actions),
        new catalogue_1.FeaturePrivilegeCatalogueBuilder(actions),
        new management_1.FeaturePrivilegeManagementBuilder(actions),
        new navlink_1.FeaturePrivilegeNavlinkBuilder(actions),
        new saved_object_1.FeaturePrivilegeSavedObjectBuilder(actions),
        new saved_objects_management_1.FeaturePrivilegeSavedObjectsManagementBuilder(actions),
        new ui_1.FeaturePrivilegeUIBuilder(actions),
    ];
    return {
        getActions(privilege, feature) {
            return lodash_1.flatten(builders.map(builder => builder.getActions(privilege, feature)));
        },
    };
};
