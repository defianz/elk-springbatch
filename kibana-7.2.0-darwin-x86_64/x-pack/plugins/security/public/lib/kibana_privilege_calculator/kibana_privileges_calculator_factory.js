"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const privilege_calculator_utils_1 = require("../../../common/privilege_calculator_utils");
const role_utils_1 = require("../../lib/role_utils");
const kibana_privilege_calculator_1 = require("./kibana_privilege_calculator");
class KibanaPrivilegeCalculatorFactory {
    constructor(kibanaPrivileges) {
        this.kibanaPrivileges = kibanaPrivileges;
        this.rankedFeaturePrivileges = {};
        const featurePrivilegeSet = kibanaPrivileges.getFeaturePrivileges().getAllPrivileges();
        Object.entries(featurePrivilegeSet).forEach(([featureId, privileges]) => {
            this.rankedFeaturePrivileges[featureId] = privileges.sort((privilege1, privilege2) => {
                const privilege1Actions = kibanaPrivileges
                    .getFeaturePrivileges()
                    .getActions(featureId, privilege1);
                const privilege2Actions = kibanaPrivileges
                    .getFeaturePrivileges()
                    .getActions(featureId, privilege2);
                return privilege_calculator_utils_1.compareActions(privilege1Actions, privilege2Actions);
            });
        });
    }
    /**
     * Creates an KibanaPrivilegeCalculator instance for the specified role.
     * @param role
     */
    getInstance(role) {
        const roleCopy = role_utils_1.copyRole(role);
        this.sortPrivileges(roleCopy);
        return new kibana_privilege_calculator_1.KibanaPrivilegeCalculator(this.kibanaPrivileges, roleCopy, this.rankedFeaturePrivileges);
    }
    sortPrivileges(role) {
        role.kibana.forEach(privilege => {
            privilege.base.sort((privilege1, privilege2) => {
                const privilege1Actions = this.kibanaPrivileges
                    .getSpacesPrivileges()
                    .getActions(privilege1);
                const privilege2Actions = this.kibanaPrivileges
                    .getSpacesPrivileges()
                    .getActions(privilege2);
                return privilege_calculator_utils_1.compareActions(privilege1Actions, privilege2Actions);
            });
            Object.entries(privilege.feature).forEach(([featureId, featurePrivs]) => {
                featurePrivs.sort((privilege1, privilege2) => {
                    const privilege1Actions = this.kibanaPrivileges
                        .getFeaturePrivileges()
                        .getActions(featureId, privilege1);
                    const privilege2Actions = this.kibanaPrivileges
                        .getFeaturePrivileges()
                        .getActions(featureId, privilege2);
                    return privilege_calculator_utils_1.compareActions(privilege1Actions, privilege2Actions);
                });
            });
        });
    }
}
exports.KibanaPrivilegeCalculatorFactory = KibanaPrivilegeCalculatorFactory;
