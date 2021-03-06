"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var apm_telemetry_1 = require("./apm_telemetry");
exports.storeApmTelemetry = apm_telemetry_1.storeApmTelemetry;
exports.createApmTelementry = apm_telemetry_1.createApmTelementry;
exports.APM_TELEMETRY_DOC_ID = apm_telemetry_1.APM_TELEMETRY_DOC_ID;
var make_apm_usage_collector_1 = require("./make_apm_usage_collector");
exports.makeApmUsageCollector = make_apm_usage_collector_1.makeApmUsageCollector;
