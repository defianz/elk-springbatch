"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const constants_1 = require("../../../../common/constants");
const constants_2 = require("../../constants");
class DocumentationLinksService {
    constructor() {
        this.esDocBasePath = '';
        this.esPluginDocBasePath = '';
    }
    init(esDocBasePath, esPluginDocBasePath) {
        this.esDocBasePath = esDocBasePath;
        this.esPluginDocBasePath = esPluginDocBasePath;
    }
    getRepositoryPluginDocUrl() {
        return `${this.esPluginDocBasePath}${constants_2.REPOSITORY_DOC_PATHS.plugins}`;
    }
    getRepositoryTypeDocUrl(type) {
        switch (type) {
            case constants_1.REPOSITORY_TYPES.fs:
                return `${this.esDocBasePath}${constants_2.REPOSITORY_DOC_PATHS.fs}`;
            case constants_1.REPOSITORY_TYPES.url:
                return `${this.esDocBasePath}${constants_2.REPOSITORY_DOC_PATHS.url}`;
            case constants_1.REPOSITORY_TYPES.source:
                return `${this.esDocBasePath}${constants_2.REPOSITORY_DOC_PATHS.source}`;
            case constants_1.REPOSITORY_TYPES.s3:
                return `${this.esPluginDocBasePath}${constants_2.REPOSITORY_DOC_PATHS.s3}`;
            case constants_1.REPOSITORY_TYPES.hdfs:
                return `${this.esPluginDocBasePath}${constants_2.REPOSITORY_DOC_PATHS.hdfs}`;
            case constants_1.REPOSITORY_TYPES.azure:
                return `${this.esPluginDocBasePath}${constants_2.REPOSITORY_DOC_PATHS.azure}`;
            case constants_1.REPOSITORY_TYPES.gcs:
                return `${this.esPluginDocBasePath}${constants_2.REPOSITORY_DOC_PATHS.gcs}`;
            default:
                return `${this.esDocBasePath}${constants_2.REPOSITORY_DOC_PATHS.default}`;
        }
    }
    getSnapshotDocUrl() {
        return `${this.esDocBasePath}/modules-snapshots.html#_snapshot`;
    }
}
exports.documentationLinksService = new DocumentationLinksService();
