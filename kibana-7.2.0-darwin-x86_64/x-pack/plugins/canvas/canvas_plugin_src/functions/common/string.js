"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("../../strings");
function string() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().string;
    return {
        name: 'string',
        aliases: [],
        type: 'string',
        help,
        args: {
            value: {
                aliases: ['_'],
                types: ['string'],
                multi: true,
                help: argHelp.value,
            },
        },
        fn: (_context, args) => args.value.join(''),
    };
}
exports.string = string;
