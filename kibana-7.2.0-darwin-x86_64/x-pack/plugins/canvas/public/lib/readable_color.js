"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chroma_js_1 = tslib_1.__importDefault(require("chroma-js"));
function readableColor(background, light = '#FFF', dark = '#333') {
    try {
        return chroma_js_1.default.contrast(background, '#000') < 7 ? light : dark;
    }
    catch (e) {
        return dark;
    }
}
exports.readableColor = readableColor;
