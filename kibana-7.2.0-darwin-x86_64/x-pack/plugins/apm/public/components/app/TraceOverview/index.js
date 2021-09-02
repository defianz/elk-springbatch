"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = tslib_1.__importDefault(require("react"));
const useFetcher_1 = require("../../../hooks/useFetcher");
const traces_1 = require("../../../services/rest/apm/traces");
const TraceList_1 = require("./TraceList");
const useUrlParams_1 = require("../../../hooks/useUrlParams");
function TraceOverview() {
    const { urlParams, uiFilters } = useUrlParams_1.useUrlParams();
    const { start, end } = urlParams;
    const { status, data = [] } = useFetcher_1.useFetcher(() => {
        if (start && end) {
            return traces_1.loadTraceList({ start, end, uiFilters });
        }
    }, [start, end, uiFilters]);
    return (react_1.default.createElement(eui_1.EuiPanel, null,
        react_1.default.createElement(TraceList_1.TraceList, { items: data, isLoading: status === useFetcher_1.FETCH_STATUS.LOADING })));
}
exports.TraceOverview = TraceOverview;
