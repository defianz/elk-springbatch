"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.absoluteToParsedUrl = absoluteToParsedUrl;

var _url = require("url");

var _extract_app_path_and_id = require("./extract_app_path_and_id");

var _kibana_parsed_url = require("./kibana_parsed_url");

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
 * @param absoluteUrl - an absolute url, e.g. https://localhost:5601/gra/app/kibana#/visualize/edit/viz_id?hi=bye
 * @param basePath - An optional base path for kibana. If supplied, should start with a "/".
 * e.g. in https://localhost:5601/gra/app/kibana#/visualize/edit/viz_id the basePath is
 * "/gra".
 * @return {KibanaParsedUrl}
 */
function absoluteToParsedUrl(absoluteUrl) {
  var basePath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var _extractAppPathAndId = (0, _extract_app_path_and_id.extractAppPathAndId)(absoluteUrl, basePath),
      appPath = _extractAppPathAndId.appPath,
      appId = _extractAppPathAndId.appId;

  var _parse = (0, _url.parse)(absoluteUrl),
      hostname = _parse.hostname,
      port = _parse.port,
      protocol = _parse.protocol;

  return new _kibana_parsed_url.KibanaParsedUrl({
    basePath: basePath,
    appId: appId,
    appPath: appPath,
    hostname: hostname,
    port: port,
    protocol: protocol
  });
}