"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const history_1 = require("history");
const react_1 = tslib_1.__importDefault(require("react"));
const react_apollo_1 = require("react-apollo");
const react_redux_1 = require("react-redux");
const styled_components_1 = require("styled-components");
const eui_1 = require("@elastic/eui");
const eui_theme_dark_json_1 = tslib_1.__importDefault(require("@elastic/eui/dist/eui_theme_dark.json"));
const eui_theme_light_json_1 = tslib_1.__importDefault(require("@elastic/eui/dist/eui_theme_light.json"));
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const i18n_1 = require("ui/i18n");
const error_toast_1 = require("../components/error_toast");
const kibana_framework_adapter_1 = require("../lib/adapters/framework/kibana_framework_adapter");
const routes_1 = require("../routes");
const store_1 = require("../store/store");
exports.startApp = async (libs) => {
    const history = history_1.createHashHistory();
    const libs$ = new rxjs_1.BehaviorSubject(libs);
    const store = store_1.createStore(undefined, libs$.pipe(operators_1.pluck('apolloClient')));
    libs.framework.render(react_1.default.createElement(eui_1.EuiErrorBoundary, null,
        react_1.default.createElement(i18n_1.I18nContext, null,
            react_1.default.createElement(react_redux_1.Provider, { store: store },
                react_1.default.createElement(react_apollo_1.ApolloProvider, { client: libs.apolloClient },
                    react_1.default.createElement(styled_components_1.ThemeProvider, { theme: () => ({
                            eui: libs.framework.darkMode ? eui_theme_dark_json_1.default : eui_theme_light_json_1.default,
                            darkMode: libs.framework.darkMode,
                        }) },
                        react_1.default.createElement(kibana_framework_adapter_1.KibanaConfigContext.Provider, { value: libs.framework },
                            react_1.default.createElement(routes_1.PageRouter, { history: history }))),
                    react_1.default.createElement(error_toast_1.ErrorToast, null))))));
};
