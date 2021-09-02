"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const querystring_1 = tslib_1.__importDefault(require("querystring"));
function toQuery(search) {
    return search ? querystring_1.default.parse(search.slice(1)) : {};
}
exports.toQuery = toQuery;
function fromQuery(query) {
    return querystring_1.default.stringify(query, undefined, undefined, {
        encodeURIComponent: (value) => {
            return encodeURIComponent(value).replace(/%3A/g, ':');
        }
    });
}
exports.fromQuery = fromQuery;
// This is downright horrible 😭 💔
// Angular decodes encoded url tokens like "%2F" to "/" which causes problems when path params contains forward slashes
// This was originally fixed in Angular, but roled back to avoid breaking backwards compatability: https://github.com/angular/angular.js/commit/2bdf7126878c87474bb7588ce093d0a3c57b0026
function legacyEncodeURIComponent(rawUrl) {
    return (rawUrl &&
        encodeURIComponent(rawUrl)
            .replace(/~/g, '%7E')
            .replace(/%/g, '~'));
}
exports.legacyEncodeURIComponent = legacyEncodeURIComponent;
function legacyDecodeURIComponent(encodedUrl) {
    return encodedUrl && decodeURIComponent(encodedUrl.replace(/~/g, '%'));
}
exports.legacyDecodeURIComponent = legacyDecodeURIComponent;
