"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFlattenedObject = getFlattenedObject;

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
function shouldReadKeys(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
/**
 *  Flattens a deeply nested object to a map of dot-separated
 *  paths pointing to all primitive values **and arrays**
 *  from `rootValue`.
 *
 *  example:
 *    getFlattenedObject({ a: { b: 1, c: [2,3] } })
 *    // => { 'a.b': 1, 'a.c': [2,3] }
 *
 *  @param {Object} rootValue
 *  @returns {Object}
 */


function getFlattenedObject(rootValue) {
  if (!shouldReadKeys(rootValue)) {
    throw new TypeError(`Root value is not flatten-able, received ${rootValue}`);
  }

  return function flatten(acc, prefix, object) {
    for (const [key, value] of Object.entries(object)) {
      const path = prefix ? `${prefix}.${key}` : key;

      if (shouldReadKeys(value)) {
        flatten(acc, path, value);
      } else {
        acc[path] = value;
      }
    }

    return acc;
  }({}, '', rootValue);
}