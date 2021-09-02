"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const i18n_1 = require("@kbn/i18n");
const react_1 = require("@kbn/i18n/react");
const i18n_2 = require("ui/i18n");
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const documentation_links_1 = require("ui/documentation_links");
const management_1 = require("ui/management");
const notify_1 = require("ui/notify");
const routes_1 = tslib_1.__importDefault(require("ui/routes"));
// @ts-ignore: allow traversal to fail on x-pack build
const public_1 = require("../../../../src/legacy/core_plugins/ui_metric/public");
function createShim() {
    // This is an Angular service, which is why we use this provider pattern
    // to access it within our React app.
    let httpClient;
    let reactRouter;
    return {
        core: {
            i18n: {
                ...i18n_1.i18n,
                Context: i18n_2.I18nContext,
                FormattedMessage: react_1.FormattedMessage,
            },
            routing: {
                registerAngularRoute: (path, config) => {
                    routes_1.default.when(path, config);
                },
                registerRouter: (router) => {
                    reactRouter = router;
                },
                getRouter: () => {
                    return reactRouter;
                },
            },
            http: {
                setClient: (client) => {
                    httpClient = client;
                },
                getClient: () => httpClient,
            },
            chrome: chrome_1.default,
            notification: {
                fatalError: notify_1.fatalError,
                toastNotifications: notify_1.toastNotifications,
            },
            documentation: {
                esDocBasePath: `${documentation_links_1.ELASTIC_WEBSITE_URL}guide/en/elasticsearch/reference/${documentation_links_1.DOC_LINK_VERSION}/`,
                esPluginDocBasePath: `${documentation_links_1.ELASTIC_WEBSITE_URL}guide/en/elasticsearch/plugins/${documentation_links_1.DOC_LINK_VERSION}/`,
            },
        },
        plugins: {
            management: {
                sections: management_1.management,
                constants: {
                    BREADCRUMB: management_1.MANAGEMENT_BREADCRUMB,
                },
            },
            uiMetric: {
                track: public_1.trackUiMetric,
            },
        },
    };
}
exports.createShim = createShim;
