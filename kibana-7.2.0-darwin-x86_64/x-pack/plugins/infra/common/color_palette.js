"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const lodash_1 = require("lodash");
var MetricsExplorerColor;
(function (MetricsExplorerColor) {
    MetricsExplorerColor["color0"] = "color0";
    MetricsExplorerColor["color1"] = "color1";
    MetricsExplorerColor["color2"] = "color2";
    MetricsExplorerColor["color3"] = "color3";
    MetricsExplorerColor["color4"] = "color4";
    MetricsExplorerColor["color5"] = "color5";
    MetricsExplorerColor["color6"] = "color6";
    MetricsExplorerColor["color7"] = "color7";
    MetricsExplorerColor["color8"] = "color8";
    MetricsExplorerColor["color9"] = "color9";
})(MetricsExplorerColor = exports.MetricsExplorerColor || (exports.MetricsExplorerColor = {}));
exports.defaultPalette = {
    [MetricsExplorerColor.color0]: '#3185FC',
    [MetricsExplorerColor.color1]: '#DB1374',
    [MetricsExplorerColor.color2]: '#00B3A4',
    [MetricsExplorerColor.color3]: '#490092',
    [MetricsExplorerColor.color4]: '#FEB6DB',
    [MetricsExplorerColor.color5]: '#E6C220',
    [MetricsExplorerColor.color6]: '#BFA180',
    [MetricsExplorerColor.color7]: '#F98510',
    [MetricsExplorerColor.color8]: '#461A0A',
    [MetricsExplorerColor.color9]: '#920000',
};
exports.createPaletteTransformer = (palette) => (color) => palette[color];
exports.colorTransformer = exports.createPaletteTransformer(exports.defaultPalette);
exports.sampleColor = (usedColors = []) => {
    const available = lodash_1.difference(lodash_1.values(MetricsExplorerColor), usedColors);
    return lodash_1.first(available) || MetricsExplorerColor.color0;
};
