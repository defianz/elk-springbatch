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
const rison_node_1 = tslib_1.__importDefault(require("rison-node"));
const useAPMIndexPattern_1 = require("../../../../hooks/useAPMIndexPattern");
const useLocation_1 = require("../../../../hooks/useLocation");
const rison_helpers_1 = require("../rison_helpers");
function DiscoverLink({ query = {}, ...rest }) {
    const apmIndexPattern = useAPMIndexPattern_1.useAPMIndexPattern();
    const location = useLocation_1.useLocation();
    if (!apmIndexPattern.id) {
        return null;
    }
    const risonQuery = {
        _g: rison_helpers_1.getTimepickerRisonData(location.search),
        _a: {
            ...query._a,
            index: apmIndexPattern.id
        }
    };
    const href = url_1.default.format({
        pathname: chrome_1.default.addBasePath('/app/kibana'),
        hash: `/discover?_g=${rison_node_1.default.encode(risonQuery._g)}&_a=${rison_node_1.default.encode(risonQuery._a)}`
    });
    return react_1.default.createElement(eui_1.EuiLink, Object.assign({}, rest, { href: href }));
}
exports.DiscoverLink = DiscoverLink;
