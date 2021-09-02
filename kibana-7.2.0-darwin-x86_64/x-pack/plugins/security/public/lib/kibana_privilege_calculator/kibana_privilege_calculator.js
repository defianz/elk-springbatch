"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const privilege_utils_1 = require("../privilege_utils");
const kibana_allowed_privileges_calculator_1 = require("./kibana_allowed_privileges_calculator");
const kibana_base_privilege_calculator_1 = require("./kibana_base_privilege_calculator");
const kibana_feature_privilege_calculator_1 = require("./kibana_feature_privilege_calculator");
class KibanaPrivilegeCalculator {
    constructor(kibanaPrivileges, role, rankedFeaturePrivileges) {
        this.kibanaPrivileges = kibanaPrivileges;
        this.role = role;
        this.rankedFeaturePrivileges = rankedFeaturePrivileges;
        const globalPrivilege = this.locateGlobalPrivilege(role);
        const assignedGlobalBaseActions = globalPrivilege.base[0]
            ? kibanaPrivileges.getGlobalPrivileges().getActions(globalPrivilege.base[0])
            : [];
        this.allowedPrivilegesCalculator = new kibana_allowed_privileges_calculator_1.KibanaAllowedPrivilegesCalculator(kibanaPrivileges, role);
        this.effectiveBasePrivilegesCalculator = new kibana_base_privilege_calculator_1.KibanaBasePrivilegeCalculator(kibanaPrivileges, globalPrivilege, assignedGlobalBaseActions);
        this.effectiveFeaturePrivilegesCalculator = new kibana_feature_privilege_calculator_1.KibanaFeaturePrivilegeCalculator(kibanaPrivileges, globalPrivilege, assignedGlobalBaseActions, rankedFeaturePrivileges);
    }
    calculateEffectivePrivileges(ignoreAssigned = false) {
        const { kibana = [] } = this.role;
        return kibana.map(privilegeSpec => this.calculateEffectivePrivilege(privilegeSpec, ignoreAssigned));
    }
    calculateAllowedPrivileges() {
        const effectivePrivs = this.calculateEffectivePrivileges(true);
        return this.allowedPrivilegesCalculator.calculateAllowedPrivileges(effectivePrivs);
    }
    calculateEffectivePrivilege(privilegeSpec, ignoreAssigned) {
        const result = {
            base: this.effectiveBasePrivilegesCalculator.getMostPermissiveBasePrivilege(privilegeSpec, ignoreAssigned),
            feature: {},
            reserved: privilegeSpec._reserved,
        };
        // If calculations wish to ignoreAssigned, then we still need to know what the real effective base privilege is
        // without ignoring assigned, in order to calculate the correct feature privileges.
        const effectiveBase = ignoreAssigned
            ? this.effectiveBasePrivilegesCalculator.getMostPermissiveBasePrivilege(privilegeSpec, false)
            : result.base;
        const allFeaturePrivileges = this.kibanaPrivileges.getFeaturePrivileges().getAllPrivileges();
        result.feature = Object.keys(allFeaturePrivileges).reduce((acc, featureId) => {
            return {
                ...acc,
                [featureId]: this.effectiveFeaturePrivilegesCalculator.getMostPermissiveFeaturePrivilege(privilegeSpec, effectiveBase, featureId, ignoreAssigned),
            };
        }, {});
        return result;
    }
    locateGlobalPrivilege(role) {
        const spacePrivileges = role.kibana;
        return (spacePrivileges.find(privileges => privilege_utils_1.isGlobalPrivilegeDefinition(privileges)) || {
            spaces: [],
            base: [],
            feature: {},
        });
    }
}
exports.KibanaPrivilegeCalculator = KibanaPrivilegeCalculator;
