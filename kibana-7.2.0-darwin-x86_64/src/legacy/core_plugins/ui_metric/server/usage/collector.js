"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerUiMetricUsageCollector = registerUiMetricUsageCollector;

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
const UI_METRIC_USAGE_TYPE = 'ui_metric';

function registerUiMetricUsageCollector(server) {
  const collector = server.usage.collectorSet.makeUsageCollector({
    type: UI_METRIC_USAGE_TYPE,
    fetch: async callCluster => {
      const {
        SavedObjectsClient,
        getSavedObjectsRepository
      } = server.savedObjects;
      const {
        callWithInternalUser
      } = server.plugins.elasticsearch.getCluster('admin');
      const internalRepository = getSavedObjectsRepository(callWithInternalUser);
      const savedObjectsClient = new SavedObjectsClient(internalRepository);
      const {
        saved_objects: rawUiMetrics
      } = await savedObjectsClient.find({
        type: 'ui-metric',
        fields: ['count']
      });
      const uiMetricsByAppName = rawUiMetrics.reduce((accum, rawUiMetric) => {
        const {
          id,
          attributes: {
            count
          }
        } = rawUiMetric;
        const [appName, metricType] = id.split(':');

        if (!accum[appName]) {
          accum[appName] = [];
        }

        const pair = {
          key: metricType,
          value: count
        };
        accum[appName].push(pair);
        return accum;
      }, {});
      return uiMetricsByAppName;
    },
    isReady: () => true
  });
  server.usage.collectorSet.register(collector);
}