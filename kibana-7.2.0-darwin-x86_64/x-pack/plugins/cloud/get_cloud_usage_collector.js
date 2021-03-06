"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
function createCollectorFetch(server) {
    return async function fetchUsageStats() {
        const { id } = server.config().get(`xpack.cloud`);
        return {
            isCloudEnabled: !!id,
        };
    };
}
exports.createCollectorFetch = createCollectorFetch;
/*
 * @param {Object} server
 * @return {Object} kibana usage stats type collection object
 */
function getCloudUsageCollector(server) {
    const { collectorSet } = server.usage;
    return collectorSet.makeUsageCollector({
        type: constants_1.KIBANA_CLOUD_STATS_TYPE,
        isReady: () => true,
        fetch: createCollectorFetch(server),
    });
}
exports.getCloudUsageCollector = getCloudUsageCollector;
