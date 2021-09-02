"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const __1 = require("..");
const sections_1 = require("./sections");
function ErrorMetadata({ error }) {
    return react_1.default.createElement(__1.MetadataTable, { item: error, sections: sections_1.ERROR_METADATA_SECTIONS });
}
exports.ErrorMetadata = ErrorMetadata;
