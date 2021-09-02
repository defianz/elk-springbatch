"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("../../strings");
function caseFn() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().case;
    return {
        name: 'case',
        type: 'case',
        help,
        args: {
            when: {
                aliases: ['_'],
                resolve: false,
                help: argHelp.when,
            },
            if: {
                types: ['boolean'],
                help: argHelp.if,
            },
            then: {
                resolve: false,
                help: argHelp.then,
            },
        },
        fn: async (context, args) => {
            const matches = await doesMatch(context, args);
            const result = matches ? await getResult(context, args) : null;
            return { type: 'case', matches, result };
        },
    };
}
exports.caseFn = caseFn;
async function doesMatch(context, args) {
    if (typeof args.if !== 'undefined') {
        return args.if;
    }
    if (typeof args.when !== 'undefined') {
        return (await args.when()) === context;
    }
    return true;
}
async function getResult(context, args) {
    if (typeof args.then !== 'undefined') {
        return await args.then();
    }
    return context;
}
