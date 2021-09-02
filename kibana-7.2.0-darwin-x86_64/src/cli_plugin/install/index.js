"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pluginInstall;

var _utils = require("../../legacy/utils");

var _install = _interopRequireDefault(require("./install"));

var _logger = _interopRequireDefault(require("../lib/logger"));

var _path = require("../../legacy/server/path");

var _settings = require("./settings");

var _log_warnings = _interopRequireDefault(require("../lib/log_warnings"));

var _warn_if_plugin_dir_option = require("../lib/warn_if_plugin_dir_option");

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
function processCommand(command, options) {
  let settings;

  try {
    settings = (0, _settings.parse)(command, options, _utils.pkg);
  } catch (ex) {
    //The logger has not yet been initialized.
    console.error(ex.message);
    process.exit(64);
  }

  const logger = new _logger.default(settings);
  (0, _warn_if_plugin_dir_option.warnIfUsingPluginDirOption)(settings, (0, _utils.fromRoot)('plugins'), logger);
  (0, _log_warnings.default)(settings, logger);
  (0, _install.default)(settings, logger);
}

function pluginInstall(program) {
  program.command('install <plugin/url>').option('-q, --quiet', 'disable all process messaging except errors').option('-s, --silent', 'disable all process messaging').option('-c, --config <path>', 'path to the config file', (0, _path.getConfig)()).option('-t, --timeout <duration>', 'length of time before failing; 0 for never fail', _settings.parseMilliseconds).option('-d, --plugin-dir <path>', 'path to the directory where plugins are stored (DEPRECATED, known to not work for all plugins)', (0, _utils.fromRoot)('plugins')).description('install a plugin', `Common examples:
  install x-pack
  install file:///Path/to/my/x-pack.zip
  install https://path.to/my/x-pack.zip`).action(processCommand);
}

module.exports = exports.default;