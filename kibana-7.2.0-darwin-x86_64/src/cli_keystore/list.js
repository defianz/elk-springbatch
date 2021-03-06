"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.list = list;
exports.listCli = listCli;

var _logger = _interopRequireDefault(require("../cli_plugin/lib/logger"));

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
function list(keystore, command, options = {}) {
  const logger = new _logger.default(options);

  if (!keystore.exists()) {
    return logger.error('ERROR: Kibana keystore not found. Use \'create\' command to create one.');
  }

  const keys = keystore.keys();
  logger.log(keys.join('\n'));
}

function listCli(program, keystore) {
  program.command('list').description('List entries in the keystore').option('-s, --silent', 'prevent all logging').action(list.bind(null, keystore));
}