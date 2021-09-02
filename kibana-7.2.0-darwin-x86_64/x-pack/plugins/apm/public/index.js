"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_dom_1 = tslib_1.__importDefault(require("react-dom"));
require("react-vis/dist/style.css");
require("ui/autoload/all");
require("ui/autoload/styles");
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const i18n_1 = require("ui/i18n");
require("uiExports/autocompleteProviders");
const GlobalHelpExtension_1 = require("./components/app/GlobalHelpExtension");
const new_platform_1 = require("./new-platform");
const plugin_1 = require("./new-platform/plugin");
require("./style/global_overrides.css");
const index_html_1 = tslib_1.__importDefault(require("./templates/index.html"));
// render APM feedback link in global help menu
chrome_1.default.helpExtension.set(domElement => {
    react_dom_1.default.render(react_1.default.createElement(GlobalHelpExtension_1.GlobalHelpExtension, null), domElement);
    return () => {
        react_dom_1.default.unmountComponentAtNode(domElement);
    };
});
// @ts-ignore
chrome_1.default.setRootTemplate(index_html_1.default);
const checkForRoot = () => {
    return new Promise(resolve => {
        const ready = !!document.getElementById(plugin_1.REACT_APP_ROOT_ID);
        if (ready) {
            resolve();
        }
        else {
            setTimeout(() => resolve(checkForRoot()), 10);
        }
    });
};
checkForRoot().then(() => {
    const core = {
        i18n: {
            Context: i18n_1.I18nContext
        }
    };
    new_platform_1.plugin().setup(core);
});
