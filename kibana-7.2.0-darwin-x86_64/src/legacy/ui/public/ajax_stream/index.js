"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ajaxStream = ajaxStream;
Object.defineProperty(exports, "BatchOpts", {
  enumerable: true,
  get: function get() {
    return _ajax_stream.BatchOpts;
  }
});

var _chrome = _interopRequireDefault(require("ui/chrome"));

var _metadata = require("ui/metadata");

var _ajax_stream = require("./ajax_stream");

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
var defaultHeaders = {
  'Content-Type': 'application/json',
  'kbn-version': _metadata.metadata.version
};

function ajaxStream(opts) {
  return (0, _ajax_stream.ajaxStream)(_chrome.default.getBasePath(), defaultHeaders, new XMLHttpRequest(), opts);
}