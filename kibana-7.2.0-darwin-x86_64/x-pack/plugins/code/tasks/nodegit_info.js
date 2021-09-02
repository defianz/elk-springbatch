"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/camelcase */
// @ts-ignore
const binary_info_1 = tslib_1.__importDefault(require("@elastic/nodegit/dist/utils/binary_info"));
function binaryInfo(platform, arch) {
    const info = binary_info_1.default(platform, arch);
    const downloadUrl = info.hosted_tarball;
    const packageName = info.package_name;
    return {
        downloadUrl,
        packageName,
    };
}
exports.binaryInfo = binaryInfo;
