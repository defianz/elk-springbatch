"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiSearchRequest = void 0;

var _abstract_request = require("./abstract_request");

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
const SEARCH_METHOD = 'msearch';

class MultiSearchRequest extends _abstract_request.AbstractSearchRequest {
  async search(searches) {
    const includeFrozen = await this.req.getUiSettingsService().get('search:includeFrozen');
    const multiSearchBody = searches.reduce((acc, {
      body,
      index
    }) => [...acc, {
      index,
      ignoreUnavailable: true
    }, body], []);
    const {
      responses
    } = await this.callWithRequest(this.req, SEARCH_METHOD, {
      body: multiSearchBody,
      rest_total_hits_as_int: true,
      ignore_throttled: !includeFrozen
    });
    return responses;
  }

}

exports.MultiSearchRequest = MultiSearchRequest;