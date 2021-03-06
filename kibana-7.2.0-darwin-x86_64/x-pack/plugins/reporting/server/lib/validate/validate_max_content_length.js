"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const numeral_1 = tslib_1.__importDefault(require("@elastic/numeral"));
const lodash_1 = require("lodash");
const KIBANA_MAX_SIZE_BYTES_PATH = 'xpack.reporting.csv.maxSizeBytes';
const ES_MAX_SIZE_BYTES_PATH = 'http.max_content_length';
async function validateMaxContentLength(server, logger) {
    const config = server.config();
    const { callWithInternalUser } = server.plugins.elasticsearch.getCluster('data');
    const elasticClusterSettingsResponse = await callWithInternalUser('cluster.getSettings', {
        includeDefaults: true,
    });
    const { persistent, transient, defaults: defaultSettings } = elasticClusterSettingsResponse;
    const elasticClusterSettings = lodash_1.defaults({}, persistent, transient, defaultSettings);
    const elasticSearchMaxContent = lodash_1.get(elasticClusterSettings, 'http.max_content_length', '100mb');
    const elasticSearchMaxContentBytes = numeral_1.default().unformat(elasticSearchMaxContent.toUpperCase());
    const kibanaMaxContentBytes = config.get(KIBANA_MAX_SIZE_BYTES_PATH);
    if (kibanaMaxContentBytes > elasticSearchMaxContentBytes) {
        logger.warning(`${KIBANA_MAX_SIZE_BYTES_PATH} (${kibanaMaxContentBytes}) is higher than ElasticSearch's ${ES_MAX_SIZE_BYTES_PATH} (${elasticSearchMaxContentBytes}). ` +
            `Please set ${ES_MAX_SIZE_BYTES_PATH} in ElasticSearch to match, or lower your ${KIBANA_MAX_SIZE_BYTES_PATH} in Kibana to avoid this warning.`);
    }
}
exports.validateMaxContentLength = validateMaxContentLength;
