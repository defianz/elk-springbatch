"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const privilege_calculator_utils_1 = require("../../../common/privilege_calculator_utils");
const constants_1 = require("../../views/management/edit_role/lib/constants");
const privilege_utils_1 = require("../privilege_utils");
const kibana_privilege_calculator_types_1 = require("./kibana_privilege_calculator_types");
class KibanaAllowedPrivilegesCalculator {
    constructor(kibanaPrivileges, role) {
        this.kibanaPrivileges = kibanaPrivileges;
        this.role = role;
        this.globalPrivilege = this.locateGlobalPrivilege(role);
        this.assignedGlobalBaseActions = this.globalPrivilege.base[0]
            ? kibanaPrivileges.getGlobalPrivileges().getActions(this.globalPrivilege.base[0])
            : [];
    }
    calculateAllowedPrivileges(effectivePrivileges) {
        const { kibana = [] } = this.role;
        return kibana.map((privilegeSpec, index) => this.calculateAllowedPrivilege(privilegeSpec, effectivePrivileges[index]));
    }
    calculateAllowedPrivilege(privilegeSpec, effectivePrivileges) {
        const result = {
            base: {
                privileges: [],
                canUnassign: true,
            },
            feature: {},
        };
        if (privilege_utils_1.isGlobalPrivilegeDefinition(privilegeSpec)) {
            // nothing can impede global privileges
            result.base.canUnassign = true;
            result.base.privileges = this.kibanaPrivileges.getGlobalPrivileges().getAllPrivileges();
        }
        else {
            // space base privileges are restricted based on the assigned global privileges
            const spacePrivileges = this.kibanaPrivileges.getSpacesPrivileges().getAllPrivileges();
            result.base.canUnassign = this.assignedGlobalBaseActions.length === 0;
            result.base.privileges = spacePrivileges.filter(privilege => {
                // always allowed to assign the calculated effective privilege
                if (privilege === effectivePrivileges.base.actualPrivilege) {
                    return true;
                }
                const privilegeActions = this.getBaseActions(kibana_privilege_calculator_types_1.PRIVILEGE_SOURCE.SPACE_BASE, privilege);
                return !privilege_calculator_utils_1.areActionsFullyCovered(this.assignedGlobalBaseActions, privilegeActions);
            });
        }
        const allFeaturePrivileges = this.kibanaPrivileges.getFeaturePrivileges().getAllPrivileges();
        result.feature = Object.entries(allFeaturePrivileges).reduce((acc, [featureId, featurePrivileges]) => {
            return {
                ...acc,
                [featureId]: this.getAllowedFeaturePrivileges(effectivePrivileges, featureId, featurePrivileges),
            };
        }, {});
        return result;
    }
    getAllowedFeaturePrivileges(effectivePrivileges, featureId, candidateFeaturePrivileges) {
        const effectiveFeaturePrivilegeExplanation = effectivePrivileges.feature[featureId];
        if (effectiveFeaturePrivilegeExplanation == null) {
            throw new Error('To calculate allowed feature privileges, we need the effective privileges');
        }
        const effectiveFeatureActions = this.getFeatureActions(featureId, effectiveFeaturePrivilegeExplanation.actualPrivilege);
        const privileges = [];
        if (effectiveFeaturePrivilegeExplanation.actualPrivilege !== constants_1.NO_PRIVILEGE_VALUE) {
            // Always allowed to assign the calculated effective privilege
            privileges.push(effectiveFeaturePrivilegeExplanation.actualPrivilege);
        }
        privileges.push(...candidateFeaturePrivileges.filter(privilegeId => {
            const candidateActions = this.getFeatureActions(featureId, privilegeId);
            return privilege_calculator_utils_1.compareActions(effectiveFeatureActions, candidateActions) > 0;
        }));
        const result = {
            privileges: privileges.sort(),
            canUnassign: effectiveFeaturePrivilegeExplanation.actualPrivilege === constants_1.NO_PRIVILEGE_VALUE,
        };
        return result;
    }
    getBaseActions(source, privilegeId) {
        switch (source) {
            case kibana_privilege_calculator_types_1.PRIVILEGE_SOURCE.GLOBAL_BASE:
                return this.assignedGlobalBaseActions;
            case kibana_privilege_calculator_types_1.PRIVILEGE_SOURCE.SPACE_BASE:
                return this.kibanaPrivileges.getSpacesPrivileges().getActions(privilegeId);
            default:
                throw new Error(`Cannot get base actions for unsupported privilege source ${kibana_privilege_calculator_types_1.PRIVILEGE_SOURCE[source]}`);
        }
    }
    getFeatureActions(featureId, privilegeId) {
        return this.kibanaPrivileges.getFeaturePrivileges().getActions(featureId, privilegeId);
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
exports.KibanaAllowedPrivilegesCalculator = KibanaAllowedPrivilegesCalculator;
