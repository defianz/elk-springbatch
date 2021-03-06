"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flatConcatValuesAtType = void 0;

var _lib = require("./lib");

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
 *  Reducer that merges specs by concatenating the values of
 *  all keys in accumulator and spec with the same logic as concat
 *  @param  {[type]} initial [description]
 *  @return {[type]}         [description]
 */
const flatConcatValuesAtType = (0, _lib.createTypeReducer)((objectA, objectB) => (0, _lib.mergeWith)(objectA || {}, objectB || {}, _lib.flatConcat));
exports.flatConcatValuesAtType = flatConcatValuesAtType;