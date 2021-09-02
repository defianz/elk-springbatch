"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore untyped local
const build_es_request_1 = require("../../../server/lib/build_es_request");
const strings_1 = require("../../strings");
function escount() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().escount;
    return {
        name: 'escount',
        type: 'number',
        help,
        context: {
            types: ['filter'],
        },
        args: {
            index: {
                types: ['string', 'null'],
                default: '_all',
                help: argHelp.index,
            },
            query: {
                types: ['string'],
                aliases: ['_', 'q'],
                help: argHelp.query,
                default: '"-_index:.kibana"',
            },
        },
        fn: (context, args, handlers) => {
            context.and = context.and.concat([
                {
                    type: 'luceneQueryString',
                    query: args.query,
                    and: [],
                },
            ]);
            const esRequest = build_es_request_1.buildESRequest({
                index: args.index,
                body: {
                    query: {
                        bool: {
                            must: [{ match_all: {} }],
                        },
                    },
                },
            }, context);
            return handlers
                .elasticsearchClient('count', esRequest)
                .then((resp) => resp.count);
        },
    };
}
exports.escount = escount;
