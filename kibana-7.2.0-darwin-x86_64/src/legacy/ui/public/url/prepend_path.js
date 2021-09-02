"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prependPath = prependPath;

var _lodash = require("lodash");

var _url = require("url");

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

/**
 *
 * @param {string} relativePath - a relative path that must start with a "/".
 * @param {string} newPath - the new path to prefix. ex: 'xyz'
 * @return {string} the url with the basePath prepended. ex. '/xyz/app/kibana#/management'. If
 * the relative path isn't in the right format (e.g. doesn't start with a "/") the relativePath is returned
 * unchanged.
 */
function prependPath(relativePath) {
  var newPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (!relativePath || !(0, _lodash.isString)(relativePath)) {
    return relativePath;
  }

  var parsed = (0, _url.parse)(relativePath, true, true);

  if (!parsed.host && parsed.pathname) {
    if (parsed.pathname[0] === '/') {
      parsed.pathname = newPath + parsed.pathname;
    }
  }

  return (0, _url.format)({
    protocol: parsed.protocol,
    host: parsed.host,
    pathname: parsed.pathname,
    query: parsed.query,
    hash: parsed.hash
  });
}