"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _i18n = require("@kbn/i18n");

var _lodash = _interopRequireDefault(require("lodash"));

var _process_function_definition = _interopRequireDefault(require("./server/lib/process_function_definition"));

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
function _default(server) {
  //var config = server.config();
  require('./server/routes/run.js')(server);

  require('./server/routes/functions.js')(server);

  require('./server/routes/validate_es.js')(server);

  const functions = require('./server/lib/load_functions')('series_functions');

  function addFunction(func) {
    _lodash.default.assign(functions, (0, _process_function_definition.default)(func));
  }

  function getFunction(name) {
    if (!functions[name]) {
      throw new Error(_i18n.i18n.translate('timelion.noFunctionErrorMessage', {
        defaultMessage: 'No such function: {name}',
        values: {
          name
        }
      }));
    }

    return functions[name];
  }

  server.plugins.timelion = {
    functions: functions,
    addFunction: addFunction,
    getFunction: getFunction
  };
  server.injectUiAppVars('timelion', () => {
    const config = server.config();
    return {
      kbnIndex: config.get('kibana.index')
    };
  });
}

module.exports = exports.default;