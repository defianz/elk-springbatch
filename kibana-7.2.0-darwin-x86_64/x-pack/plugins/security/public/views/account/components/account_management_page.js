"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const eui_1 = require("@elastic/eui");
const react_1 = tslib_1.__importStar(require("react"));
const model_1 = require("../../../../common/model");
const change_password_1 = require("./change_password");
const personal_info_1 = require("./personal_info");
class AccountManagementPage extends react_1.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (react_1.default.createElement(eui_1.EuiPage, null,
            react_1.default.createElement(eui_1.EuiPageBody, { restrictWidth: true },
                react_1.default.createElement(eui_1.EuiPanel, null,
                    react_1.default.createElement(eui_1.EuiText, { "data-test-subj": 'userDisplayName' },
                        react_1.default.createElement("h1", null, model_1.getUserDisplayName(this.props.user))),
                    react_1.default.createElement(eui_1.EuiSpacer, { size: "xl" }),
                    react_1.default.createElement(personal_info_1.PersonalInfo, { user: this.props.user }),
                    react_1.default.createElement(change_password_1.ChangePassword, { user: this.props.user })))));
    }
}
exports.AccountManagementPage = AccountManagementPage;
