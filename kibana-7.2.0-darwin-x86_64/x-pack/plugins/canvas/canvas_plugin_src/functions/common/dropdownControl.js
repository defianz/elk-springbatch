"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const strings_1 = require("../../strings");
function dropdownControl() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().dropdownControl;
    return {
        name: 'dropdownControl',
        aliases: [],
        type: 'render',
        context: {
            types: ['datatable'],
        },
        help,
        args: {
            filterColumn: {
                types: ['string'],
                help: argHelp.filterColumn,
            },
            valueColumn: {
                types: ['string'],
                help: argHelp.valueColumn,
            },
            filterGroup: {
                types: ['string', 'null'],
                help: argHelp.filterGroup,
            },
        },
        fn: (context, { valueColumn, filterColumn, filterGroup }) => {
            let choices = [];
            if (context.rows[0][valueColumn]) {
                choices = lodash_1.uniq(context.rows.map(row => row[valueColumn])).sort();
            }
            const column = filterColumn || valueColumn;
            return {
                type: 'render',
                as: 'dropdown_filter',
                value: {
                    column,
                    choices,
                    filterGroup,
                },
            };
        },
    };
}
exports.dropdownControl = dropdownControl;
