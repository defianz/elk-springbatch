"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ReactDOM = tslib_1.__importStar(require("react-dom"));
const ROOT_ELEMENT_ID = 'react-infra-root';
const BREADCRUMBS_ELEMENT_ID = 'react-infra-breadcrumbs';
class InfraKibanaFrameworkAdapter {
    constructor(uiModule, uiRoutes, timezoneProvider) {
        this.rootComponent = null;
        this.breadcrumbsComponent = null;
        this.setUISettings = (key, value) => {
            this.adapterService.callOrBuffer(({ config }) => {
                config.set(key, value);
            });
        };
        this.render = (component) => {
            this.adapterService.callOrBuffer(() => (this.rootComponent = component));
        };
        this.renderBreadcrumbs = (component) => {
            this.adapterService.callOrBuffer(() => (this.breadcrumbsComponent = component));
        };
        this.register = (adapterModule, uiRoutes) => {
            adapterModule.provider('kibanaAdapter', this.adapterService);
            adapterModule.directive('infraUiKibanaAdapter', () => ({
                controller: ($scope, $element) => ({
                    $onDestroy: () => {
                        const targetRootElement = $element[0].querySelector(`#${ROOT_ELEMENT_ID}`);
                        const targetBreadcrumbsElement = $element[0].querySelector(`#${ROOT_ELEMENT_ID}`);
                        if (targetRootElement) {
                            ReactDOM.unmountComponentAtNode(targetRootElement);
                        }
                        if (targetBreadcrumbsElement) {
                            ReactDOM.unmountComponentAtNode(targetBreadcrumbsElement);
                        }
                    },
                    $onInit: () => {
                        $scope.topNavMenu = [];
                    },
                    $postLink: () => {
                        $scope.$watchGroup([
                            () => this.breadcrumbsComponent,
                            () => $element[0].querySelector(`#${BREADCRUMBS_ELEMENT_ID}`),
                        ], ([breadcrumbsComponent, targetElement]) => {
                            if (!targetElement) {
                                return;
                            }
                            if (breadcrumbsComponent) {
                                ReactDOM.render(breadcrumbsComponent, targetElement);
                            }
                            else {
                                ReactDOM.unmountComponentAtNode(targetElement);
                            }
                        });
                        $scope.$watchGroup([() => this.rootComponent, () => $element[0].querySelector(`#${ROOT_ELEMENT_ID}`)], ([rootComponent, targetElement]) => {
                            if (!targetElement) {
                                return;
                            }
                            if (rootComponent) {
                                ReactDOM.render(rootComponent, targetElement);
                            }
                            else {
                                ReactDOM.unmountComponentAtNode(targetElement);
                            }
                        });
                    },
                }),
                scope: true,
                template: `
        <div
          id="${ROOT_ELEMENT_ID}"
          class="infReactRoot"
        ></div>
      `,
            }));
            adapterModule.run((config, kbnVersion, Private, 
            // @ts-ignore: inject kibanaAdapter to force eager instatiation
            kibanaAdapter) => {
                this.timezone = Private(this.timezoneProvider)();
                this.kbnVersion = kbnVersion;
            });
            uiRoutes.enable();
            uiRoutes.otherwise({
                reloadOnSearch: false,
                template: '<infra-ui-kibana-adapter style="display: flex; align-items: stretch; flex: 1 0 0%;"></infra-ui-kibana-adapter>',
            });
        };
        this.adapterService = new KibanaAdapterServiceProvider();
        this.timezoneProvider = timezoneProvider;
        this.appState = {};
        this.register(uiModule, uiRoutes);
    }
}
exports.InfraKibanaFrameworkAdapter = InfraKibanaFrameworkAdapter;
class KibanaAdapterServiceProvider {
    constructor() {
        this.serviceRefs = null;
        this.bufferedCalls = [];
    }
    $get($rootScope, config) {
        this.serviceRefs = {
            config,
            rootScope: $rootScope,
        };
        this.applyBufferedCalls(this.bufferedCalls);
        return this;
    }
    callOrBuffer(serviceCall) {
        if (this.serviceRefs !== null) {
            this.applyBufferedCalls([serviceCall]);
        }
        else {
            this.bufferedCalls.push(serviceCall);
        }
    }
    applyBufferedCalls(bufferedCalls) {
        if (!this.serviceRefs) {
            return;
        }
        this.serviceRefs.rootScope.$apply(() => {
            bufferedCalls.forEach(serviceCall => {
                if (!this.serviceRefs) {
                    return;
                }
                return serviceCall(this.serviceRefs);
            });
        });
    }
}
