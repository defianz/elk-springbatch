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
const react_2 = tslib_1.__importDefault(require("react"));
exports.PersonalInfo = (props) => {
    return (react_2.default.createElement(eui_1.EuiDescribedFormGroup, { fullWidth: true, title: react_2.default.createElement("h3", null,
            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.account.usernameGroupTitle", defaultMessage: "Username and email" })), description: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.account.usernameGroupDescription", defaultMessage: "You can't change this information." }) },
        react_2.default.createElement(eui_1.EuiFormRow, { fullWidth: true },
            react_2.default.createElement(eui_1.EuiText, { size: "s" },
                react_2.default.createElement("dl", null,
                    react_2.default.createElement("dt", { title: "username", "data-test-subj": "username" }, props.user.username),
                    react_2.default.createElement("dd", { title: "email", "data-test-subj": "email" }, props.user.email || (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.account.noEmailMessage", defaultMessage: "no email address" }))))))));
};
