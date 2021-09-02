"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("../../strings");
// @ts-ignore untyped local
const resolve_dataurl_1 = require("../../../common/lib/resolve_dataurl");
// @ts-ignore .png file
const elastic_logo_1 = require("../../lib/elastic_logo");
var ImageMode;
(function (ImageMode) {
    ImageMode["CONTAIN"] = "contain";
    ImageMode["COVER"] = "cover";
    ImageMode["STRETCH"] = "stretch";
})(ImageMode = exports.ImageMode || (exports.ImageMode = {}));
function image() {
    const { help, args: argHelp } = strings_1.getFunctionHelp().image;
    return {
        name: 'image',
        aliases: [],
        type: 'image',
        help,
        context: {
            types: ['null'],
        },
        args: {
            dataurl: {
                // This was accepting dataurl, but there was no facility in fn for checking type and handling a dataurl type.
                types: ['string', 'null'],
                help: argHelp.dataurl,
                aliases: ['_', 'url'],
                default: elastic_logo_1.elasticLogo,
            },
            mode: {
                types: ['string', 'null'],
                help: argHelp.mode,
                default: 'contain',
                options: Object.values(ImageMode),
            },
        },
        fn: (_context, { dataurl, mode }) => {
            if (!mode || !Object.values(ImageMode).includes(mode)) {
                throw new Error('"mode" must be "contain", "cover", or "stretch"');
            }
            const modeStyle = mode === 'stretch' ? '100% 100%' : mode;
            return {
                type: 'image',
                mode: modeStyle,
                dataurl: resolve_dataurl_1.resolveWithMissingImage(dataurl, elastic_logo_1.elasticLogo),
            };
        },
    };
}
exports.image = image;
