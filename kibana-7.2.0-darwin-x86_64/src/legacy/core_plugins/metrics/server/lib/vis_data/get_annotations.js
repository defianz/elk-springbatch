"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAnnotations = getAnnotations;

var _annotations = require("./response_processors/annotations/");

var _get_request_params = require("./annorations/get_request_params");

var _timestamp = require("./helpers/timestamp");

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
function validAnnotation(annotation) {
  return annotation.index_pattern && annotation.time_field && annotation.fields && annotation.icon && annotation.template && !annotation.hidden;
}

async function getAnnotations({
  req,
  esQueryConfig,
  searchStrategy,
  panel,
  capabilities,
  series
}) {
  const searchRequest = searchStrategy.getSearchRequest(req);
  const annotations = panel.annotations.filter(validAnnotation);
  const lastSeriesTimestamp = (0, _timestamp.getLastSeriesTimestamp)(series);
  const handleAnnotationResponseBy = (0, _annotations.handleAnnotationResponse)(lastSeriesTimestamp);
  const bodiesPromises = annotations.map(annotation => (0, _get_request_params.getAnnotationRequestParams)(req, panel, annotation, esQueryConfig, capabilities));
  const searches = (await Promise.all(bodiesPromises)).reduce((acc, items) => acc.concat(items), []);
  if (!searches.length) return {
    responses: []
  };

  try {
    const data = await searchRequest.search(searches);
    return annotations.reduce((acc, annotation, index) => {
      acc[annotation.id] = handleAnnotationResponseBy(data[index], annotation);
      return acc;
    }, {});
  } catch (error) {
    if (error.message === 'missing-indices') return {
      responses: []
    };
    throw error;
  }
}