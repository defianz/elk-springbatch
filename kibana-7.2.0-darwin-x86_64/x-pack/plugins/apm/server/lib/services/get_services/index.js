"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const get_agent_status_1 = require("./get_agent_status");
const get_legacy_data_status_1 = require("./get_legacy_data_status");
const get_services_items_1 = require("./get_services_items");
async function getServices(setup) {
    const items = await get_services_items_1.getServicesItems(setup);
    const hasLegacyData = await get_legacy_data_status_1.getLegacyDataStatus(setup);
    // conditionally check for historical data if no services were found in the current time range
    const noDataInCurrentTimeRange = lodash_1.isEmpty(items);
    let hasHistorialAgentData = true;
    if (noDataInCurrentTimeRange) {
        hasHistorialAgentData = await get_agent_status_1.getAgentStatus(setup);
    }
    return {
        items,
        hasHistoricalData: hasHistorialAgentData,
        hasLegacyData
    };
}
exports.getServices = getServices;
