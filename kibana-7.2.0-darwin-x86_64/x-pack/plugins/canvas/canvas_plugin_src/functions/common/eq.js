"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("../../strings");
function eq() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().eq;
    return {
        name: 'eq',
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
            return context === args.value;
        },
    };
}
exports.eq = eq;
