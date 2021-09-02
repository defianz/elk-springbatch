"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_dom_1 = tslib_1.__importDefault(require("react-dom"));
const react_dom_2 = require("react-dom");
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const constants_1 = require("../../../../common/constants");
const kibana_global_help_1 = require("./kibana_global_help");
const capabilities_adapter_1 = require("./capabilities_adapter");
class UMKibanaFrameworkAdapter {
    constructor(uiRoutes) {
        /**
         * This function will acquire all the existing data from Kibana
         * services and persisted state expected by the plugin's props
         * interface. It then renders the plugin.
         */
        this.render = (renderComponent, createGraphQLClient) => {
            const route = {
                controllerAs: 'uptime',
                // @ts-ignore angular
                controller: ($scope, $route, config, $location, $window) => {
                    const graphQLClient = createGraphQLClient(this.uriPath, this.xsrfHeader);
                    $scope.$$postDigest(() => {
                        const elem = document.getElementById('uptimeReactRoot');
                        // configure breadcrumbs
                        let kibanaBreadcrumbs = [];
                        chrome_1.default.breadcrumbs.get$().subscribe((breadcrumbs) => {
                            kibanaBreadcrumbs = breadcrumbs;
                        });
                        // set up route with current base path
                        const basePath = chrome_1.default.getBasePath();
                        const routerBasename = basePath.endsWith('/')
                            ? `${basePath}/${constants_1.PLUGIN.ROUTER_BASE_NAME}`
                            : basePath + constants_1.PLUGIN.ROUTER_BASE_NAME;
                        /**
                         * TODO: this is a redirect hack to deal with a problem that largely
                         * in testing but rarely occurs in the real world, where the specified
                         * URL contains `.../app/uptime{SOME_URL_PARAM_TEXT}#` instead of
                         * a path like `.../app/uptime#{SOME_URL_PARAM_TEXT}`.
                         *
                         * This redirect will almost never be triggered in practice, but it makes more
                         * sense to include it here rather than altering the existing testing
                         * infrastructure underlying the rest of Kibana.
                         *
                         * We welcome a more permanent solution that will result in the deletion of the
                         * block below.
                         */
                        if ($location.absUrl().indexOf(constants_1.PLUGIN.ROUTER_BASE_NAME) === -1) {
                            $window.location.replace(routerBasename);
                        }
                        // determine whether dark mode is enabled
                        const darkMode = config.get('theme:darkMode', false) || false;
                        /**
                         * We pass this global help setup as a prop to the app, because for
                         * localization it's necessary to have the provider mounted before
                         * we can render our help links, as they rely on i18n.
                         */
                        const renderGlobalHelpControls = () => 
                        // render Uptime feedback link in global help menu
                        chrome_1.default.helpExtension.set((element) => {
                            react_dom_1.default.render(kibana_global_help_1.renderUptimeKibanaGlobalHelp(), element);
                            return () => react_dom_1.default.unmountComponentAtNode(element);
                        });
                        /**
                         * These values will let Uptime know if the integrated solutions
                         * are available. If any/all of them are unavaialble, we should not show
                         * links/integrations to those apps.
                         */
                        const { apm: isApmAvailable, infrastructure: isInfraAvailable, logs: isLogsAvailable, } = capabilities_adapter_1.getIntegratedAppAvailability(constants_1.INTEGRATED_SOLUTIONS);
                        react_dom_1.default.render(renderComponent({
                            basePath,
                            darkMode,
                            setBreadcrumbs: chrome_1.default.breadcrumbs.set,
                            kibanaBreadcrumbs,
                            setBadge: chrome_1.default.badge.set,
                            routerBasename,
                            client: graphQLClient,
                            renderGlobalHelpControls,
                            isApmAvailable,
                            isInfraAvailable,
                            isLogsAvailable,
                        }), elem);
                        this.manageAngularLifecycle($scope, $route, elem);
                    });
                },
                template: '<uptime-app section="kibana" id="uptimeReactRoot" class="app-wrapper-panel"></uptime-app>',
            };
            this.uiRoutes.enable();
            // TODO: hack to refer all routes to same endpoint, use a more proper way of achieving this
            this.uiRoutes.otherwise(route);
        };
        // @ts-ignore angular params
        this.manageAngularLifecycle = ($scope, $route, elem) => {
            const lastRoute = $route.current;
            const deregister = $scope.$on('$locationChangeSuccess', () => {
                const currentRoute = $route.current;
                if (lastRoute.$$route && lastRoute.$$route.template === currentRoute.$$route.template) {
                    $route.current = lastRoute;
                }
            });
            $scope.$on('$destroy', () => {
                deregister();
                react_dom_2.unmountComponentAtNode(elem);
            });
        };
        this.uiRoutes = uiRoutes;
        this.xsrfHeader = chrome_1.default.getXsrfToken();
        this.uriPath = `${chrome_1.default.getBasePath()}/api/uptime/graphql`;
    }
}
exports.UMKibanaFrameworkAdapter = UMKibanaFrameworkAdapter;
