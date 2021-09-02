"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discover = discover;

var _fs = require("fs");

var _path = require("path");

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _plugin = require("../plugin");

var _plugin_context = require("../plugin_context");

var _plugin_discovery_error = require("./plugin_discovery_error");

var _plugin_manifest_parser = require("./plugin_manifest_parser");

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
const fsReadDir$ = (0, _rxjs.bindNodeCallback)(_fs.readdir);
const fsStat$ = (0, _rxjs.bindNodeCallback)(_fs.stat);
/**
 * Tries to discover all possible plugins based on the provided plugin config.
 * Discovery result consists of two separate streams, the one (`plugin$`) is
 * for the successfully discovered plugins and the other one (`error$`) is for
 * all the errors that occurred during discovery process.
 *
 * @param config Plugin config instance.
 * @param coreContext Kibana core values.
 * @internal
 */

function discover(config, coreContext) {
  const log = coreContext.logger.get('plugins-discovery');
  log.debug('Discovering plugins...');

  if (config.additionalPluginPaths.length) {
    log.warn(`Explicit plugin paths [${config.additionalPluginPaths}] are only supported in development. Relative imports will not work in production.`);
  }

  const discoveryResults$ = (0, _rxjs.merge)((0, _rxjs.from)(config.additionalPluginPaths), processPluginSearchPaths$(config.pluginSearchPaths, log)).pipe((0, _operators.mergeMap)(pluginPathOrError => {
    return typeof pluginPathOrError === 'string' ? createPlugin$(pluginPathOrError, log, coreContext) : [pluginPathOrError];
  }), (0, _operators.shareReplay)());
  return {
    plugin$: discoveryResults$.pipe((0, _operators.filter)(entry => entry instanceof _plugin.PluginWrapper)),
    error$: discoveryResults$.pipe((0, _operators.filter)(entry => !(entry instanceof _plugin.PluginWrapper)))
  };
}
/**
 * Iterates over every plugin search path and returns a merged stream of all
 * sub-directories. If directory cannot be read or it's impossible to get stat
 * for any of the nested entries then error is added into the stream instead.
 * @param pluginDirs List of the top-level directories to process.
 * @param log Plugin discovery logger instance.
 */


function processPluginSearchPaths$(pluginDirs, log) {
  return (0, _rxjs.from)(pluginDirs).pipe((0, _operators.mergeMap)(dir => {
    log.debug(`Scanning "${dir}" for plugin sub-directories...`);
    return fsReadDir$(dir).pipe((0, _operators.mergeMap)(subDirs => subDirs.map(subDir => (0, _path.resolve)(dir, subDir))), (0, _operators.mergeMap)(path => fsStat$(path).pipe( // Filter out non-directory entries from target directories, it's expected that
    // these directories may contain files (e.g. `README.md` or `package.json`).
    (0, _operators.mergeMap)(pathStat => pathStat.isDirectory() ? [path] : []), (0, _operators.catchError)(err => [_plugin_discovery_error.PluginDiscoveryError.invalidPluginPath(path, err)]))), (0, _operators.catchError)(err => [_plugin_discovery_error.PluginDiscoveryError.invalidSearchPath(dir, err)]));
  }));
}
/**
 * Tries to load and parse the plugin manifest file located at the provided plugin
 * directory path and produces an error result if it fails to do so or plugin manifest
 * isn't valid.
 * @param path Path to the plugin directory where manifest should be loaded from.
 * @param log Plugin discovery logger instance.
 * @param coreContext Kibana core context.
 */


function createPlugin$(path, log, coreContext) {
  return (0, _rxjs.from)((0, _plugin_manifest_parser.parseManifest)(path, coreContext.env.packageInfo)).pipe((0, _operators.map)(manifest => {
    log.debug(`Successfully discovered plugin "${manifest.id}" at "${path}"`);
    return new _plugin.PluginWrapper(path, manifest, (0, _plugin_context.createPluginInitializerContext)(coreContext, manifest));
  }), (0, _operators.catchError)(err => [err]));
}