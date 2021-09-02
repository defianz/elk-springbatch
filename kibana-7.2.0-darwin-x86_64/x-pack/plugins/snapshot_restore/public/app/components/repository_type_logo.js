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
const constants_1 = require("../../../common/constants");
exports.RepositoryTypeLogo = ({ type, ...rest }) => {
    const typeLogoMap = {
        [constants_1.REPOSITORY_TYPES.fs]: 'storage',
        [constants_1.REPOSITORY_TYPES.url]: 'eye',
        [constants_1.REPOSITORY_TYPES.azure]: 'logoAzure',
        [constants_1.REPOSITORY_TYPES.gcs]: 'logoGCP',
        [constants_1.REPOSITORY_TYPES.hdfs]: 'logoApache',
        [constants_1.REPOSITORY_TYPES.s3]: 'logoAWS',
    };
    return react_1.default.createElement(eui_1.EuiIcon, Object.assign({ type: typeLogoMap[type] || 'folderOpen' }, rest));
};
