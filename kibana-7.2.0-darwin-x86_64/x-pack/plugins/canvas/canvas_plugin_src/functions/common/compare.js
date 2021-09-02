"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("../../strings");
var Operation;
(function (Operation) {
    Operation["EQ"] = "eq";
    Operation["NE"] = "ne";
    Operation["LT"] = "lt";
    Operation["GT"] = "gt";
    Operation["LTE"] = "lte";
    Operation["GTE"] = "gte";
})(Operation = exports.Operation || (exports.Operation = {}));
function compare() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().compare;
    return {
        name: 'compare',
        help,
        aliases: ['condition'],
        type: 'boolean',
        context: {
            types: ['null', 'string', 'number', 'boolean'],
        },
        args: {
            op: {
                aliases: ['_'],
                types: ['string'],
                default: 'eq',
                help: argHelp.op,
                options: Object.values(Operation),
            },
            to: {
                aliases: ['this', 'b'],
                help: argHelp.to,
            },
        },
        fn: (context, args) => {
            const a = context;
            const { to: b, op } = args;
            const typesMatch = typeof a === typeof b;
            switch (op) {
                case Operation.EQ:
                    return a === b;
                case Operation.NE:
                    return a !== b;
                case Operation.LT:
                    if (typesMatch) {
                        // @ts-ignore #35433 This is a wonky comparison for nulls
                        return a < b;
                    }
                    return false;
                case Operation.LTE:
                    if (typesMatch) {
                        // @ts-ignore #35433 This is a wonky comparison for nulls
                        return a <= b;
                    }
                    return false;
                case Operation.GT:
                    if (typesMatch) {
                        // @ts-ignore #35433 This is a wonky comparison for nulls
                        return a > b;
                    }
                    return false;
                case Operation.GTE:
                    if (typesMatch) {
                        // @ts-ignore #35433 This is a wonky comparison for nulls
                        return a >= b;
                    }
                    return false;
                default:
                    throw new Error(`Invalid compare operator: '${op}'. Use ${Object.values(Operation).join(', ')}`);
            }
        },
    };
}
exports.compare = compare;
