"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usage = usage;

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
const SAVED_OBJECT_ID = 'sample-data-telemetry';

function usage(request) {
  const {
    server
  } = request;

  const handleIncrementError = err => {
    if (err != null) {
      server.log(['debug', 'sample_data', 'telemetry'], err.stack);
    }

    server.log(['warning', 'sample_data', 'telemetry'], `saved objects repository incrementCounter encountered an error: ${err}`);
  };

  const {
    savedObjects: {
      getSavedObjectsRepository
    }
  } = server;
  const {
    callWithInternalUser
  } = server.plugins.elasticsearch.getCluster('admin');
  const internalRepository = getSavedObjectsRepository(callWithInternalUser);
  return {
    addInstall: async dataSet => {
      try {
        internalRepository.incrementCounter(SAVED_OBJECT_ID, dataSet, `installCount`);
      } catch (err) {
        handleIncrementError(err);
      }
    },
    addUninstall: async dataSet => {
      try {
        internalRepository.incrementCounter(SAVED_OBJECT_ID, dataSet, `unInstallCount`);
      } catch (err) {
        handleIncrementError(err);
      }
    }
  };
}