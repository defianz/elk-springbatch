"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const types_1 = require("../../../common/types");
const es_deprecation_logging_apis_1 = require("../es_deprecation_logging_apis");
async function getSavedObjectAttributesFromRepo(savedObjectsRepository, docType, docID) {
    try {
        return (await savedObjectsRepository.get(docType, docID)).attributes;
    }
    catch (e) {
        return null;
    }
}
async function getDeprecationLoggingStatusValue(callCluster) {
    try {
        const loggerDeprecationCallResult = await callCluster('cluster.getSettings', {
            includeDefaults: true,
        });
        return es_deprecation_logging_apis_1.isDeprecationLoggingEnabled(loggerDeprecationCallResult);
    }
    catch (e) {
        return false;
    }
}
async function fetchUpgradeAssistantMetrics(callCluster, server) {
    const { getSavedObjectsRepository } = server.savedObjects;
    const savedObjectsRepository = getSavedObjectsRepository(callCluster);
    const upgradeAssistantSOAttributes = await getSavedObjectAttributesFromRepo(savedObjectsRepository, types_1.UPGRADE_ASSISTANT_TYPE, types_1.UPGRADE_ASSISTANT_DOC_ID);
    const deprecationLoggingStatusValue = await getDeprecationLoggingStatusValue(callCluster);
    const getTelemetrySavedObject = (upgradeAssistantTelemetrySavedObjectAttrs) => {
        const defaultTelemetrySavedObject = {
            ui_open: {
                overview: 0,
                cluster: 0,
                indices: 0,
            },
            ui_reindex: {
                close: 0,
                open: 0,
                start: 0,
                stop: 0,
            },
        };
        if (!upgradeAssistantTelemetrySavedObjectAttrs) {
            return defaultTelemetrySavedObject;
        }
        const upgradeAssistantTelemetrySOAttrsKeys = Object.keys(upgradeAssistantTelemetrySavedObjectAttrs);
        const telemetryObj = defaultTelemetrySavedObject;
        upgradeAssistantTelemetrySOAttrsKeys.forEach((key) => {
            lodash_1.set(telemetryObj, key, upgradeAssistantTelemetrySavedObjectAttrs[key]);
        });
        return telemetryObj;
    };
    return {
        ...getTelemetrySavedObject(upgradeAssistantSOAttributes),
        features: {
            deprecation_logging: {
                enabled: deprecationLoggingStatusValue,
            },
        },
    };
}
exports.fetchUpgradeAssistantMetrics = fetchUpgradeAssistantMetrics;
function makeUpgradeAssistantUsageCollector(server) {
    const kbnServer = server;
    const upgradeAssistantUsageCollector = kbnServer.usage.collectorSet.makeUsageCollector({
        type: types_1.UPGRADE_ASSISTANT_TYPE,
        isReady: () => true,
        fetch: async (callCluster) => fetchUpgradeAssistantMetrics(callCluster, server),
    });
    kbnServer.usage.collectorSet.register(upgradeAssistantUsageCollector);
}
exports.makeUpgradeAssistantUsageCollector = makeUpgradeAssistantUsageCollector;
