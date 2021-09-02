"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const apm_telemetry_1 = require("../lib/apm_telemetry");
const errors_1 = require("../routes/errors");
const metrics_1 = require("../routes/metrics");
const services_1 = require("../routes/services");
const traces_1 = require("../routes/traces");
const transaction_groups_1 = require("../routes/transaction_groups");
const ui_filters_1 = require("../routes/ui_filters");
const index_pattern_1 = require("../routes/index_pattern");
class Plugin {
    setup(core) {
        ui_filters_1.initUIFiltersApi(core);
        transaction_groups_1.initTransactionGroupsApi(core);
        traces_1.initTracesApi(core);
        services_1.initServicesApi(core);
        errors_1.initErrorsApi(core);
        metrics_1.initMetricsApi(core);
        index_pattern_1.initIndexPatternApi(core);
        apm_telemetry_1.makeApmUsageCollector(core);
    }
}
exports.Plugin = Plugin;
