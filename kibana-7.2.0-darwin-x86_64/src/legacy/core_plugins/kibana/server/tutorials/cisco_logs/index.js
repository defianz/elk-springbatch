"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ciscoLogsSpecProvider = ciscoLogsSpecProvider;

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
function ciscoLogsSpecProvider(server, context) {
  const moduleName = 'cisco';
  const platforms = ['OSX', 'DEB', 'RPM', 'WINDOWS'];
  return {
    id: 'ciscoLogs',
    name: _i18n.i18n.translate('kbn.server.tutorials.ciscoLogs.nameTitle', {
      defaultMessage: 'Cisco'
    }),
    category: _tutorial_category.TUTORIAL_CATEGORY.SECURITY,
    shortDescription: _i18n.i18n.translate('kbn.server.tutorials.ciscoLogs.shortDescription', {
      defaultMessage: 'Collect and parse logs received from Cisco ASA firewalls.'
    }),
    longDescription: _i18n.i18n.translate('kbn.server.tutorials.ciscoLogs.longDescription', {
      defaultMessage: 'This is a module for Cisco network device’s logs. Currently \
supports the "asa" fileset for Cisco ASA firewall logs received over syslog or read from a file. \
[Learn more]({learnMoreLink}).',
      values: {
        learnMoreLink: '{config.docs.beats.filebeat}/filebeat-module-cisco.html'
      }
    }),
    //euiIconType: 'logoCisco',
    artifacts: {
      dashboards: [],
      application: {
        path: '/app/siem',
        label: _i18n.i18n.translate('kbn.server.tutorials.ciscoLogs.artifacts.dashboards.linkLabel', {
          defaultMessage: 'SIEM App'
        })
      },
      exportedFields: {
        documentationUrl: '{config.docs.beats.filebeat}/exported-fields-cisco.html'
      }
    },
    completionTimeMinutes: 10,
    previewImagePath: '/plugins/kibana/home/tutorial_resources/cisco_logs/screenshot.png',
    onPrem: (0, _filebeat_instructions.onPremInstructions)(moduleName, platforms, context),
    elasticCloud: (0, _filebeat_instructions.cloudInstructions)(moduleName, platforms),
    onPremElasticCloud: (0, _filebeat_instructions.onPremCloudInstructions)(moduleName, platforms)
  };
}