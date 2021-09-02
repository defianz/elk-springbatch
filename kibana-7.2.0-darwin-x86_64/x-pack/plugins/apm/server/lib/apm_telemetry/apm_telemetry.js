"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const agent_name_1 = require("../../../common/agent_name");
const saved_objects_client_1 = require("../helpers/saved_objects_client");
exports.APM_TELEMETRY_DOC_ID = 'apm-telemetry';
function createApmTelementry(agentNames = []) {
    const validAgentNames = agentNames.filter(agent_name_1.isAgentName);
    return {
        has_any_services: validAgentNames.length > 0,
        services_per_agent: lodash_1.countBy(validAgentNames)
    };
}
exports.createApmTelementry = createApmTelementry;
function storeApmTelemetry(server, apmTelemetry) {
    const savedObjectsClient = saved_objects_client_1.getSavedObjectsClient(server);
    savedObjectsClient.create('apm-telemetry', apmTelemetry, {
        id: exports.APM_TELEMETRY_DOC_ID,
        overwrite: true
    });
}
exports.storeApmTelemetry = storeApmTelemetry;
