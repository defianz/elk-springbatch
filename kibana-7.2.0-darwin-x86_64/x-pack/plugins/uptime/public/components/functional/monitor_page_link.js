"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_router_dom_1 = require("react-router-dom");
const react_1 = tslib_1.__importDefault(require("react"));
exports.MonitorPageLink = ({ children, id, location, linkParameters, }) => (react_1.default.createElement(eui_1.EuiLink, null,
    react_1.default.createElement(react_router_dom_1.Link, { "data-test-subj": `monitor-page-link-${id}`, to: location === undefined
            ? `/monitor/${id}${linkParameters}`
            : `/monitor/${id}/${encodeURI(location)}/${linkParameters}` }, children)));
