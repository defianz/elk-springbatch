"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const get_environment_ui_filter_es_1 = require("./get_environment_ui_filter_es");
const get_kuery_ui_filter_es_1 = require("./get_kuery_ui_filter_es");
async function getUiFiltersES(uiFilters) {
    const kuery = await get_kuery_ui_filter_es_1.getKueryUiFilterES(uiFilters.kuery);
    const environment = get_environment_ui_filter_es_1.getEnvironmentUiFilterES(uiFilters.environment);
    const filters = [kuery, environment].filter(filter => !!filter);
    return encodeURIComponent(JSON.stringify(filters));
}
exports.getUiFiltersES = getUiFiltersES;
