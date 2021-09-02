"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const papaparse_1 = tslib_1.__importDefault(require("papaparse"));
const strings_1 = require("../../strings");
function csv() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().csv;
    return {
        name: 'csv',
        type: 'datatable',
        help,
        context: {
            types: ['null'],
        },
        args: {
            data: {
                aliases: ['_'],
                types: ['string'],
                help: argHelp.data,
            },
            delimiter: {
                types: ['string'],
                help: argHelp.delimiter,
            },
            newline: {
                types: ['string'],
                help: argHelp.newline,
            },
        },
        fn(_context, args) {
            const { data: csvString, delimiter, newline } = args;
            const config = {
                transform: (val) => {
                    if (val.indexOf('"') >= 0) {
                        return val.trim().replace(/(^\"|\"$)/g, '');
                    }
                    return val;
                },
            };
            if (delimiter != null) {
                config.delimiter = delimiter;
            }
            if (newline != null) {
                config.newline = newline;
            }
            const output = papaparse_1.default.parse(csvString, config);
            const { data, errors } = output;
            if (errors.length > 0) {
                throw new Error('Error parsing input CSV.');
            }
            // output.data is an array of arrays, rows and values in each row
            return data.reduce((acc, row, i) => {
                if (i === 0) {
                    // first row, assume header values
                    row.forEach((colName) => acc.columns.push({ name: colName.trim(), type: 'string' }));
                }
                else {
                    // any other row is a data row
                    const rowObj = row.reduce((rowAcc, colValue, j) => {
                        const colName = acc.columns[j].name;
                        rowAcc[colName] = colValue;
                        return rowAcc;
                    }, {});
                    acc.rows.push(rowObj);
                }
                return acc;
            }, {
                type: 'datatable',
                columns: [],
                rows: [],
            });
        },
    };
}
exports.csv = csv;
