"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseSheet;

var _i18n = require("@kbn/i18n");

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _lodash = _interopRequireDefault(require("lodash"));

var _pegjs = _interopRequireDefault(require("pegjs"));

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
const grammar = _fs.default.readFileSync(_path.default.resolve(__dirname, '../../../public/chain.peg'), 'utf8');

const Parser = _pegjs.default.buildParser(grammar);

function parseSheet(sheet) {
  return _lodash.default.map(sheet, function (plot) {
    try {
      return Parser.parse(plot).tree;
    } catch (e) {
      if (e.expected) {
        throw new Error(_i18n.i18n.translate('timelion.serverSideErrors.sheetParseErrorMessage', {
          defaultMessage: 'Expected: {expectedDescription} at character {column}',
          description: 'This would be for example: "Expected: a quote at character 5"',
          values: {
            expectedDescription: e.expected[0].description,
            column: e.column
          }
        }));
      } else {
        throw e;
      }
    }
  });
}

module.exports = exports.default;