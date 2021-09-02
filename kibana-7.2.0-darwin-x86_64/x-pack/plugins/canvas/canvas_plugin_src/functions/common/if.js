"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("../../strings");
function ifFn() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().if;
    return {
        name: 'if',
        help,
        args: {
            condition: {
                types: ['boolean', 'null'],
                aliases: ['_'],
                help: argHelp.condition,
            },
            then: {
                resolve: false,
                help: argHelp.then,
            },
            else: {
                resolve: false,
                help: argHelp.else,
            },
        },
        fn: async (context, args) => {
            if (args.condition) {
                if (typeof args.then === 'undefined') {
                    return context;
                }
                return await args.then();
            }
            else {
                if (typeof args.else === 'undefined') {
                    return context;
                }
                return await args.else();
            }
        },
    };
}
exports.ifFn = ifFn;
