"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const add_base_path_1 = require("./add_base_path");
exports.getApmHref = (monitor, basePath, dateRangeStart, dateRangeEnd) => add_base_path_1.addBasePath(basePath, `/app/apm#/services?kuery=${encodeURI(`url.domain: "${lodash_1.get(monitor, 'ping.url.domain')}"`)}&rangeFrom=${dateRangeStart}&rangeTo=${dateRangeEnd}`);
