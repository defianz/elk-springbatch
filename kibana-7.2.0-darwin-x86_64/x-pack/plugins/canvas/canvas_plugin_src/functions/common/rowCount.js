"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("../../strings");
function rowCount() {
    const { help } = strings_1.getFunctionHelp().rowCount;
    return {
        name: 'rowCount',
        aliases: [],
        type: 'number',
        context: {
            types: ['datatable'],
        },
        help,
        args: {},
        fn: context => context.rows.length,
    };
}
exports.rowCount = rowCount;
