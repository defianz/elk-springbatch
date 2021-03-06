"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../../graphql/types");
const count_1 = require("./count");
const cpu_1 = require("./cpu");
const load_1 = require("./load");
const log_rate_1 = require("./log_rate");
const memory_1 = require("./memory");
const rx_1 = require("./rx");
const tx_1 = require("./tx");
exports.metricAggregationCreators = {
    [types_1.InfraSnapshotMetricType.count]: count_1.count,
    [types_1.InfraSnapshotMetricType.cpu]: cpu_1.cpu,
    [types_1.InfraSnapshotMetricType.memory]: memory_1.memory,
    [types_1.InfraSnapshotMetricType.rx]: rx_1.rx,
    [types_1.InfraSnapshotMetricType.tx]: tx_1.tx,
    [types_1.InfraSnapshotMetricType.load]: load_1.load,
    [types_1.InfraSnapshotMetricType.logRate]: log_rate_1.logRate,
};
