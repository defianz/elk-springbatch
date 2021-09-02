"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const react_dom_1 = require("react-dom");
const constants_1 = require("../common/constants");
const app_1 = require("./app");
const index_html_1 = tslib_1.__importDefault(require("./index.html"));
const navigation_1 = require("./app/services/navigation");
const documentation_1 = require("./app/services/documentation");
const http_1 = require("./app/services/http");
const text_1 = require("./app/services/text");
const ui_metric_1 = require("./app/services/ui_metric");
const REACT_ROOT_ID = 'snapshotRestoreReactRoot';
class Plugin {
    start(core, plugins) {
        const { i18n, routing, http, chrome, notification, documentation } = core;
        const { management, uiMetric } = plugins;
        // Register management section
        const esSection = management.sections.getSection('elasticsearch');
        esSection.register(constants_1.PLUGIN.ID, {
            visible: true,
            display: i18n.translate('xpack.snapshotRestore.appName', {
                defaultMessage: 'Snapshot Repositories',
            }),
            order: 7,
            url: `#${app_1.CLIENT_BASE_PATH}`,
        });
        // Initialize services
        text_1.textService.init(i18n);
        navigation_1.breadcrumbService.init(chrome, management.constants.BREADCRUMB);
        documentation_1.documentationLinksService.init(documentation.esDocBasePath, documentation.esPluginDocBasePath);
        ui_metric_1.uiMetricService.init(uiMetric.track);
        const unmountReactApp = () => {
            const elem = document.getElementById(REACT_ROOT_ID);
            if (elem) {
                react_dom_1.unmountComponentAtNode(elem);
            }
        };
        // Register react root
        routing.registerAngularRoute(`${app_1.CLIENT_BASE_PATH}/:section?/:subsection?/:view?/:id?`, {
            template: index_html_1.default,
            controllerAs: 'snapshotRestoreController',
            controller: ($scope, $route, $http, $q) => {
                // NOTE: We depend upon Angular's $http service because it's decorated with interceptors,
                // e.g. to check license status per request.
                http.setClient($http);
                http_1.httpService.init(http.getClient(), chrome);
                // Angular Lifecycle
                const appRoute = $route.current;
                const stopListeningForLocationChange = $scope.$on('$locationChangeSuccess', () => {
                    const currentRoute = $route.current;
                    const isNavigationInApp = currentRoute.$$route.template === appRoute.$$route.template;
                    // When we navigate within SR, prevent Angular from re-matching the route and rebuild the app
                    if (isNavigationInApp) {
                        $route.current = appRoute;
                    }
                    else {
                        // Any clean up when user leaves SR
                    }
                    $scope.$on('$destroy', () => {
                        if (stopListeningForLocationChange) {
                            stopListeningForLocationChange();
                        }
                        unmountReactApp();
                    });
                });
                $scope.$$postDigest(() => {
                    unmountReactApp();
                    const elem = document.getElementById(REACT_ROOT_ID);
                    if (elem) {
                        app_1.renderReact(elem, { i18n, notification }, { management: { sections: management.sections } });
                    }
                });
            },
        });
    }
}
exports.Plugin = Plugin;
