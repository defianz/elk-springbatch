"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const d3_array_1 = require("d3-array");
const time_1 = require("../../../common/time");
exports.getLogEntryKey = (entry) => entry.key;
const logEntryTimeBisector = d3_array_1.bisector(time_1.compareToTimeKey(exports.getLogEntryKey));
exports.getLogEntryIndexBeforeTime = logEntryTimeBisector.left;
exports.getLogEntryIndexAfterTime = logEntryTimeBisector.right;
exports.getLogEntryIndexAtTime = time_1.getIndexAtTimeKey(exports.getLogEntryKey);
exports.getLogEntryAtTime = (entries, time) => {
    const entryIndex = exports.getLogEntryIndexAtTime(entries, time);
    return entryIndex !== null ? entries[entryIndex] : null;
};
exports.isTimestampColumn = (column) => column != null && 'timestamp' in column;
exports.isMessageColumn = (column) => column != null && 'message' in column;
exports.isFieldColumn = (column) => column != null && 'field' in column;
exports.isConstantSegment = (segment) => 'constant' in segment;
exports.isFieldSegment = (segment) => 'field' in segment && 'value' in segment;
