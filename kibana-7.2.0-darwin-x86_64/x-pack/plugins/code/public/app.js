"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_dom_1 = require("react-dom");
const react_redux_1 = require("react-redux");
require("ui/autoload/all");
require("ui/autoload/styles");
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
// @ts-ignore
const modules_1 = require("ui/modules");
const constants_1 = require("../common/constants");
const app_1 = require("./components/app");
const help_menu_1 = require("./components/help_menu");
const stores_1 = require("./stores");
if (chrome_1.default.getInjected('codeUiEnabled')) {
    const app = modules_1.uiModules.get('apps/code');
    app.config(($locationProvider) => {
        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false,
            rewriteLinks: false,
        });
    });
    app.config((stateManagementConfigProvider) => stateManagementConfigProvider.disable());
    function RootController($scope, $element, $http) {
        const domNode = $element[0];
        // render react to DOM
        react_dom_1.render(react_1.default.createElement(react_redux_1.Provider, { store: stores_1.store },
            react_1.default.createElement(app_1.App, null)), domNode);
        // unmount react on controller destroy
        $scope.$on('$destroy', () => {
            react_dom_1.unmountComponentAtNode(domNode);
        });
    }
    chrome_1.default.setRootController('code', RootController);
    chrome_1.default.breadcrumbs.set([
        {
            text: constants_1.APP_TITLE,
            href: '#/',
        },
    ]);
    chrome_1.default.helpExtension.set(domNode => {
        react_dom_1.render(react_1.default.createElement(help_menu_1.HelpMenu, null), domNode);
        return () => {
            react_dom_1.unmountComponentAtNode(domNode);
        };
    });
}
