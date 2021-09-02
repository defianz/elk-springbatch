"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = tslib_1.__importDefault(require("react"));
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const url_1 = tslib_1.__importDefault(require("url"));
function KibanaLink({ path, ...rest }) {
    const href = url_1.default.format({
        pathname: chrome_1.default.addBasePath('/app/kibana'),
        hash: path
    });
    return react_1.default.createElement(eui_1.EuiLink, Object.assign({}, rest, { href: href }));
}
exports.KibanaLink = KibanaLink;
