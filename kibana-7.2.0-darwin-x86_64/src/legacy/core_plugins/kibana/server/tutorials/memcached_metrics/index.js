"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.memcachedMetricsSpecProvider = memcachedMetricsSpecProvider;

var _i18n = require("@kbn/i18n");

var _tutorial_category = require("../../../common/tutorials/tutorial_category");

var _metricbeat_instructions = require("../../../common/tutorials/metricbeat_instructions");

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
function memcachedMetricsSpecProvider(server, context) {
  const moduleName = 'memcached';
  return {
    id: 'memcachedMetrics',
    name: _i18n.i18n.translate('kbn.server.tutorials.memcachedMetrics.nameTitle', {
      defaultMessage: 'Memcached metrics'
    }),
    isBeta: false,
    category: _tutorial_category.TUTORIAL_CATEGORY.METRICS,
    shortDescription: _i18n.i18n.translate('kbn.server.tutorials.memcachedMetrics.shortDescription', {
      defaultMessage: 'Fetch internal metrics from the Memcached server.'
    }),
    longDescription: _i18n.i18n.translate('kbn.server.tutorials.memcachedMetrics.longDescription', {
      defaultMessage: 'The `memcached` Metricbeat module fetches internal metrics from Memcached. \
[Learn more]({learnMoreLink}).',
      values: {
        learnMoreLink: '{config.docs.beats.metricbeat}/metricbeat-module-memcached.html'
      }
    }),
    euiIconType: 'logoMemcached',
    artifacts: {
      application: {
        label: _i18n.i18n.translate('kbn.server.tutorials.memcachedMetrics.artifacts.application.label', {
          defaultMessage: 'Discover'
        }),
        path: '/app/kibana#/discover'
      },
      dashboards: [],
      exportedFields: {
        documentationUrl: '{config.docs.beats.metricbeat}/exported-fields-memcached.html'
      }
    },
    completionTimeMinutes: 10,
    onPrem: (0, _metricbeat_instructions.onPremInstructions)(moduleName, null, null, null, context),
    elasticCloud: (0, _metricbeat_instructions.cloudInstructions)(moduleName),
    onPremElasticCloud: (0, _metricbeat_instructions.onPremCloudInstructions)(moduleName)
  };
}