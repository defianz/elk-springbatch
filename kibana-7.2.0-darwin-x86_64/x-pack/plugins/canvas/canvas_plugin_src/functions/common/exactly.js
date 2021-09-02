"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("../../strings");
function exactly() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().exactly;
    return {
        name: 'exactly',
        aliases: [],
        type: 'filter',
        context: {
            types: ['filter'],
        },
        help,
        args: {
            column: {
                types: ['string'],
                aliases: ['field', 'c'],
                help: argHelp.column,
            },
            value: {
                types: ['string'],
                aliases: ['v', 'val'],
                help: argHelp.value,
            },
            filterGroup: {
                types: ['string', 'null'],
                help: argHelp.filterGroup,
            },
        },
        fn: (context, args) => {
            const { value, column } = args;
            const filter = {
                type: 'exactly',
                value,
                column,
                and: [],
            };
            return { ...context, and: [...context.and, filter] };
        },
    };
}
exports.exactly = exactly;
