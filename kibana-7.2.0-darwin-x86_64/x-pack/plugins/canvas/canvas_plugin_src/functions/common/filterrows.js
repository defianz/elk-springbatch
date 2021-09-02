"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("../../strings");
function filterrows() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().filterrows;
    return {
        name: 'filterrows',
        aliases: [],
        type: 'datatable',
        context: {
            types: ['datatable'],
        },
        help,
        args: {
            fn: {
                resolve: false,
                aliases: ['_'],
                types: ['boolean'],
                help: argHelp.fn,
            },
        },
        fn(context, { fn }) {
            const checks = context.rows.map(row => fn({
                ...context,
                rows: [row],
            }));
            return Promise.all(checks)
                .then(results => context.rows.filter((row, i) => results[i]))
                .then(rows => ({
                ...context,
                rows,
            }));
        },
    };
}
exports.filterrows = filterrows;
