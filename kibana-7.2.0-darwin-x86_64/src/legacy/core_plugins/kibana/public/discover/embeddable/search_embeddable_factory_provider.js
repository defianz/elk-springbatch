"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchEmbeddableFactoryProvider = searchEmbeddableFactoryProvider;

var _embeddable_factories_registry = require("ui/embeddable/embeddable_factories_registry");

var _search_embeddable_factory = require("./search_embeddable_factory");

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
function searchEmbeddableFactoryProvider(Private) {
  var SearchEmbeddableFactoryProvider = function SearchEmbeddableFactoryProvider($compile, $rootScope, savedSearches) {
    return new _search_embeddable_factory.SearchEmbeddableFactory($compile, $rootScope, savedSearches);
  };

  return Private(SearchEmbeddableFactoryProvider);
}

_embeddable_factories_registry.EmbeddableFactoriesRegistryProvider.register(searchEmbeddableFactoryProvider);