"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const saved_objects_client_1 = require("../helpers/saved_objects_client");
const apm_telemetry_1 = require("./apm_telemetry");
function makeApmUsageCollector(core) {
    const { server } = core.http;
    const apmUsageCollector = server.usage.collectorSet.makeUsageCollector({
        type: 'apm',
        fetch: async () => {
            const savedObjectsClient = saved_objects_client_1.getSavedObjectsClient(server);
            try {
                const apmTelemetrySavedObject = await savedObjectsClient.get('apm-telemetry', apm_telemetry_1.APM_TELEMETRY_DOC_ID);
                return apmTelemetrySavedObject.attributes;
            }
            catch (err) {
                return apm_telemetry_1.createApmTelementry();
            }
        },
        isReady: () => true
    });
    server.usage.collectorSet.register(apmUsageCollector);
}
exports.makeApmUsageCollector = makeApmUsageCollector;
