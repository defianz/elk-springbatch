"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("../../strings");
function getCell() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().getCell;
    return {
        name: 'getCell',
        help,
        context: {
            types: ['datatable'],
        },
        args: {
            column: {
                types: ['string'],
                aliases: ['_', 'c'],
                help: argHelp.column,
            },
            row: {
                types: ['number'],
                aliases: ['r'],
                help: argHelp.row,
                default: 0,
            },
        },
        fn: (context, args) => {
            const row = context.rows[args.row];
            if (!row) {
                throw new Error(`Row not found: '${args.row}'`);
            }
            const { column = context.columns[0].name } = args;
            const value = row[column];
            if (typeof value === 'undefined') {
                throw new Error(`Column not found: '${column}'`);
            }
            return value;
        },
    };
}
exports.getCell = getCell;
