"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const callApi_1 = require("../callApi");
const get_ui_filters_es_1 = require("../../ui_filters/get_ui_filters_es");
async function loadErrorGroupList({ serviceName, start, end, uiFilters, sortField, sortDirection }) {
    return callApi_1.callApi({
        pathname: `/api/apm/services/${serviceName}/errors`,
        query: {
            start,
            end,
            sortField,
            sortDirection,
            uiFiltersES: await get_ui_filters_es_1.getUiFiltersES(uiFilters)
        }
    });
}
exports.loadErrorGroupList = loadErrorGroupList;
async function loadErrorGroupDetails({ serviceName, start, end, uiFilters, errorGroupId }) {
    return callApi_1.callApi({
        pathname: `/api/apm/services/${serviceName}/errors/${errorGroupId}`,
        query: {
            start,
            end,
            uiFiltersES: await get_ui_filters_es_1.getUiFiltersES(uiFilters)
        }
    });
}
exports.loadErrorGroupDetails = loadErrorGroupDetails;
async function loadErrorDistribution({ serviceName, start, end, uiFilters, errorGroupId }) {
    const pathname = errorGroupId
        ? `/api/apm/services/${serviceName}/errors/${errorGroupId}/distribution`
        : `/api/apm/services/${serviceName}/errors/distribution`;
    return callApi_1.callApi({
        pathname,
        query: {
            start,
            end,
            uiFiltersES: await get_ui_filters_es_1.getUiFiltersES(uiFilters)
        }
    });
}
exports.loadErrorDistribution = loadErrorDistribution;
