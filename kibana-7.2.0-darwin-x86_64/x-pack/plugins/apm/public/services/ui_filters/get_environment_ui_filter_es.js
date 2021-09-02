"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const environment_filter_values_1 = require("../../../common/environment_filter_values");
const elasticsearch_fieldnames_1 = require("../../../common/elasticsearch_fieldnames");
function getEnvironmentUiFilterES(environment) {
    if (!environment) {
        return undefined;
    }
    if (environment === environment_filter_values_1.ENVIRONMENT_NOT_DEFINED) {
        return {
            bool: { must_not: { exists: { field: elasticsearch_fieldnames_1.SERVICE_ENVIRONMENT } } }
        };
    }
    return {
        term: { [elasticsearch_fieldnames_1.SERVICE_ENVIRONMENT]: environment }
    };
}
exports.getEnvironmentUiFilterES = getEnvironmentUiFilterES;
