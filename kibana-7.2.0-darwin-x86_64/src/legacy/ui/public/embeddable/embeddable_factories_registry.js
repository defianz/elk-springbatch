"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmbeddableFactoriesRegistryProvider = void 0;

var _registry = require("../registry/_registry");

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
// @ts-ignore: implicit any for JS file

/**
 * Registry of functions (EmbeddableFactoryProviders) which return an EmbeddableFactory.
 */
var EmbeddableFactoriesRegistryProvider = (0, _registry.uiRegistry)({
  index: ['name'],
  name: 'embeddableFactories'
});
exports.EmbeddableFactoriesRegistryProvider = EmbeddableFactoriesRegistryProvider;