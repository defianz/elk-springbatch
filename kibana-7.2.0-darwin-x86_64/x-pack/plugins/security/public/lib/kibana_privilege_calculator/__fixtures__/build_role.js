"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildRole = (options = {}) => {
    const role = {
        name: 'unit test role',
        elasticsearch: {
            indices: [],
            cluster: [],
            run_as: [],
        },
        kibana: [],
    };
    if (options.spacesPrivileges) {
        role.kibana.push(...options.spacesPrivileges);
    }
    else {
        role.kibana.push({
            spaces: [],
            base: [],
            feature: {},
        });
    }
    return role;
};
