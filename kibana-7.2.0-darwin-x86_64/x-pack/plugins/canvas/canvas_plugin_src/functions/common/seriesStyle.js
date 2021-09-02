"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("../../strings");
const name = 'seriesStyle';
function seriesStyle() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().seriesStyle;
    return {
        name,
        help,
        context: {
            types: ['null'],
        },
        args: {
            label: {
                types: ['string'],
                help: argHelp.label,
            },
            color: {
                types: ['string', 'null'],
                help: argHelp.color,
            },
            lines: {
                types: ['number'],
                help: argHelp.lines,
            },
            bars: {
                types: ['number'],
                help: argHelp.bars,
            },
            points: {
                types: ['number'],
                help: argHelp.points,
            },
            fill: {
                types: ['number', 'boolean'],
                help: argHelp.fill,
                default: false,
                options: [true, false],
            },
            stack: {
                types: ['number', 'null'],
                help: argHelp.stack,
            },
            horizontalBars: {
                types: ['boolean'],
                help: argHelp.horizontalBars,
                options: [true, false],
            },
        },
        fn: (_context, args) => ({ type: name, ...args }),
    };
}
exports.seriesStyle = seriesStyle;
