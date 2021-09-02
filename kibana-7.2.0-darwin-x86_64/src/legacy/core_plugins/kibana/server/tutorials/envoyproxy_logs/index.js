"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.envoyproxyLogsSpecProvider = envoyproxyLogsSpecProvider;

var _i18n = require("@kbn/i18n");

var _tutorial_category = require("../../../common/tutorials/tutorial_category");

var _filebeat_instructions = require("../../../common/tutorials/filebeat_instructions");

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
function envoyproxyLogsSpecProvider(server, context) {
  const moduleName = 'envoyproxy';
  const platforms = ['OSX', 'DEB', 'RPM', 'WINDOWS'];
  return {
    id: 'envoyproxyLogs',
    name: _i18n.i18n.translate('kbn.server.tutorials.envoyproxyLogs.nameTitle', {
      defaultMessage: 'Envoyproxy'
    }),
    category: _tutorial_category.TUTORIAL_CATEGORY.SECURITY,
    shortDescription: _i18n.i18n.translate('kbn.server.tutorials.envoyproxyLogs.shortDescription', {
      defaultMessage: 'Collect and parse logs received from the Envoy proxy.'
    }),
    longDescription: _i18n.i18n.translate('kbn.server.tutorials.envoyproxyLogs.longDescription', {
      defaultMessage: 'This is a filebeat module for [Envoy proxy access log](https://www.envoyproxy.io/docs/envoy/v1.10.0/configuration/access_log). \
It supports both standalone deployment and Envoy proxy deployment in Kubernetes. \
[Learn more]({learnMoreLink}).',
      values: {
        learnMoreLink: '{config.docs.beats.filebeat}/filebeat-module-envoyproxy.html'
      }
    }),
    //euiIconType: 'logoCisco',
    artifacts: {
      dashboards: [],
      application: {
        path: '/app/siem',
        label: _i18n.i18n.translate('kbn.server.tutorials.envoyproxyLogs.artifacts.dashboards.linkLabel', {
          defaultMessage: 'SIEM App'
        })
      },
      exportedFields: {
        documentationUrl: '{config.docs.beats.filebeat}/exported-fields-envoyproxy.html'
      }
    },
    completionTimeMinutes: 10,
    previewImagePath: '/plugins/kibana/home/tutorial_resources/envoyproxy_logs/screenshot.png',
    onPrem: (0, _filebeat_instructions.onPremInstructions)(moduleName, platforms, context),
    elasticCloud: (0, _filebeat_instructions.cloudInstructions)(moduleName, platforms),
    onPremElasticCloud: (0, _filebeat_instructions.onPremCloudInstructions)(moduleName, platforms)
  };
}