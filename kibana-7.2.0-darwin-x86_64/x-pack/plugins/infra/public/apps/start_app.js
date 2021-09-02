"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const constate_1 = require("constate");
const history_1 = require("history");
const react_1 = tslib_1.__importDefault(require("react"));
const react_apollo_1 = require("react-apollo");
const react_redux_1 = require("react-redux");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
// TODO use theme provided from parentApp when kibana supports it
const eui_1 = require("@elastic/eui");
const react_2 = require("ui/capabilities/react");
const i18n_1 = require("ui/i18n");
const eui_styled_components_1 = require("../../../../common/eui_styled_components");
const routes_1 = require("../routes");
const store_1 = require("../store");
const apollo_context_1 = require("../utils/apollo_context");
const history_context_1 = require("../utils/history_context");
const use_kibana_ui_setting_1 = require("../utils/use_kibana_ui_setting");
async function startApp(libs) {
    const history = history_1.createHashHistory();
    const libs$ = new rxjs_1.BehaviorSubject(libs);
    const store = store_1.createStore({
        apolloClient: libs$.pipe(operators_1.pluck('apolloClient')),
        observableApi: libs$.pipe(operators_1.pluck('observableApi')),
    });
    const InfraPluginRoot = () => {
        const [darkMode] = use_kibana_ui_setting_1.useKibanaUiSetting('theme:darkMode');
        return (react_1.default.createElement(i18n_1.I18nContext, null,
            react_1.default.createElement(react_2.UICapabilitiesProvider, null,
                react_1.default.createElement(eui_1.EuiErrorBoundary, null,
                    react_1.default.createElement(constate_1.Provider, { devtools: true },
                        react_1.default.createElement(react_redux_1.Provider, { store: store },
                            react_1.default.createElement(react_apollo_1.ApolloProvider, { client: libs.apolloClient },
                                react_1.default.createElement(apollo_context_1.ApolloClientContext.Provider, { value: libs.apolloClient },
                                    react_1.default.createElement(eui_styled_components_1.EuiThemeProvider, { darkMode: darkMode },
                                        react_1.default.createElement(history_context_1.HistoryContext.Provider, { value: history },
                                            react_1.default.createElement(routes_1.PageRouter, { history: history })))))))))));
    };
    libs.framework.render(react_1.default.createElement(InfraPluginRoot, null));
}
exports.startApp = startApp;
