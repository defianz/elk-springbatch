"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const base64_js_1 = require("base64-js");
// @ts-ignore @types/mime doesn't resolve mime/lite for some reason.
const lite_1 = tslib_1.__importDefault(require("mime/lite"));
const dataurlRegex = /^data:([a-z]+\/[a-z0-9-+.]+)(;[a-z-]+=[a-z0-9-]+)?(;([a-z0-9]+))?,/;
exports.imageTypes = ['image/svg+xml', 'image/jpeg', 'image/png', 'image/gif'];
function parseDataUrl(str, withData = false) {
    if (typeof str !== 'string') {
        return null;
    }
    const matches = str.match(dataurlRegex);
    if (!matches) {
        return null;
    }
    const [, mimetype, charset, , encoding] = matches;
    // all types except for svg need to be base64 encoded
    const imageTypeIndex = exports.imageTypes.indexOf(matches[1]);
    if (imageTypeIndex > 0 && encoding !== 'base64') {
        return null;
    }
    return {
        mimetype,
        encoding,
        charset: charset && charset.split('=')[1],
        data: !withData ? null : str.split(',')[1],
        isImage: imageTypeIndex >= 0,
        extension: lite_1.default.getExtension(mimetype),
    };
}
exports.parseDataUrl = parseDataUrl;
function isValidDataUrl(str) {
    if (!str) {
        return false;
    }
    return dataurlRegex.test(str);
}
exports.isValidDataUrl = isValidDataUrl;
function encode(data, type = 'text/plain') {
    // use FileReader if it's available, like in the browser
    if (FileReader) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = err => reject(err);
            reader.readAsDataURL(data);
        });
    }
    // otherwise fall back to fromByteArray
    // note: Buffer doesn't seem to correctly base64 encode binary data
    return Promise.resolve(`data:${type};base64,${base64_js_1.fromByteArray(data)}`);
}
exports.encode = encode;
