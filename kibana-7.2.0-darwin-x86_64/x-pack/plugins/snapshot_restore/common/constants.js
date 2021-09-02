"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const constants_1 = require("../../../common/constants");
exports.PLUGIN = {
    ID: 'snapshot_restore',
    MINIMUM_LICENSE_REQUIRED: constants_1.LICENSE_TYPE_BASIC,
    getI18nName: (i18n) => {
        return i18n.translate('xpack.snapshotRestore.appName', {
            defaultMessage: 'Snapshot Repositories',
        });
    },
};
exports.API_BASE_PATH = '/api/snapshot_restore/';
var REPOSITORY_TYPES;
(function (REPOSITORY_TYPES) {
    REPOSITORY_TYPES["fs"] = "fs";
    REPOSITORY_TYPES["url"] = "url";
    REPOSITORY_TYPES["source"] = "source";
    REPOSITORY_TYPES["s3"] = "s3";
    REPOSITORY_TYPES["hdfs"] = "hdfs";
    REPOSITORY_TYPES["azure"] = "azure";
    REPOSITORY_TYPES["gcs"] = "gcs";
})(REPOSITORY_TYPES = exports.REPOSITORY_TYPES || (exports.REPOSITORY_TYPES = {}));
// Deliberately do not include `source` as a default repository since we treat it as a flag
exports.DEFAULT_REPOSITORY_TYPES = [
    REPOSITORY_TYPES.fs,
    REPOSITORY_TYPES.url,
];
exports.PLUGIN_REPOSITORY_TYPES = [
    REPOSITORY_TYPES.s3,
    REPOSITORY_TYPES.hdfs,
    REPOSITORY_TYPES.azure,
    REPOSITORY_TYPES.gcs,
];
exports.REPOSITORY_PLUGINS_MAP = {
    'repository-s3': REPOSITORY_TYPES.s3,
    'repository-hdfs': REPOSITORY_TYPES.hdfs,
    'repository-azure': REPOSITORY_TYPES.azure,
    'repository-gcs': REPOSITORY_TYPES.gcs,
};
exports.APP_PERMISSIONS = ['create_snapshot', 'cluster:admin/repository'];
