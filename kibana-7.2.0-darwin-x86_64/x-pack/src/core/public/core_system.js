"use strict";
/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("./core.css");
const base_path_1 = require("./base_path");
const chrome_1 = require("./chrome");
const fatal_errors_1 = require("./fatal_errors");
const http_1 = require("./http");
const i18n_1 = require("./i18n");
const injected_metadata_1 = require("./injected_metadata");
const legacy_1 = require("./legacy");
const notifications_1 = require("./notifications");
const overlays_1 = require("./overlays");
const plugins_1 = require("./plugins");
const ui_settings_1 = require("./ui_settings");
const application_1 = require("./application");
/**
 * The CoreSystem is the root of the new platform, and setups all parts
 * of Kibana in the UI, including the LegacyPlatform which is managed
 * by the LegacyPlatformService. As we migrate more things to the new
 * platform the CoreSystem will get many more Services.
 *
 * @internal
 */
class CoreSystem {
    constructor(params) {
        this.fatalErrorsSetup = null;
        const { rootDomElement, browserSupportsCsp, injectedMetadata, requireLegacyFiles, useLegacyTestHarness, } = params;
        this.rootDomElement = rootDomElement;
        this.i18n = new i18n_1.I18nService();
        this.injectedMetadata = new injected_metadata_1.InjectedMetadataService({
            injectedMetadata,
        });
        this.fatalErrors = new fatal_errors_1.FatalErrorsService(rootDomElement, () => {
            // Stop Core before rendering any fatal errors into the DOM
            this.stop();
        });
        this.notifications = new notifications_1.NotificationsService();
        this.http = new http_1.HttpService();
        this.basePath = new base_path_1.BasePathService();
        this.uiSettings = new ui_settings_1.UiSettingsService();
        this.overlay = new overlays_1.OverlayService();
        this.application = new application_1.ApplicationService();
        this.chrome = new chrome_1.ChromeService({ browserSupportsCsp });
        const core = {};
        this.plugins = new plugins_1.PluginsService(core);
        this.legacyPlatform = new legacy_1.LegacyPlatformService({
            requireLegacyFiles,
            useLegacyTestHarness,
        });
    }
    async setup() {
        try {
            // Setup FatalErrorsService and it's dependencies first so that we're
            // able to render any errors.
            const i18n = this.i18n.setup();
            const injectedMetadata = this.injectedMetadata.setup();
            this.fatalErrorsSetup = this.fatalErrors.setup({ injectedMetadata, i18n });
            const basePath = this.basePath.setup({ injectedMetadata });
            const http = this.http.setup({
                basePath,
                injectedMetadata,
                fatalErrors: this.fatalErrorsSetup,
            });
            const uiSettings = this.uiSettings.setup({
                http,
                injectedMetadata,
                basePath,
            });
            const notifications = this.notifications.setup({ uiSettings });
            const application = this.application.setup();
            const chrome = this.chrome.setup({
                injectedMetadata,
                notifications,
            });
            const core = {
                application,
                basePath,
                chrome,
                fatalErrors: this.fatalErrorsSetup,
                http,
                i18n,
                injectedMetadata,
                notifications,
                uiSettings,
            };
            // Services that do not expose contracts at setup
            await this.plugins.setup(core);
            await this.legacyPlatform.setup({ core });
            return { fatalErrors: this.fatalErrorsSetup };
        }
        catch (error) {
            if (this.fatalErrorsSetup) {
                this.fatalErrorsSetup.add(error);
            }
            else {
                // If the FatalErrorsService has not yet been setup, log error to console
                // eslint-disable-next-line no-console
                console.log(error);
            }
        }
    }
    async start() {
        try {
            const injectedMetadata = await this.injectedMetadata.start();
            const basePath = await this.basePath.start({ injectedMetadata });
            const http = await this.http.start();
            const i18n = await this.i18n.start();
            const application = await this.application.start({ basePath, injectedMetadata });
            const chrome = await this.chrome.start({ application, basePath });
            const notificationsTargetDomElement = document.createElement('div');
            const overlayTargetDomElement = document.createElement('div');
            const legacyPlatformTargetDomElement = document.createElement('div');
            // ensure the rootDomElement is empty
            this.rootDomElement.textContent = '';
            this.rootDomElement.classList.add('coreSystemRootDomElement');
            this.rootDomElement.appendChild(notificationsTargetDomElement);
            this.rootDomElement.appendChild(legacyPlatformTargetDomElement);
            this.rootDomElement.appendChild(overlayTargetDomElement);
            const notifications = await this.notifications.start({
                i18n,
                targetDomElement: notificationsTargetDomElement,
            });
            const overlays = this.overlay.start({ i18n, targetDomElement: overlayTargetDomElement });
            const core = {
                application,
                basePath,
                chrome,
                http,
                i18n,
                injectedMetadata,
                notifications,
                overlays,
            };
            await this.plugins.start(core);
            await this.legacyPlatform.start({ core, targetDomElement: legacyPlatformTargetDomElement });
        }
        catch (error) {
            if (this.fatalErrorsSetup) {
                this.fatalErrorsSetup.add(error);
            }
            else {
                // If the FatalErrorsService has not yet been setup, log error to console
                // eslint-disable-next-line no-console
                console.error(error);
            }
        }
    }
    stop() {
        this.legacyPlatform.stop();
        this.plugins.stop();
        this.notifications.stop();
        this.http.stop();
        this.uiSettings.stop();
        this.chrome.stop();
        this.i18n.stop();
        this.rootDomElement.textContent = '';
    }
}
exports.CoreSystem = CoreSystem;
