"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../context/UrlParamsContext/constants");
const url_helpers_1 = require("./url_helpers");
function getTimepickerRisonData(currentSearch) {
    const currentQuery = url_helpers_1.toQuery(currentSearch);
    const nextQuery = {
        ...constants_1.TIMEPICKER_DEFAULTS,
        ...currentQuery
    };
    return {
        time: {
            from: encodeURIComponent(nextQuery.rangeFrom),
            to: encodeURIComponent(nextQuery.rangeTo)
        },
        refreshInterval: {
            pause: String(nextQuery.refreshPaused),
            value: String(nextQuery.refreshInterval)
        }
    };
}
exports.getTimepickerRisonData = getTimepickerRisonData;
