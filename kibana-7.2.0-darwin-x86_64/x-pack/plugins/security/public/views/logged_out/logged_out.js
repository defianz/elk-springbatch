"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = require("@kbn/i18n/react");
const eui_1 = require("@elastic/eui");
const authentication_state_page_1 = require("plugins/security/components/authentication_state_page");
// @ts-ignore
const logged_out_html_1 = tslib_1.__importDefault(require("plugins/security/views/logged_out/logged_out.html"));
const react_2 = tslib_1.__importDefault(require("react"));
const react_dom_1 = require("react-dom");
require("ui/autoload/styles");
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const i18n_1 = require("ui/i18n");
chrome_1.default
    .setVisible(false)
    .setRootTemplate(logged_out_html_1.default)
    .setRootController('logout', ($scope) => {
    $scope.$$postDigest(() => {
        const domNode = document.getElementById('reactLoggedOutRoot');
        react_dom_1.render(react_2.default.createElement(i18n_1.I18nContext, null,
            react_2.default.createElement(authentication_state_page_1.AuthenticationStatePage, { title: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.loggedOut.title", defaultMessage: "Successfully logged out" }) },
                react_2.default.createElement(eui_1.EuiButton, { href: chrome_1.default.addBasePath('/') },
                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.loggedOut.login", defaultMessage: "Login" })))), domNode);
    });
});
