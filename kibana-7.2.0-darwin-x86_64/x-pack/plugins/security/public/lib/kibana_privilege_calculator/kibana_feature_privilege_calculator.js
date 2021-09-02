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
class KibanaFeaturePrivilegeCalculator {
    constructor(kibanaPrivileges, globalPrivilege, assignedGlobalBaseActions, rankedFeaturePrivileges) {
        this.kibanaPrivileges = kibanaPrivileges;
        this.globalPrivilege = globalPrivilege;
        this.assignedGlobalBaseActions = assignedGlobalBaseActions;
        this.rankedFeaturePrivileges = rankedFeaturePrivileges;
    }
    getMostPermissiveFeaturePrivilege(privilegeSpec, basePrivilegeExplanation, featureId, ignoreAssigned) {
        const scenarios = this.buildFeaturePrivilegeScenarios(privilegeSpec, basePrivilegeExplanation, featureId, ignoreAssigned);
        const featurePrivileges = this.rankedFeaturePrivileges[featureId] || [];
        // inspect feature privileges in ranked order (most permissive -> least permissive)
        for (const featurePrivilege of featurePrivileges) {
            const actions = this.kibanaPrivileges
                .getFeaturePrivileges()
                .getActions(featureId, featurePrivilege);
            // check if any of the scenarios satisfy the privilege - first one wins.
            for (const scenario of scenarios) {
                if (privilege_calculator_utils_1.areActionsFullyCovered(scenario.actions, actions)) {
                    return {
                        actualPrivilege: featurePrivilege,
                        actualPrivilegeSource: scenario.actualPrivilegeSource,
                        isDirectlyAssigned: scenario.isDirectlyAssigned,
                        ...this.buildSupercededFields(!scenario.isDirectlyAssigned, scenario.supersededPrivilege, scenario.supersededPrivilegeSource),
                    };
                }
            }
        }
        const isGlobal = privilege_utils_1.isGlobalPrivilegeDefinition(privilegeSpec);
        return {
            actualPrivilege: constants_1.NO_PRIVILEGE_VALUE,
            actualPrivilegeSource: isGlobal
                ? kibana_privilege_calculator_types_1.PRIVILEGE_SOURCE.GLOBAL_FEATURE
                : kibana_privilege_calculator_types_1.PRIVILEGE_SOURCE.SPACE_FEATURE,
            isDirectlyAssigned: true,
        };
    }
    buildFeaturePrivilegeScenarios(privilegeSpec, basePrivilegeExplanation, featureId, ignoreAssigned) {
        const scenarios = [];
        const isGlobalPrivilege = privilege_utils_1.isGlobalPrivilegeDefinition(privilegeSpec);
        const assignedGlobalFeaturePrivilege = this.getAssignedFeaturePrivilege(this.globalPrivilege, featureId);
        const assignedFeaturePrivilege = this.getAssignedFeaturePrivilege(privilegeSpec, featureId);
        const hasAssignedFeaturePrivilege = !ignoreAssigned && assignedFeaturePrivilege !== constants_1.NO_PRIVILEGE_VALUE;
        scenarios.push({
            actualPrivilegeSource: kibana_privilege_calculator_types_1.PRIVILEGE_SOURCE.GLOBAL_BASE,
            isDirectlyAssigned: false,
            actions: [...this.assignedGlobalBaseActions],
            ...this.buildSupercededFields(hasAssignedFeaturePrivilege, assignedFeaturePrivilege, isGlobalPrivilege ? kibana_privilege_calculator_types_1.PRIVILEGE_SOURCE.GLOBAL_FEATURE : kibana_privilege_calculator_types_1.PRIVILEGE_SOURCE.SPACE_FEATURE),
        });
        if (!isGlobalPrivilege || !ignoreAssigned) {
            scenarios.push({
                actualPrivilegeSource: kibana_privilege_calculator_types_1.PRIVILEGE_SOURCE.GLOBAL_FEATURE,
                actions: this.getFeatureActions(featureId, assignedGlobalFeaturePrivilege),
                isDirectlyAssigned: isGlobalPrivilege && hasAssignedFeaturePrivilege,
                ...this.buildSupercededFields(hasAssignedFeaturePrivilege && !isGlobalPrivilege, assignedFeaturePrivilege, kibana_privilege_calculator_types_1.PRIVILEGE_SOURCE.SPACE_FEATURE),
            });
        }
        if (isGlobalPrivilege) {
            return this.rankScenarios(scenarios);
        }
        // Otherwise, this is a space feature privilege
        const includeSpaceBaseScenario = basePrivilegeExplanation.actualPrivilegeSource === kibana_privilege_calculator_types_1.PRIVILEGE_SOURCE.SPACE_BASE ||
            basePrivilegeExplanation.supersededPrivilegeSource === kibana_privilege_calculator_types_1.PRIVILEGE_SOURCE.SPACE_BASE;
        const spaceBasePrivilege = basePrivilegeExplanation.supersededPrivilege || basePrivilegeExplanation.actualPrivilege;
        if (includeSpaceBaseScenario) {
            scenarios.push({
                actualPrivilegeSource: kibana_privilege_calculator_types_1.PRIVILEGE_SOURCE.SPACE_BASE,
                isDirectlyAssigned: false,
                actions: this.getBaseActions(kibana_privilege_calculator_types_1.PRIVILEGE_SOURCE.SPACE_BASE, spaceBasePrivilege),
                ...this.buildSupercededFields(hasAssignedFeaturePrivilege, assignedFeaturePrivilege, kibana_privilege_calculator_types_1.PRIVILEGE_SOURCE.SPACE_FEATURE),
            });
        }
        if (!ignoreAssigned) {
            scenarios.push({
                actualPrivilegeSource: kibana_privilege_calculator_types_1.PRIVILEGE_SOURCE.SPACE_FEATURE,
                isDirectlyAssigned: true,
                actions: this.getFeatureActions(featureId, this.getAssignedFeaturePrivilege(privilegeSpec, featureId)),
            });
        }
        return this.rankScenarios(scenarios);
    }
    rankScenarios(scenarios) {
        return scenarios.sort((scenario1, scenario2) => scenario1.actualPrivilegeSource - scenario2.actualPrivilegeSource);
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
    getAssignedFeaturePrivilege(privilegeSpec, featureId) {
        const featureEntry = privilegeSpec.feature[featureId] || [];
        return featureEntry[0] || constants_1.NO_PRIVILEGE_VALUE;
    }
    buildSupercededFields(isSuperceding, supersededPrivilege, supersededPrivilegeSource) {
        if (!isSuperceding) {
            return {};
        }
        return {
            supersededPrivilege,
            supersededPrivilegeSource,
        };
    }
}
exports.KibanaFeaturePrivilegeCalculator = KibanaFeaturePrivilegeCalculator;
