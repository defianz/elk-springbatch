"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const public_1 = require("../../../../../../src/legacy/core_plugins/ui_metric/public");
const constants_1 = require("../../../common/constants");
exports.trackUiAction = (metricType) => public_1.trackUiMetric(constants_1.APP_ID, metricType);
