"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.importSavedObjects = importSavedObjects;

var _collect_saved_objects = require("./collect_saved_objects");

var _extract_errors = require("./extract_errors");

var _validate_references = require("./validate_references");

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
async function importSavedObjects({
  readStream,
  objectLimit,
  overwrite,
  savedObjectsClient,
  supportedTypes
}) {
  let errorAccumulator = []; // Get the objects to import

  const {
    errors: collectorErrors,
    collectedObjects: objectsFromStream
  } = await (0, _collect_saved_objects.collectSavedObjects)({
    readStream,
    objectLimit,
    supportedTypes
  });
  errorAccumulator = [...errorAccumulator, ...collectorErrors]; // Validate references

  const {
    filteredObjects,
    errors: validationErrors
  } = await (0, _validate_references.validateReferences)(objectsFromStream, savedObjectsClient);
  errorAccumulator = [...errorAccumulator, ...validationErrors]; // Exit early if no objects to import

  if (filteredObjects.length === 0) {
    return {
      success: errorAccumulator.length === 0,
      successCount: 0,
      ...(errorAccumulator.length ? {
        errors: errorAccumulator
      } : {})
    };
  } // Create objects in bulk


  const bulkCreateResult = await savedObjectsClient.bulkCreate(filteredObjects, {
    overwrite
  });
  errorAccumulator = [...errorAccumulator, ...(0, _extract_errors.extractErrors)(bulkCreateResult.saved_objects, filteredObjects)];
  return {
    success: errorAccumulator.length === 0,
    successCount: bulkCreateResult.saved_objects.filter(obj => !obj.error).length,
    ...(errorAccumulator.length ? {
      errors: errorAccumulator
    } : {})
  };
}