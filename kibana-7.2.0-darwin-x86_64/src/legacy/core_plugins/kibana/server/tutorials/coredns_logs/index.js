"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.corednsLogsSpecProvider = corednsLogsSpecProvider;

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
function corednsLogsSpecProvider(server, context) {
  const moduleName = 'coredns';
  const platforms = ['OSX', 'DEB', 'RPM'];
  return {
    id: 'corednsLogs',
    name: _i18n.i18n.translate('kbn.server.tutorials.corednsLogs.nameTitle', {
      defaultMessage: 'CoreDNS logs'
    }),
    category: _tutorial_category.TUTORIAL_CATEGORY.SECURITY,
    shortDescription: _i18n.i18n.translate('kbn.server.tutorials.corednsLogs.shortDescription', {
      defaultMessage: 'Collect the logs created by Coredns.'
    }),
    longDescription: _i18n.i18n.translate('kbn.server.tutorials.corednsLogs.longDescription', {
      defaultMessage: 'The `coredns` Filebeat module collects the logs from \
[CoreDNS](https://coredns.io/manual/toc/). \
[Learn more]({learnMoreLink}).',
      values: {
        learnMoreLink: '{config.docs.beats.filebeat}/filebeat-module-coredns.html'
      }
    }),
    //TODO: euiIconType: 'logoCoredns',
    artifacts: {
      dashboards: [{
        id: '53aa1f70-443e-11e9-8548-ab7fbe04f038',
        linkLabel: _i18n.i18n.translate('kbn.server.tutorials.corednsLogs.artifacts.dashboards.linkLabel', {
          defaultMessage: 'CoreDNS logs dashboard'
        }),
        isOverview: true
      }],
      exportedFields: {
        documentationUrl: '{config.docs.beats.filebeat}/exported-fields-coredns.html'
      }
    },
    completionTimeMinutes: 10,
    previewImagePath: '/plugins/kibana/home/tutorial_resources/coredns_logs/screenshot.jpg',
    onPrem: (0, _filebeat_instructions.onPremInstructions)(moduleName, platforms, context),
    elasticCloud: (0, _filebeat_instructions.cloudInstructions)(moduleName, platforms),
    onPremElasticCloud: (0, _filebeat_instructions.onPremCloudInstructions)(moduleName, platforms)
  };
}