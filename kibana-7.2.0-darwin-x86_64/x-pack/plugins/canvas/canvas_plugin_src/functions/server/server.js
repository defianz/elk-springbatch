"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("../../strings");
function server() {
    const { help } = strings_1.getFunctionHelp().server;
    return {
        name: 'server',
        help,
        args: {},
        fn: context => context,
    };
}
exports.server = server;
