"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const redux_observable_1 = require("redux-observable");
const log_position_1 = require("./log_position");
const waffle_time_1 = require("./waffle_time");
exports.createLocalEpic = () => redux_observable_1.combineEpics(log_position_1.createLogPositionEpic(), waffle_time_1.createWaffleTimeEpic());
