"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore untyped local
const query_es_sql_1 = require("../../../server/lib/query_es_sql");
const strings_1 = require("../../strings");
function essql() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().essql;
    return {
        name: 'essql',
        type: 'datatable',
        context: {
            types: ['filter'],
        },
        help,
        args: {
            query: {
                aliases: ['_', 'q'],
                types: ['string'],
                help: argHelp.query,
            },
            count: {
                types: ['number'],
                help: argHelp.count,
                default: 1000,
            },
            timezone: {
                aliases: ['tz'],
                types: ['string'],
                default: 'UTC',
                help: argHelp.timezone,
            },
        },
        fn: (context, args, handlers) => query_es_sql_1.queryEsSQL(handlers.elasticsearchClient, { ...args, filter: context.and }),
    };
}
exports.essql = essql;
