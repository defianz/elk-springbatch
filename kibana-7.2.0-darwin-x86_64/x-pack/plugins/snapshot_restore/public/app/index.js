"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const react_dom_1 = require("react-dom");
const react_router_dom_1 = require("react-router-dom");
const app_1 = require("./app");
const state_1 = require("./services/state");
var constants_1 = require("./constants");
exports.CLIENT_BASE_PATH = constants_1.BASE_PATH;
/**
 * App dependencies
 */
let DependenciesContext;
exports.useAppDependencies = () => react_1.useContext(DependenciesContext);
const ReactApp = ({ core, plugins }) => {
    const { i18n: { Context: I18nContext }, } = core;
    const appDependencies = {
        core,
        plugins,
    };
    DependenciesContext = react_1.createContext(appDependencies);
    return (react_1.default.createElement(I18nContext, null,
        react_1.default.createElement(react_router_dom_1.HashRouter, null,
            react_1.default.createElement(DependenciesContext.Provider, { value: appDependencies },
                react_1.default.createElement(state_1.AppStateProvider, { value: react_1.useReducer(state_1.reducer, state_1.initialState) },
                    react_1.default.createElement(app_1.App, null))))));
};
exports.renderReact = async (elem, core, plugins) => {
    react_dom_1.render(react_1.default.createElement(ReactApp, { core: core, plugins: plugins }), elem);
};
