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
class KibanaBasePrivilegeCalculator {
    constructor(kibanaPrivileges, globalPrivilege, assignedGlobalBaseActions) {
        this.kibanaPrivileges = kibanaPrivileges;
        this.globalPrivilege = globalPrivilege;
        this.assignedGlobalBaseActions = assignedGlobalBaseActions;
    }
    getMostPermissiveBasePrivilege(privilegeSpec, ignoreAssigned) {
        const assignedPrivilege = privilegeSpec.base[0] || constants_1.NO_PRIVILEGE_VALUE;
        // If this is the global privilege definition, then there is nothing to supercede it.
        if (privilege_utils_1.isGlobalPrivilegeDefinition(privilegeSpec)) {
            if (assignedPrivilege === constants_1.NO_PRIVILEGE_VALUE || ignoreAssigned) {
                return {
                    actualPrivilege: constants_1.NO_PRIVILEGE_VALUE,
                    actualPrivilegeSource: kibana_privilege_calculator_types_1.PRIVILEGE_SOURCE.GLOBAL_BASE,
                    isDirectlyAssigned: true,
                };
            }
            return {
                actualPrivilege: assignedPrivilege,
                actualPrivilegeSource: kibana_privilege_calculator_types_1.PRIVILEGE_SOURCE.GLOBAL_BASE,
                isDirectlyAssigned: true,
            };
        }
        // Otherwise, check to see if the global privilege supercedes this one.
        const baseActions = [
            ...this.kibanaPrivileges.getSpacesPrivileges().getActions(assignedPrivilege),
        ];
        const globalSupercedes = this.hasAssignedGlobalBasePrivilege() &&
            (privilege_calculator_utils_1.compareActions(this.assignedGlobalBaseActions, baseActions) < 0 || ignoreAssigned);
        if (globalSupercedes) {
            const wasDirectlyAssigned = !ignoreAssigned && baseActions.length > 0;
            return {
                actualPrivilege: this.globalPrivilege.base[0],
                actualPrivilegeSource: kibana_privilege_calculator_types_1.PRIVILEGE_SOURCE.GLOBAL_BASE,
                isDirectlyAssigned: false,
                ...this.buildSupercededFields(wasDirectlyAssigned, assignedPrivilege, kibana_privilege_calculator_types_1.PRIVILEGE_SOURCE.SPACE_BASE),
            };
        }
        if (!ignoreAssigned) {
            return {
                actualPrivilege: assignedPrivilege,
                actualPrivilegeSource: kibana_privilege_calculator_types_1.PRIVILEGE_SOURCE.SPACE_BASE,
                isDirectlyAssigned: true,
            };
        }
        return {
            actualPrivilege: constants_1.NO_PRIVILEGE_VALUE,
            actualPrivilegeSource: kibana_privilege_calculator_types_1.PRIVILEGE_SOURCE.SPACE_BASE,
            isDirectlyAssigned: true,
        };
    }
    hasAssignedGlobalBasePrivilege() {
        return this.assignedGlobalBaseActions.length > 0;
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
exports.KibanaBasePrivilegeCalculator = KibanaBasePrivilegeCalculator;
