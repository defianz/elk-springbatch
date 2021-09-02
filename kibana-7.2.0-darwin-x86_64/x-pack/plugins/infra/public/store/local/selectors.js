"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const typed_redux_1 = require("../../utils/typed_redux");
const log_filter_1 = require("./log_filter");
const log_position_1 = require("./log_position");
const waffle_filter_1 = require("./waffle_filter");
const waffle_options_1 = require("./waffle_options");
const waffle_time_1 = require("./waffle_time");
exports.logFilterSelectors = typed_redux_1.globalizeSelectors((state) => state.logFilter, log_filter_1.logFilterSelectors);
exports.logPositionSelectors = typed_redux_1.globalizeSelectors((state) => state.logPosition, log_position_1.logPositionSelectors);
exports.waffleFilterSelectors = typed_redux_1.globalizeSelectors((state) => state.waffleFilter, waffle_filter_1.waffleFilterSelectors);
exports.waffleTimeSelectors = typed_redux_1.globalizeSelectors((state) => state.waffleTime, waffle_time_1.waffleTimeSelectors);
exports.waffleOptionsSelectors = typed_redux_1.globalizeSelectors((state) => state.waffleMetrics, waffle_options_1.waffleOptionsSelectors);
