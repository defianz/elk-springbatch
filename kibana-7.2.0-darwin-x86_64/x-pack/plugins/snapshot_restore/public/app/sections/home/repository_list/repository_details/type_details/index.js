"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const react_1 = tslib_1.__importDefault(require("react"));
const constants_1 = require("../../../../../../../common/constants");
const azure_details_1 = require("./azure_details");
const default_details_1 = require("./default_details");
const fs_details_1 = require("./fs_details");
const gcs_details_1 = require("./gcs_details");
const hdfs_details_1 = require("./hdfs_details");
const readonly_details_1 = require("./readonly_details");
const s3_details_1 = require("./s3_details");
exports.TypeDetails = ({ repository }) => {
    const { type, settings } = repository;
    switch (type) {
        case constants_1.REPOSITORY_TYPES.fs:
            return react_1.default.createElement(fs_details_1.FSDetails, { repository: repository });
        case constants_1.REPOSITORY_TYPES.url:
            return react_1.default.createElement(readonly_details_1.ReadonlyDetails, { repository: repository });
        case constants_1.REPOSITORY_TYPES.source:
            const { delegateType } = settings;
            const delegatedRepository = {
                ...repository,
                type: delegateType,
            };
            return react_1.default.createElement(exports.TypeDetails, { repository: delegatedRepository });
        case constants_1.REPOSITORY_TYPES.azure:
            return react_1.default.createElement(azure_details_1.AzureDetails, { repository: repository });
        case constants_1.REPOSITORY_TYPES.gcs:
            return react_1.default.createElement(gcs_details_1.GCSDetails, { repository: repository });
        case constants_1.REPOSITORY_TYPES.hdfs:
            return react_1.default.createElement(hdfs_details_1.HDFSDetails, { repository: repository });
        case constants_1.REPOSITORY_TYPES.s3:
            return react_1.default.createElement(s3_details_1.S3Details, { repository: repository });
        default:
            return react_1.default.createElement(default_details_1.DefaultDetails, { repository: repository });
    }
};
