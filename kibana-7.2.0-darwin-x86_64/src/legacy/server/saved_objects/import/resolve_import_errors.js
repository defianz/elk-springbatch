"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveImportErrors = resolveImportErrors;

var _collect_saved_objects = require("./collect_saved_objects");

var _create_objects_filter = require("./create_objects_filter");

var _extract_errors = require("./extract_errors");

var _split_overwrites = require("./split_overwrites");

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
async function resolveImportErrors({
  readStream,
  objectLimit,
  retries,
  savedObjectsClient,
  supportedTypes
}) {
  let successCount = 0;
  let errorAccumulator = [];
  const filter = (0, _create_objects_filter.createObjectsFilter)(retries); // Get the objects to resolve errors

  const {
    errors: collectorErrors,
    collectedObjects: objectsToResolve
  } = await (0, _collect_saved_objects.collectSavedObjects)({
    readStream,
    objectLimit,
    filter,
    supportedTypes
  });
  errorAccumulator = [...errorAccumulator, ...collectorErrors]; // Create a map of references to replace for each object to avoid iterating through
  // retries for every object to resolve

  const retriesReferencesMap = new Map();

  for (const retry of retries) {
    const map = {};

    for (const {
      type,
      from,
      to
    } of retry.replaceReferences) {
      map[`${type}:${from}`] = to;
    }

    retriesReferencesMap.set(`${retry.type}:${retry.id}`, map);
  } // Replace references


  for (const savedObject of objectsToResolve) {
    const refMap = retriesReferencesMap.get(`${savedObject.type}:${savedObject.id}`);

    if (!refMap) {
      continue;
    }

    for (const reference of savedObject.references || []) {
      if (refMap[`${reference.type}:${reference.id}`]) {
        reference.id = refMap[`${reference.type}:${reference.id}`];
      }
    }
  } // Validate references


  const {
    filteredObjects,
    errors: validationErrors
  } = await (0, _validate_references.validateReferences)(objectsToResolve, savedObjectsClient);
  errorAccumulator = [...errorAccumulator, ...validationErrors]; // Bulk create in two batches, overwrites and non-overwrites

  const {
    objectsToOverwrite,
    objectsToNotOverwrite
  } = (0, _split_overwrites.splitOverwrites)(filteredObjects, retries);

  if (objectsToOverwrite.length) {
    const bulkCreateResult = await savedObjectsClient.bulkCreate(objectsToOverwrite, {
      overwrite: true
    });
    errorAccumulator = [...errorAccumulator, ...(0, _extract_errors.extractErrors)(bulkCreateResult.saved_objects, objectsToOverwrite)];
    successCount += bulkCreateResult.saved_objects.filter(obj => !obj.error).length;
  }

  if (objectsToNotOverwrite.length) {
    const bulkCreateResult = await savedObjectsClient.bulkCreate(objectsToNotOverwrite);
    errorAccumulator = [...errorAccumulator, ...(0, _extract_errors.extractErrors)(bulkCreateResult.saved_objects, objectsToNotOverwrite)];
    successCount += bulkCreateResult.saved_objects.filter(obj => !obj.error).length;
  }

  return {
    successCount,
    success: errorAccumulator.length === 0,
    ...(errorAccumulator.length ? {
      errors: errorAccumulator
    } : {})
  };
}