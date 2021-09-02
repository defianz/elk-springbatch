"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.capabilitiesMixin = capabilitiesMixin;

var _capabilities_route = require("./capabilities_route");

var _merge_capabilities = require("./merge_capabilities");

var _resolve_capabilities = require("./resolve_capabilities");

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
async function capabilitiesMixin(kbnServer, server) {
  const modifiers = [];
  server.decorate('server', 'registerCapabilitiesModifier', provider => {
    modifiers.push(provider);
  }); // Some plugin capabilities are derived from data provided by other plugins,
  // so we need to wait until after all plugins have been init'd to fetch uiCapabilities.

  kbnServer.afterPluginsInit(async () => {
    const defaultCapabilities = (0, _merge_capabilities.mergeCapabilities)(...(await Promise.all(kbnServer.pluginSpecs.map(spec => spec.getUiCapabilitiesProvider()).filter(provider => !!provider).map(provider => provider(server)))));
    server.decorate('request', 'getCapabilities', function () {
      // Get legacy nav links
      const navLinks = server.getUiNavLinks().reduce((acc, spec) => ({ ...acc,
        [spec._id]: true
      }), {});
      return (0, _resolve_capabilities.resolveCapabilities)(this, modifiers, defaultCapabilities, {
        navLinks
      });
    });
    (0, _capabilities_route.registerCapabilitiesRoute)(server, defaultCapabilities, modifiers);
  });
}