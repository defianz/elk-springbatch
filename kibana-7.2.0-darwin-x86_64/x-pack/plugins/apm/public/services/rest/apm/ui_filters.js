"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const callApi_1 = require("../callApi");
async function loadEnvironmentsFilter({ serviceName, start, end }) {
    return callApi_1.callApi({
        pathname: '/api/apm/ui_filters/environments',
        query: {
            start,
            end,
            serviceName
        }
    });
}
exports.loadEnvironmentsFilter = loadEnvironmentsFilter;
