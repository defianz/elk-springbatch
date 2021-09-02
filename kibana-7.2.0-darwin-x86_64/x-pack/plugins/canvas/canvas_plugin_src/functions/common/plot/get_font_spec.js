"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fonts_1 = require("../../../../common/lib/fonts");
// converts the output of the font function to a flot font spec
// for font spec, see https://github.com/flot/flot/blob/master/API.md#customizing-the-axes
exports.defaultSpec = {
    size: 14,
    lHeight: 21,
    style: 'normal',
    weight: 'normal',
    family: fonts_1.openSans.value,
    color: '#000',
};
exports.getFontSpec = (argFont) => {
    if (!argFont || !argFont.spec) {
        return exports.defaultSpec;
    }
    const { fontSize, lineHeight, fontStyle, fontWeight, fontFamily, color } = argFont.spec;
    const size = fontSize && Number(fontSize.replace('px', ''));
    const lHeight = typeof lineHeight === 'string' && Number(lineHeight.replace('px', ''));
    return {
        size: size && !isNaN(size) ? size : exports.defaultSpec.size,
        lHeight: size && !isNaN(size) ? lHeight : exports.defaultSpec.lHeight,
        style: fontStyle || exports.defaultSpec.style,
        weight: fontWeight || exports.defaultSpec.weight,
        family: fontFamily || exports.defaultSpec.family,
        color: color || exports.defaultSpec.color,
    };
};
