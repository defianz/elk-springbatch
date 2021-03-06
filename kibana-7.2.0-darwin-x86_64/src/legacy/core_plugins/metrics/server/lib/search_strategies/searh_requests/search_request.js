"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchRequest = void 0;

var _abstract_request = require("./abstract_request");

var _multi_search_request = require("./multi_search_request");

var _single_search_request = require("./single_search_request");

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
class SearchRequest extends _abstract_request.AbstractSearchRequest {
  getSearchRequestType(searches) {
    const isMultiSearch = Array.isArray(searches) && searches.length > 1;
    const SearchRequest = isMultiSearch ? _multi_search_request.MultiSearchRequest : _single_search_request.SingleSearchRequest;
    return new SearchRequest(this.req, this.callWithRequest);
  }

  async search(options) {
    const concreteSearchRequest = this.getSearchRequestType(options);
    return concreteSearchRequest.search(options);
  }

}

exports.SearchRequest = SearchRequest;