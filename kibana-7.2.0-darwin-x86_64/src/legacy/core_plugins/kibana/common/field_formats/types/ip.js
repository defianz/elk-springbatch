"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createIpFormat = createIpFormat;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
function createIpFormat(FieldFormat) {
  var _class, _temp;

  return _temp = _class = class IpFormat extends FieldFormat {
    _convert(val) {
      if (val === undefined || val === null) return '-';
      if (!isFinite(val)) return val; // shazzam!

      return [val >>> 24, val >>> 16 & 0xFF, val >>> 8 & 0xFF, val & 0xFF].join('.');
    }

  }, _defineProperty(_class, "id", 'ip'), _defineProperty(_class, "title", 'IP Address'), _defineProperty(_class, "fieldType", 'ip'), _temp;
}