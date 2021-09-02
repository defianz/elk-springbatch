"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const url_helpers_1 = require("../../components/shared/Links/url_helpers");
const constants_1 = require("./constants");
function resolveUrlParams(location, state) {
    const { processorEvent, serviceName, transactionName, transactionType, errorGroupId } = helpers_1.getPathParams(location.pathname);
    const { traceId, transactionId, detailTab, flyoutDetailTab, waterfallItemId, spanId, page, sortDirection, sortField, kuery, refreshPaused = constants_1.TIMEPICKER_DEFAULTS.refreshPaused, refreshInterval = constants_1.TIMEPICKER_DEFAULTS.refreshInterval, rangeFrom = constants_1.TIMEPICKER_DEFAULTS.rangeFrom, rangeTo = constants_1.TIMEPICKER_DEFAULTS.rangeTo, environment } = url_helpers_1.toQuery(location.search);
    return helpers_1.removeUndefinedProps({
        // date params
        start: helpers_1.getStart(state, rangeFrom),
        end: helpers_1.getEnd(state, rangeTo),
        rangeFrom,
        rangeTo,
        refreshPaused: helpers_1.toBoolean(refreshPaused),
        refreshInterval: helpers_1.toNumber(refreshInterval),
        // query params
        sortDirection,
        sortField,
        page: helpers_1.toNumber(page) || 0,
        transactionId: helpers_1.toString(transactionId),
        traceId: helpers_1.toString(traceId),
        waterfallItemId: helpers_1.toString(waterfallItemId),
        detailTab: helpers_1.toString(detailTab),
        flyoutDetailTab: helpers_1.toString(flyoutDetailTab),
        spanId: helpers_1.toNumber(spanId),
        kuery: url_helpers_1.legacyDecodeURIComponent(kuery),
        // path params
        processorEvent,
        serviceName,
        transactionType: url_helpers_1.legacyDecodeURIComponent(transactionType),
        transactionName: url_helpers_1.legacyDecodeURIComponent(transactionName),
        errorGroupId,
        // ui filters
        environment
    });
}
exports.resolveUrlParams = resolveUrlParams;
