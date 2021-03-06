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
class SavedObjectsSchema {
    constructor(schemaDefinition) {
        this.definition = schemaDefinition;
    }
    isHiddenType(type) {
        if (this.definition && this.definition.hasOwnProperty(type)) {
            return Boolean(this.definition[type].hidden);
        }
        return false;
    }
    isNamespaceAgnostic(type) {
        // if no plugins have registered a uiExports.savedObjectSchemas,
        // this.schema will be undefined, and no types are namespace agnostic
        if (!this.definition) {
            return false;
        }
        const typeSchema = this.definition[type];
        if (!typeSchema) {
            return false;
        }
        return Boolean(typeSchema.isNamespaceAgnostic);
    }
}
exports.SavedObjectsSchema = SavedObjectsSchema;
