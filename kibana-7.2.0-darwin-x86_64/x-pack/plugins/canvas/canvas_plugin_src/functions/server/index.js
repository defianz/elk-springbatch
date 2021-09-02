"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const demodata_1 = require("./demodata");
const escount_1 = require("./escount");
const esdocs_1 = require("./esdocs");
const pointseries_1 = require("./pointseries");
const server_1 = require("./server");
const essql_1 = require("./essql");
exports.functions = [demodata_1.demodata, esdocs_1.esdocs, escount_1.escount, essql_1.essql, pointseries_1.pointseries, server_1.server];
