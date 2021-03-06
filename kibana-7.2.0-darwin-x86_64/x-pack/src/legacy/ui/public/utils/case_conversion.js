"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// TODO: This file is copied from src/legacy/utils/case_conversion.ts
// because TS-imports from utils in ui are currently not possible.
// When the build process is updated, this file can be removed
const lodash_1 = tslib_1.__importDefault(require("lodash"));
function keysToSnakeCaseShallow(object) {
    return lodash_1.default.mapKeys(object, (value, key) => {
        return lodash_1.default.snakeCase(key);
    });
}
exports.keysToSnakeCaseShallow = keysToSnakeCaseShallow;
function keysToCamelCaseShallow(object) {
    return lodash_1.default.mapKeys(object, (value, key) => {
        return lodash_1.default.camelCase(key);
    });
}
exports.keysToCamelCaseShallow = keysToCamelCaseShallow;
