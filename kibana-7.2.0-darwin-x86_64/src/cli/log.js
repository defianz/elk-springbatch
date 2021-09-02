"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _color = require("./color");

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
const log = _lodash.default.restParam(function (color, label, rest1) {
  console.log.apply(console, [color(` ${_lodash.default.trim(label)} `)].concat(rest1));
});

class Log {
  constructor(quiet, silent) {
    this.good = quiet || silent ? _lodash.default.noop : _lodash.default.partial(log, _color.green);
    this.warn = quiet || silent ? _lodash.default.noop : _lodash.default.partial(log, _color.yellow);
    this.bad = silent ? _lodash.default.noop : _lodash.default.partial(log, _color.red);
  }

}

exports.default = Log;
module.exports = exports.default;