"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("ui/autoload/all");
// @ts-ignore: path dynamic for kibana
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
// @ts-ignore: path dynamic for kibana
const modules_1 = require("ui/modules");
const routes_1 = tslib_1.__importDefault(require("ui/routes"));
// @ts-ignore: path dynamic for kibana
const timezone_1 = require("ui/vis/lib/timezone");
const apollo_cache_inmemory_1 = require("apollo-cache-inmemory");
const apollo_client_1 = tslib_1.__importDefault(require("apollo-client"));
const apollo_link_1 = require("apollo-link");
const apollo_link_http_1 = require("apollo-link-http");
const apollo_link_state_1 = require("apollo-link-state");
const introspection_json_1 = tslib_1.__importDefault(require("../../graphql/introspection.json"));
const kibana_framework_adapter_1 = require("../adapters/framework/kibana_framework_adapter");
const kibana_observable_api_1 = require("../adapters/observable_api/kibana_observable_api");
function compose() {
    const cache = new apollo_cache_inmemory_1.InMemoryCache({
        addTypename: false,
        fragmentMatcher: new apollo_cache_inmemory_1.IntrospectionFragmentMatcher({
            introspectionQueryResultData: introspection_json_1.default,
        }),
    });
    const observableApi = new kibana_observable_api_1.InfraKibanaObservableApiAdapter({
        basePath: chrome_1.default.getBasePath(),
        xsrfToken: chrome_1.default.getXsrfToken(),
    });
    const graphQLOptions = {
        cache,
        link: apollo_link_1.ApolloLink.from([
            apollo_link_state_1.withClientState({
                cache,
                resolvers: {},
            }),
            new apollo_link_http_1.HttpLink({
                credentials: 'same-origin',
                headers: {
                    'kbn-xsrf': chrome_1.default.getXsrfToken(),
                },
                uri: `${chrome_1.default.getBasePath()}/api/infra/graphql`,
            }),
        ]),
    };
    const apolloClient = new apollo_client_1.default(graphQLOptions);
    const infraModule = modules_1.uiModules.get('app/infa');
    const framework = new kibana_framework_adapter_1.InfraKibanaFrameworkAdapter(infraModule, routes_1.default, timezone_1.timezoneProvider);
    const libs = {
        apolloClient,
        framework,
        observableApi,
    };
    return libs;
}
exports.compose = compose;
