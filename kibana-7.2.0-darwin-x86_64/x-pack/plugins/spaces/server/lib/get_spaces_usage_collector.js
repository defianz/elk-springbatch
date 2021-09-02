"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
// @ts-ignore
const constants_1 = require("../../../monitoring/common/constants");
const constants_2 = require("../../common/constants");
/**
 *
 * @param callCluster
 * @param server
 * @param {boolean} spacesAvailable
 * @return {UsageStats}
 */
async function getSpacesUsage(callCluster, server, spacesAvailable) {
    if (!spacesAvailable) {
        return {};
    }
    const index = server.config().get('kibana.index');
    const knownFeatureIds = server.plugins.xpack_main.getFeatures().map(feature => feature.id);
    const resp = await callCluster('search', {
        index,
        body: {
            track_total_hits: true,
            query: {
                term: {
                    type: {
                        value: 'space',
                    },
                },
            },
            aggs: {
                disabledFeatures: {
                    terms: {
                        field: 'space.disabledFeatures',
                        include: knownFeatureIds,
                        size: knownFeatureIds.length,
                    },
                },
            },
            size: 0,
        },
    });
    const { hits, aggregations } = resp;
    const count = lodash_1.get(hits, 'total.value', 0);
    const disabledFeatureBuckets = lodash_1.get(aggregations, 'disabledFeatures.buckets', []);
    const initialCounts = knownFeatureIds.reduce((acc, featureId) => ({ ...acc, [featureId]: 0 }), {});
    const disabledFeatures = disabledFeatureBuckets.reduce((acc, { key, doc_count }) => {
        return {
            ...acc,
            [key]: doc_count,
        };
    }, initialCounts);
    const usesFeatureControls = Object.values(disabledFeatures).some(disabledSpaceCount => disabledSpaceCount > 0);
    return {
        count,
        usesFeatureControls,
        disabledFeatures,
    };
}
/*
 * @param {Object} server
 * @return {Object} kibana usage stats type collection object
 */
function getSpacesUsageCollector(server) {
    const { collectorSet } = server.usage;
    return collectorSet.makeUsageCollector({
        type: constants_2.KIBANA_SPACES_STATS_TYPE,
        isReady: () => true,
        fetch: async (callCluster) => {
            const xpackInfo = server.plugins.xpack_main.info;
            const config = server.config();
            const available = xpackInfo && xpackInfo.isAvailable(); // some form of spaces is available for all valid licenses
            const enabled = config.get('xpack.spaces.enabled');
            const spacesAvailableAndEnabled = available && enabled;
            const usageStats = await getSpacesUsage(callCluster, server, spacesAvailableAndEnabled);
            return {
                available,
                enabled: spacesAvailableAndEnabled,
                ...usageStats,
            };
        },
        /*
         * Format the response data into a model for internal upload
         * 1. Make this data part of the "kibana_stats" type
         * 2. Organize the payload in the usage.xpack.spaces namespace of the data payload
         */
        formatForBulkUpload: (result) => {
            return {
                type: constants_1.KIBANA_STATS_TYPE_MONITORING,
                payload: {
                    usage: {
                        spaces: result,
                    },
                },
            };
        },
    });
}
exports.getSpacesUsageCollector = getSpacesUsageCollector;
