"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("../../strings");
function gt() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().gt;
    return {
        name: 'gt',
        type: 'boolean',
        help,
        args: {
            value: {
                aliases: ['_'],
                types: ['boolean', 'number', 'string', 'null'],
                required: true,
                help: argHelp.value,
            },
        },
        fn: (context, args) => {
            const { value } = args;
            if (typeof context !== typeof value) {
                return false;
            }
            // @ts-ignore #35433 This is a wonky comparison for nulls
            return context > value;
        },
    };
}
exports.gt = gt;
