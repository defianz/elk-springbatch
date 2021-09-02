"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
class RoleValidator {
    constructor(options = {}) {
        this.shouldValidate = options.shouldValidate;
    }
    enableValidation() {
        this.shouldValidate = true;
    }
    disableValidation() {
        this.shouldValidate = false;
    }
    validateRoleName(role) {
        if (!this.shouldValidate) {
            return valid();
        }
        if (!role.name) {
            return invalid(i18n_1.i18n.translate('xpack.security.management.editRole.validateRole.provideRoleNameWarningMessage', {
                defaultMessage: 'Please provide a role name',
            }));
        }
        if (role.name.length > 1024) {
            return invalid(i18n_1.i18n.translate('xpack.security.management.editRole.validateRole.nameLengthWarningMessage', {
                defaultMessage: 'Name must not exceed 1024 characters',
            }));
        }
        if (!role.name.match(/^[a-zA-Z_][a-zA-Z0-9_@\-\$\.]*$/)) {
            return invalid(i18n_1.i18n.translate('xpack.security.management.editRole.validateRole.nameAllowedCharactersWarningMessage', {
                defaultMessage: 'Name must begin with a letter or underscore and contain only letters, underscores, and numbers.',
            }));
        }
        return valid();
    }
    validateIndexPrivileges(role) {
        if (!this.shouldValidate) {
            return valid();
        }
        if (!Array.isArray(role.elasticsearch.indices)) {
            throw new TypeError(i18n_1.i18n.translate('xpack.security.management.editRole.validateRole.indicesTypeErrorMessage', {
                defaultMessage: 'Expected {elasticIndices} to be an array',
                values: {
                    elasticIndices: '"role.elasticsearch.indices"',
                },
            }));
        }
        const areIndicesValid = role.elasticsearch.indices
            .map(indexPriv => this.validateIndexPrivilege(indexPriv))
            .find((result) => result.isInvalid) == null;
        if (areIndicesValid) {
            return valid();
        }
        return invalid();
    }
    validateIndexPrivilege(indexPrivilege) {
        if (!this.shouldValidate) {
            return valid();
        }
        if (indexPrivilege.names.length && !indexPrivilege.privileges.length) {
            return invalid(i18n_1.i18n.translate('xpack.security.management.editRole.validateRole.onePrivilegeRequiredWarningMessage', {
                defaultMessage: 'At least one privilege is required',
            }));
        }
        return valid();
    }
    validateSelectedSpaces(spaceIds, privilege) {
        if (!this.shouldValidate) {
            return valid();
        }
        // If no assigned privilege, then no spaces are OK
        if (!privilege) {
            return valid();
        }
        if (Array.isArray(spaceIds) && spaceIds.length > 0) {
            return valid();
        }
        return invalid(i18n_1.i18n.translate('xpack.security.management.editRole.validateRole.oneSpaceRequiredWarningMessage', {
            defaultMessage: 'At least one space is required',
        }));
    }
    validateSelectedPrivilege(spaceIds, privilege) {
        if (!this.shouldValidate) {
            return valid();
        }
        // If no assigned spaces, then a missing privilege is OK
        if (!spaceIds || spaceIds.length === 0) {
            return valid();
        }
        if (privilege) {
            return valid();
        }
        return invalid(i18n_1.i18n.translate('xpack.security.management.editRole.validateRole.privilegeRequiredWarningMessage', {
            defaultMessage: 'Privilege is required',
        }));
    }
    validateSpacePrivileges(role) {
        if (!this.shouldValidate) {
            return valid();
        }
        const privileges = role.kibana || [];
        const arePrivilegesValid = privileges.every(assignedPrivilege => {
            return assignedPrivilege.base.length > 0 || Object.keys(assignedPrivilege.feature).length > 0;
        });
        if (arePrivilegesValid) {
            return valid();
        }
        return invalid();
    }
    validateForSave(role) {
        const { isInvalid: isNameInvalid } = this.validateRoleName(role);
        const { isInvalid: areIndicesInvalid } = this.validateIndexPrivileges(role);
        const { isInvalid: areSpacePrivilegesInvalid } = this.validateSpacePrivileges(role);
        if (isNameInvalid || areIndicesInvalid || areSpacePrivilegesInvalid) {
            return invalid();
        }
        return valid();
    }
}
exports.RoleValidator = RoleValidator;
function invalid(error) {
    return {
        isInvalid: true,
        error,
    };
}
function valid() {
    return {
        isInvalid: false,
    };
}
