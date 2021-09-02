"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const eui_1 = require("@elastic/eui");
const metadata_1 = require("ui/metadata");
// TODO: metadata should be read from a useContext hook in new platform
const STACK_VERSION = metadata_1.metadata.branch;
function ElasticDocsLink({ section, path, ...rest }) {
    const href = `https://www.elastic.co/guide/en${section}/${STACK_VERSION}${path}`;
    return react_1.default.createElement(eui_1.EuiLink, Object.assign({ href: href }, rest));
}
exports.ElasticDocsLink = ElasticDocsLink;
