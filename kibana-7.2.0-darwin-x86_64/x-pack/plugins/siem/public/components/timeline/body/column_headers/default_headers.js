"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
exports.defaultColumnHeaderType = 'not-filtered';
exports.defaultHeaders = [
    {
        columnHeaderType: exports.defaultColumnHeaderType,
        id: '@timestamp',
        width: helpers_1.DEFAULT_DATE_COLUMN_MIN_WIDTH,
    },
    {
        columnHeaderType: exports.defaultColumnHeaderType,
        id: 'message',
        width: helpers_1.DEFAULT_COLUMN_MIN_WIDTH,
    },
    {
        columnHeaderType: exports.defaultColumnHeaderType,
        id: 'event.category',
        width: helpers_1.DEFAULT_COLUMN_MIN_WIDTH,
    },
    {
        columnHeaderType: exports.defaultColumnHeaderType,
        id: 'event.action',
        width: helpers_1.DEFAULT_COLUMN_MIN_WIDTH,
    },
    {
        columnHeaderType: exports.defaultColumnHeaderType,
        id: 'host.name',
        width: helpers_1.DEFAULT_COLUMN_MIN_WIDTH,
    },
    {
        columnHeaderType: exports.defaultColumnHeaderType,
        id: 'source.ip',
        width: helpers_1.DEFAULT_COLUMN_MIN_WIDTH,
    },
    {
        columnHeaderType: exports.defaultColumnHeaderType,
        id: 'destination.ip',
        width: helpers_1.DEFAULT_COLUMN_MIN_WIDTH,
    },
    {
        columnHeaderType: exports.defaultColumnHeaderType,
        id: 'user.name',
        width: helpers_1.DEFAULT_COLUMN_MIN_WIDTH,
    },
];
/** The default category of fields shown in the Timeline */
exports.DEFAULT_CATEGORY_NAME = 'default ECS';
