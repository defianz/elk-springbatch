"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_dom_1 = tslib_1.__importDefault(require("react-dom"));
// @ts-ignore
const modules_1 = require("ui/modules");
const module = modules_1.uiModules.get('apps/ml', ['react']);
const i18n_1 = require("ui/i18n");
const page_1 = require("./page");
module.directive('mlDataFramePage', () => {
    return {
        scope: {},
        restrict: 'E',
        link: (scope, element) => {
            react_dom_1.default.render(react_1.default.createElement(i18n_1.I18nContext, null, react_1.default.createElement(page_1.Page)), element[0]);
            element.on('$destroy', () => {
                react_dom_1.default.unmountComponentAtNode(element[0]);
                scope.$destroy();
            });
        },
    };
});
