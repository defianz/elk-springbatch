"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAnnotationRequestParams = getAnnotationRequestParams;

var _build_request_body = require("./build_request_body");

var _get_es_shard_timeout = require("../helpers/get_es_shard_timeout");

var _get_index_pattern = require("../helpers/get_index_pattern");

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
async function getAnnotationRequestParams(req, panel, annotation, esQueryConfig, capabilities) {
  const esShardTimeout = await (0, _get_es_shard_timeout.getEsShardTimeout)(req);
  const indexPattern = annotation.index_pattern;
  const {
    indexPatternObject,
    indexPatternString
  } = await (0, _get_index_pattern.getIndexPatternObject)(req, indexPattern);
  const request = (0, _build_request_body.buildAnnotationRequest)(req, panel, annotation, esQueryConfig, indexPatternObject, capabilities);
  return {
    index: indexPatternString,
    body: { ...request,
      timeout: esShardTimeout > 0 ? `${esShardTimeout}ms` : undefined
    }
  };
}