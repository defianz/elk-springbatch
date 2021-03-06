"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const ml_telemetry_1 = require("./ml_telemetry");
function makeMlUsageCollector(server) {
    const mlUsageCollector = server.usage.collectorSet.makeUsageCollector({
        type: 'ml',
        isReady: () => true,
        fetch: async () => {
            try {
                const savedObjectsClient = ml_telemetry_1.getSavedObjectsClient(server);
                const mlTelemetrySavedObject = (await savedObjectsClient.get('ml-telemetry', ml_telemetry_1.ML_TELEMETRY_DOC_ID));
                return mlTelemetrySavedObject.attributes;
            }
            catch (err) {
                return ml_telemetry_1.createMlTelemetry();
            }
        },
    });
    server.usage.collectorSet.register(mlUsageCollector);
}
exports.makeMlUsageCollector = makeMlUsageCollector;
