"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const PathReporter_1 = require("io-ts/lib/PathReporter");
const ReactDOM = tslib_1.__importStar(require("react-dom"));
const adapter_types_1 = require("./adapter_types");
class KibanaFrameworkAdapter {
    constructor(PLUGIN_ID, management, routes, getBasePath, onKibanaReady, XPackInfoProvider, version) {
        this.PLUGIN_ID = PLUGIN_ID;
        this.management = management;
        this.routes = routes;
        this.getBasePath = getBasePath;
        this.onKibanaReady = onKibanaReady;
        this.XPackInfoProvider = XPackInfoProvider;
        this.version = version;
        this.xpackInfo = null;
        this.shieldUser = null;
        this.setUISettings = (key, value) => {
            this.adapterService.callOrBuffer(({ config }) => {
                config.set(key, value);
            });
        };
        this.adapterService = new KibanaAdapterServiceProvider();
    }
    get info() {
        if (this.xpackInfo) {
            return this.xpackInfo;
        }
        else {
            throw new Error('framework adapter must have init called before anything else');
        }
    }
    get currentUser() {
        return this.shieldUser;
    }
    async waitUntilFrameworkReady() {
        const $injector = await this.onKibanaReady();
        const Private = $injector.get('Private');
        let xpackInfo;
        try {
            xpackInfo = Private(this.XPackInfoProvider);
        }
        catch (e) {
            xpackInfo = false;
        }
        let xpackInfoUnpacked;
        try {
            xpackInfoUnpacked = {
                basePath: this.getBasePath(),
                license: {
                    type: xpackInfo ? xpackInfo.getLicense().type : 'oss',
                    expired: xpackInfo ? !xpackInfo.getLicense().isActive : false,
                    expiry_date_in_millis: xpackInfo.getLicense().expiryDateInMillis !== undefined
                        ? xpackInfo.getLicense().expiryDateInMillis
                        : -1,
                },
                security: {
                    enabled: xpackInfo
                        ? xpackInfo.get(`features.${this.PLUGIN_ID}.security.enabled`, false)
                        : false,
                    available: xpackInfo
                        ? xpackInfo.get(`features.${this.PLUGIN_ID}.security.available`, false)
                        : false,
                },
                settings: xpackInfo ? xpackInfo.get(`features.${this.PLUGIN_ID}.settings`) : {},
            };
        }
        catch (e) {
            throw new Error(`Unexpected data structure from XPackInfoProvider, ${JSON.stringify(e)}`);
        }
        const assertData = adapter_types_1.RuntimeFrameworkInfo.decode(xpackInfoUnpacked);
        if (assertData.isLeft()) {
            throw new Error(`Error parsing xpack info in ${this.PLUGIN_ID},   ${PathReporter_1.PathReporter.report(assertData)[0]}`);
        }
        this.xpackInfo = xpackInfoUnpacked;
        try {
            this.shieldUser = await $injector.get('ShieldUser').getCurrent().$promise;
            const assertUser = adapter_types_1.RuntimeFrameworkUser.decode(this.shieldUser);
            if (assertUser.isLeft()) {
                throw new Error(`Error parsing user info in ${this.PLUGIN_ID},   ${PathReporter_1.PathReporter.report(assertUser)[0]}`);
            }
        }
        catch (e) {
            this.shieldUser = null;
        }
    }
    renderUIAtPath(path, component, toController = 'self') {
        const adapter = this;
        this.routes.when(`${path}${[...Array(6)].map((e, n) => `/:arg${n}?`).join('')}`, // Hack because angular 1 does not support wildcards
        {
            template: toController === 'self'
                ? `<${this.PLUGIN_ID}><div id="${this.PLUGIN_ID}ReactRoot"></div></${this.PLUGIN_ID}>`
                : `<kbn-management-app section="${this.PLUGIN_ID.replace('_', '-')}">
                <div id="management-sidenav" class="euiPageSideBar" style="position: static;"></div>
                <div id="${this.PLUGIN_ID}ReactRoot" />
               </kbn-management-app>`,
            // eslint-disable-next-line max-classes-per-file
            controller: ($scope, $route) => {
                try {
                    $scope.$$postDigest(() => {
                        const elem = document.getElementById(`${this.PLUGIN_ID}ReactRoot`);
                        ReactDOM.render(component, elem);
                        adapter.manageAngularLifecycle($scope, $route, elem);
                    });
                    $scope.$onInit = () => {
                        $scope.topNavMenu = [];
                    };
                }
                catch (e) {
                    throw new Error(`Error rendering Beats CM to the dom, ${e.message}`);
                }
            },
        });
    }
    registerManagementSection(settings) {
        const sectionId = settings.id || this.PLUGIN_ID;
        if (!this.management.hasItem(sectionId)) {
            this.management.register(sectionId, {
                display: settings.name,
                icon: settings.iconName,
                order: settings.order || 30,
            });
        }
    }
    registerManagementUI(settings) {
        const sectionId = settings.sectionId || this.PLUGIN_ID;
        if (!this.management.hasItem(sectionId)) {
            throw new Error(`registerManagementUI was called with a sectionId of ${sectionId}, and that is is not yet regestered as a section`);
        }
        const section = this.management.getSection(sectionId);
        section.register(sectionId, {
            visible: settings.visable || true,
            display: settings.name,
            order: settings.order || 30,
            url: `#${settings.basePath}`,
        });
    }
    manageAngularLifecycle($scope, $route, elem) {
        const lastRoute = $route.current;
        const deregister = $scope.$on('$locationChangeSuccess', () => {
            const currentRoute = $route.current;
            // if templates are the same we are on the same route
            if (lastRoute.$$route.template === currentRoute.$$route.template) {
                // this prevents angular from destroying scope
                $route.current = lastRoute;
            }
            else {
                if (elem) {
                    ReactDOM.unmountComponentAtNode(elem);
                    elem.remove();
                }
            }
        });
        $scope.$on('$destroy', () => {
            if (deregister) {
                deregister();
            }
            // manually unmount component when scope is destroyed
            if (elem) {
                ReactDOM.unmountComponentAtNode(elem);
                elem.remove();
            }
        });
    }
}
exports.KibanaFrameworkAdapter = KibanaFrameworkAdapter;
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
