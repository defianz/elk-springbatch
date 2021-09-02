"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("../../strings");
function doFn() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().do;
    return {
        name: 'do',
        help,
        args: {
            fn: {
                aliases: ['_'],
                multi: true,
                help: argHelp.fn,
            },
        },
        fn: context => context,
    };
}
exports.doFn = doFn;
