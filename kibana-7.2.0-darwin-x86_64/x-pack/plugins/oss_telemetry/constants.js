"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLUGIN_ID = 'oss_telemetry'; // prefix used for registering properties with services from this plugin
exports.VIS_TELEMETRY_TASK = 'vis_telemetry'; // suffix for the _id of our task instance, which must be `get`-able
exports.VIS_USAGE_TYPE = 'visualization_types'; // suffix for the properties of data registered with the usage service
exports.VIS_TELEMETRY_TASK_NUM_WORKERS = 10; // by default it's 100% their workers. Users can scale up and set task manager's numWorkers higher for other tasks to be able to run concurrently in a single Kibana instance with this one
