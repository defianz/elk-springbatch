"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INTERVAL_STRING_RE = exports.GTE_INTERVAL_RE = void 0;

var _datemath = _interopRequireDefault(require("@elastic/datemath"));

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
const GTE_INTERVAL_RE = new RegExp(`^>=([\\d\\.]+\\s*(${_datemath.default.units.join('|')}))$`);
exports.GTE_INTERVAL_RE = GTE_INTERVAL_RE;
const INTERVAL_STRING_RE = new RegExp(`^([\\d\\.]+)\\s*(${_datemath.default.units.join('|')})$`);
exports.INTERVAL_STRING_RE = INTERVAL_STRING_RE;