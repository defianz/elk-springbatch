"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("../../strings");
var Shape;
(function (Shape) {
    Shape["ARROW"] = "arrow";
    Shape["ARROW_MULTI"] = "arrowMulti";
    Shape["BOOKMARK"] = "bookmark";
    Shape["CIRCLE"] = "circle";
    Shape["CROSS"] = "cross";
    Shape["HEXAGON"] = "hexagon";
    Shape["KITE"] = "kite";
    Shape["PENTAGON"] = "pentagon";
    Shape["RHOMBUS"] = "rhombus";
    Shape["SEMICIRCLE"] = "semicircle";
    Shape["SPEECH_BUBBLE"] = "speechBubble";
    Shape["SQUARE"] = "square";
    Shape["STAR"] = "star";
    Shape["TAG"] = "tag";
    Shape["TRIANGLE"] = "triangle";
    Shape["TRIANGLE_RIGHT"] = "triangleRight";
})(Shape = exports.Shape || (exports.Shape = {}));
function shape() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().shape;
    return {
        name: 'shape',
        aliases: [],
        type: 'shape',
        help,
        context: {
            types: ['null'],
        },
        args: {
            border: {
                types: ['string', 'null'],
                aliases: ['stroke'],
                help: argHelp.border,
            },
            borderWidth: {
                types: ['number', 'null'],
                aliases: ['strokeWidth'],
                help: argHelp.borderWidth,
                default: '0',
            },
            shape: {
                types: ['string', 'null'],
                help: argHelp.shape,
                aliases: ['_'],
                default: 'square',
                options: Object.values(Shape),
            },
            fill: {
                types: ['string', 'null'],
                help: argHelp.fill,
                default: 'black',
            },
            maintainAspect: {
                types: ['boolean'],
                help: argHelp.maintainAspect,
                default: false,
                options: [true, false],
            },
        },
        fn: (_context, args) => ({
            type: 'shape',
            ...args,
        }),
    };
}
exports.shape = shape;
