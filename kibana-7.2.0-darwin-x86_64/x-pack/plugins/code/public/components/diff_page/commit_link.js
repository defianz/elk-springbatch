"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const eui_1 = require("@elastic/eui");
const react_1 = tslib_1.__importDefault(require("react"));
exports.CommitLink = ({ repoUri, commit, children }) => {
    // const href = DIFF.replace(':resource/:org/:repo', repoUri).replace(':commitId', commit);
    return (
    // <EuiLink href={`#${href}`}>
    react_1.default.createElement(eui_1.EuiBadge, { color: "hollow" }, children || commit)
    // </EuiLink>
    );
};
