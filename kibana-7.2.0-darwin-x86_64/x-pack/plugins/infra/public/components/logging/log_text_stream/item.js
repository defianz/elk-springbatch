"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const d3_array_1 = require("d3-array");
const time_1 = require("../../../../common/time");
function getStreamItemTimeKey(item) {
    switch (item.kind) {
        case 'logEntry':
            return item.logEntry.key;
    }
}
exports.getStreamItemTimeKey = getStreamItemTimeKey;
function getStreamItemId(item) {
    switch (item.kind) {
        case 'logEntry':
            return `${item.logEntry.key.time}:${item.logEntry.key.tiebreaker}:${item.logEntry.gid}`;
    }
}
exports.getStreamItemId = getStreamItemId;
function parseStreamItemId(id) {
    const idFragments = id.split(':');
    return {
        gid: idFragments.slice(2).join(':'),
        tiebreaker: parseInt(idFragments[1], 10),
        time: parseInt(idFragments[0], 10),
    };
}
exports.parseStreamItemId = parseStreamItemId;
const streamItemTimeBisector = d3_array_1.bisector(time_1.compareToTimeKey(getStreamItemTimeKey));
exports.getStreamItemBeforeTimeKey = (streamItems, key) => streamItems[Math.min(streamItemTimeBisector.left(streamItems, key), streamItems.length - 1)];
