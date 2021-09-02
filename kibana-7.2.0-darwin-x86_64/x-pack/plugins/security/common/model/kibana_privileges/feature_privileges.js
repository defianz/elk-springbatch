"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class KibanaFeaturePrivileges {
    constructor(featurePrivilegesMap) {
        this.featurePrivilegesMap = featurePrivilegesMap;
    }
    getAllPrivileges() {
        return Object.entries(this.featurePrivilegesMap).reduce((acc, [featureId, privileges]) => {
            return {
                ...acc,
                [featureId]: Object.keys(privileges),
            };
        }, {});
    }
    getPrivileges(featureId) {
        const featurePrivileges = this.featurePrivilegesMap[featureId];
        if (featurePrivileges == null) {
            return [];
        }
        return Object.keys(featurePrivileges);
    }
    getActions(featureId, privilege) {
        if (!this.featurePrivilegesMap[featureId]) {
            return [];
        }
        return this.featurePrivilegesMap[featureId][privilege] || [];
    }
}
exports.KibanaFeaturePrivileges = KibanaFeaturePrivileges;
