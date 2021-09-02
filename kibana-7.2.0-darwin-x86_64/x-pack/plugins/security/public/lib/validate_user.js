"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
const validEmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line max-len
const validUsernameRegex = /[a-zA-Z_][a-zA-Z0-9_@\-\$\.]*/;
class UserValidator {
    constructor(options = {}) {
        this.shouldValidate = options.shouldValidate;
    }
    enableValidation() {
        this.shouldValidate = true;
    }
    disableValidation() {
        this.shouldValidate = false;
    }
    validateUsername(user) {
        if (!this.shouldValidate) {
            return valid();
        }
        const { username } = user;
        if (!username) {
            return invalid(i18n_1.i18n.translate('xpack.security.management.users.editUser.requiredUsernameErrorMessage', {
                defaultMessage: 'Username is required',
            }));
        }
        else if (username && !username.match(validUsernameRegex)) {
            return invalid(i18n_1.i18n.translate('xpack.security.management.users.editUser.usernameAllowedCharactersErrorMessage', {
                defaultMessage: 'Username must begin with a letter or underscore and contain only letters, underscores, and numbers',
            }));
        }
        return valid();
    }
    validateEmail(user) {
        if (!this.shouldValidate) {
            return valid();
        }
        const { email } = user;
        if (email && !email.match(validEmailRegex)) {
            return invalid(i18n_1.i18n.translate('xpack.security.management.users.editUser.validEmailRequiredErrorMessage', {
                defaultMessage: 'Email address is invalid',
            }));
        }
        return valid();
    }
    validatePassword(user) {
        if (!this.shouldValidate) {
            return valid();
        }
        const { password } = user;
        if (!password || password.length < 6) {
            return invalid(i18n_1.i18n.translate('xpack.security.management.users.editUser.passwordLengthErrorMessage', {
                defaultMessage: 'Password must be at least 6 characters',
            }));
        }
        return valid();
    }
    validateConfirmPassword(user) {
        if (!this.shouldValidate) {
            return valid();
        }
        const { password, confirmPassword } = user;
        if (password && confirmPassword !== null && password !== confirmPassword) {
            return invalid(i18n_1.i18n.translate('xpack.security.management.users.editUser.passwordDoNotMatchErrorMessage', {
                defaultMessage: 'Passwords do not match',
            }));
        }
        return valid();
    }
    validateForSave(user, isNewUser) {
        const { isInvalid: isUsernameInvalid } = this.validateUsername(user);
        const { isInvalid: isEmailInvalid } = this.validateEmail(user);
        let isPasswordInvalid = false;
        let isConfirmPasswordInvalid = false;
        if (isNewUser) {
            isPasswordInvalid = this.validatePassword(user).isInvalid;
            isConfirmPasswordInvalid = this.validateConfirmPassword(user).isInvalid;
        }
        if (isUsernameInvalid || isEmailInvalid || isPasswordInvalid || isConfirmPasswordInvalid) {
            return invalid();
        }
        return valid();
    }
}
exports.UserValidator = UserValidator;
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
