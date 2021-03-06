"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("react-vis/dist/style.css");
require("ui/angular-bootstrap");
require("ui/autoload/all");
require("ui/autoload/styles");
require("ui/courier");
require("ui/persisted_log");
require("uiExports/autocompleteProviders");
const apollo_client_adapter_1 = require("../lib/adapters/framework/apollo_client_adapter");
const uptime_app_1 = require("../uptime_app");
async function startApp(libs) {
    libs.framework.render(uptime_app_1.UptimeApp, apollo_client_adapter_1.createApolloClient);
}
exports.startApp = startApp;
