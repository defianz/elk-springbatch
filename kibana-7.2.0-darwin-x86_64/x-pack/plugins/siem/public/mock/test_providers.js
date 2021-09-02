"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_theme_dark_json_1 = tslib_1.__importDefault(require("@elastic/eui/dist/eui_theme_dark.json"));
const react_1 = require("@kbn/i18n/react");
const apollo_cache_inmemory_1 = require("apollo-cache-inmemory");
const apollo_client_1 = tslib_1.__importDefault(require("apollo-client"));
const apollo_link_1 = require("apollo-link");
const React = tslib_1.__importStar(require("react"));
const react_apollo_1 = require("react-apollo");
const react_beautiful_dnd_1 = require("react-beautiful-dnd");
const react_redux_1 = require("react-redux");
const recompose_1 = require("recompose");
const rxjs_1 = require("rxjs");
const styled_components_1 = require("styled-components");
const kibana_framework_adapter_1 = require("../lib/adapters/framework/kibana_framework_adapter");
const store_1 = require("../store");
const global_state_1 = require("./global_state");
const kibana_config_1 = require("./kibana_config");
const state = global_state_1.mockGlobalState;
exports.apolloClient = new apollo_client_1.default({
    cache: new apollo_cache_inmemory_1.InMemoryCache(),
    link: new apollo_link_1.ApolloLink((o, f) => (f ? f(o) : null)),
});
exports.apolloClientObservable = new rxjs_1.BehaviorSubject(exports.apolloClient);
/** A utility for wrapping children in the providers required to run most tests */
exports.TestProviders = recompose_1.pure(({ children, store = store_1.createStore(state, exports.apolloClientObservable), mockFramework = kibana_config_1.mockFrameworks.default_UTC, onDragEnd = jest.fn(), }) => (React.createElement(react_1.I18nProvider, null,
    React.createElement(react_apollo_1.ApolloProvider, { client: exports.apolloClient },
        React.createElement(react_redux_1.Provider, { store: store },
            React.createElement(styled_components_1.ThemeProvider, { theme: () => ({ eui: eui_theme_dark_json_1.default, darkMode: true }) },
                React.createElement(kibana_framework_adapter_1.KibanaConfigContext.Provider, { value: mockFramework },
                    React.createElement(react_beautiful_dnd_1.DragDropContext, { onDragEnd: onDragEnd }, children))))))));
exports.TestProviderWithoutDragAndDrop = recompose_1.pure(({ children, store = store_1.createStore(state, exports.apolloClientObservable) }) => (React.createElement(react_1.I18nProvider, null,
    React.createElement(react_redux_1.Provider, { store: store }, children))));
