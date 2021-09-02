"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs_optimizer = _interopRequireDefault(require("./fs_optimizer"));

var _bundles_route = require("./bundles_route");

var _dynamic_dll_plugin = require("./dynamic_dll_plugin");

var _utils = require("../legacy/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var _default = async (kbnServer, server, config) => {
  if (!config.get('optimize.enabled')) return; // the watch optimizer sets up two threads, one is the server listening
  // on 5601 and the other is a server listening on 5602 that builds the
  // bundles in a "middleware" style.
  //
  // the server listening on 5601 may be restarted a number of times, depending
  // on the watch setup managed by the cli. It proxies all bundles/* and built_assets/dlls/*
  // requests to the other server. The server on 5602 is long running, in order
  // to prevent complete rebuilds of the optimize content.

  const watch = config.get('optimize.watch');

  if (watch) {
    return await kbnServer.mixin(require('./watch/watch'));
  }

  const {
    newPlatform,
    uiBundles
  } = kbnServer;
  server.route((0, _bundles_route.createBundlesRoute)({
    regularBundlesPath: uiBundles.getWorkingDir(),
    dllBundlesPath: _dynamic_dll_plugin.DllCompiler.getRawDllConfig().outputPath,
    basePublicPath: config.get('server.basePath'),
    builtCssPath: (0, _utils.fromRoot)('built_assets/css')
  })); // in prod, only bundle when something is missing or invalid

  const reuseCache = config.get('optimize.useBundleCache') ? await uiBundles.areAllBundleCachesValid() : false; // we might not have any work to do

  if (reuseCache) {
    server.log(['debug', 'optimize'], `All bundles are cached and ready to go!`);
    return;
  }

  await uiBundles.resetBundleDir(); // only require the FsOptimizer when we need to

  const optimizer = new _fs_optimizer.default({
    logWithMetadata: (tags, message, metadata) => server.logWithMetadata(tags, message, metadata),
    uiBundles,
    discoveredPlugins: newPlatform.setup.plugins.uiPlugins.internal,
    profile: config.get('optimize.profile'),
    sourceMaps: config.get('optimize.sourceMaps'),
    workers: config.get('optimize.workers')
  });
  server.log(['info', 'optimize'], `Optimizing and caching ${uiBundles.getDescription()}. This may take a few minutes`);
  const start = Date.now();
  await optimizer.run();
  const seconds = ((Date.now() - start) / 1000).toFixed(2);
  server.log(['info', 'optimize'], `Optimization of ${uiBundles.getDescription()} complete in ${seconds} seconds`);
};

exports.default = _default;
module.exports = exports.default;