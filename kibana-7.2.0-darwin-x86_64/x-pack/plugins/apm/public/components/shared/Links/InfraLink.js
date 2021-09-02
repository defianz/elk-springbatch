"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const lodash_1 = require("lodash");
const react_1 = tslib_1.__importDefault(require("react"));
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const url_1 = tslib_1.__importDefault(require("url"));
const url_helpers_1 = require("./url_helpers");
function InfraLink({ path, query = {}, ...rest }) {
    const nextSearch = url_helpers_1.fromQuery(query);
    const href = url_1.default.format({
        pathname: chrome_1.default.addBasePath('/app/infra'),
        hash: lodash_1.compact([path, nextSearch]).join('?')
    });
    return react_1.default.createElement(eui_1.EuiLink, Object.assign({}, rest, { href: href }));
}
exports.InfraLink = InfraLink;
