"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const format_1 = require("@elastic/eui/lib/services/format");
const moment_1 = tslib_1.__importDefault(require("moment"));
function formatDate(epochMs) {
    return moment_1.default(Number(epochMs)).format(format_1.dateFormatAliases.longDateTime);
}
exports.formatDate = formatDate;
