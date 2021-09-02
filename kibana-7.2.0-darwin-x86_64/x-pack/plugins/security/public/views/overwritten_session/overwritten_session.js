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
const react_2 = tslib_1.__importDefault(require("react"));
const react_dom_1 = require("react-dom");
require("ui/autoload/styles");
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const i18n_1 = require("ui/i18n");
const authentication_state_page_1 = require("../../components/authentication_state_page");
chrome_1.default
    .setVisible(false)
    .setRootTemplate('<div id="reactOverwrittenSessionRoot" />')
    .setRootController('overwritten_session', ($scope, ShieldUser) => {
    $scope.$$postDigest(() => {
        ShieldUser.getCurrent().$promise.then((user) => {
            const overwrittenSessionPage = (react_2.default.createElement(i18n_1.I18nContext, null,
                react_2.default.createElement(authentication_state_page_1.AuthenticationStatePage, { title: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.overwrittenSession.title", defaultMessage: "You previously logged in as a different user." }) },
                    react_2.default.createElement(eui_1.EuiButton, { href: chrome_1.default.addBasePath('/') },
                        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.overwrittenSession.continueAsUserText", defaultMessage: "Continue as {username}", values: { username: user.username } })))));
            react_dom_1.render(overwrittenSessionPage, document.getElementById('reactOverwrittenSessionRoot'));
        });
    });
});
