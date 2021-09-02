"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const eui_1 = require("@elastic/eui");
const react_1 = require("@kbn/i18n/react");
const react_2 = tslib_1.__importStar(require("react"));
const api_1 = require("../../../../lib/api");
const model_1 = require("../../../../../common/model");
const change_password_form_1 = require("../../../../components/management/change_password_form");
class ChangePassword extends react_2.Component {
    constructor() {
        super(...arguments);
        this.getChangePasswordForm = (changePasswordTitle) => {
            return (react_2.default.createElement(eui_1.EuiDescribedFormGroup, { fullWidth: true, title: react_2.default.createElement("h3", null, changePasswordTitle), description: react_2.default.createElement("p", null,
                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.account.changePasswordDescription", defaultMessage: "Change the password for your account." })) },
                react_2.default.createElement(change_password_form_1.ChangePasswordForm, { user: this.props.user, isUserChangingOwnPassword: true, apiClient: new api_1.UserAPIClient() })));
        };
    }
    render() {
        const canChangePassword = model_1.canUserChangePassword(this.props.user);
        const changePasswordTitle = (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.account.changePasswordTitle", defaultMessage: "Password" }));
        if (canChangePassword) {
            return this.getChangePasswordForm(changePasswordTitle);
        }
        return this.getChangePasswordUnavailable(changePasswordTitle);
    }
    getChangePasswordUnavailable(changePasswordTitle) {
        return (react_2.default.createElement(eui_1.EuiDescribedFormGroup, { fullWidth: true, title: react_2.default.createElement("h3", null, changePasswordTitle), description: react_2.default.createElement("p", null,
                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.account.changePasswordNotSupportedText", defaultMessage: "You cannot change the password for this account." })) },
            react_2.default.createElement("div", null)));
    }
}
exports.ChangePassword = ChangePassword;
