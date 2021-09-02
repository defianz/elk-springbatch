"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../common/types");
exports.ROOT = '/';
exports.SETUP = '/setup-guide';
const pathTypes = `:pathType(${types_1.PathTypes.blob}|${types_1.PathTypes.tree}|${types_1.PathTypes.blame}|${types_1.PathTypes.commits})`;
exports.MAIN = `/:resource/:org/:repo/${pathTypes}/:revision/:path*:goto(!.*)?`;
exports.DIFF = '/:resource/:org/:repo/commit/:commitId';
exports.REPO = `/:resource/:org/:repo`;
exports.MAIN_ROOT = `/:resource/:org/:repo/${pathTypes}/:revision`;
exports.ADMIN = '/admin';
exports.SEARCH = '/search';
