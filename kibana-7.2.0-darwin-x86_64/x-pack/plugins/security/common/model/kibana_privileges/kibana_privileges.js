"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const feature_privileges_1 = require("./feature_privileges");
const global_privileges_1 = require("./global_privileges");
const spaces_privileges_1 = require("./spaces_privileges");
class KibanaPrivileges {
    constructor(rawKibanaPrivileges) {
        this.rawKibanaPrivileges = rawKibanaPrivileges;
    }
    getGlobalPrivileges() {
        return new global_privileges_1.KibanaGlobalPrivileges(this.rawKibanaPrivileges.global);
    }
    getSpacesPrivileges() {
        return new spaces_privileges_1.KibanaSpacesPrivileges(this.rawKibanaPrivileges.space);
    }
    getFeaturePrivileges() {
        return new feature_privileges_1.KibanaFeaturePrivileges(this.rawKibanaPrivileges.features);
    }
}
exports.KibanaPrivileges = KibanaPrivileges;
