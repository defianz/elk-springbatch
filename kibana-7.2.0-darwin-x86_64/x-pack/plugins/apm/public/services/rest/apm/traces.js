"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const callApi_1 = require("../callApi");
const get_ui_filters_es_1 = require("../../ui_filters/get_ui_filters_es");
async function loadTrace({ traceId, start, end }) {
    return callApi_1.callApi({
        pathname: `/api/apm/traces/${traceId}`,
        query: {
            start,
            end
        }
    });
}
exports.loadTrace = loadTrace;
async function loadTraceList({ start, end, uiFilters }) {
    return callApi_1.callApi({
        pathname: '/api/apm/traces',
        query: {
            start,
            end,
            uiFiltersES: await get_ui_filters_es_1.getUiFiltersES(uiFilters)
        }
    });
}
exports.loadTraceList = loadTraceList;
