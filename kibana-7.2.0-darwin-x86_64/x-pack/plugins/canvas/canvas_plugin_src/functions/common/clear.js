"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("../../strings");
function clear() {
    const { help } = strings_1.getFunctionHelp().clear;
    return {
        name: 'clear',
        type: 'null',
        help,
        args: {},
        fn: () => null,
    };
}
exports.clear = clear;
