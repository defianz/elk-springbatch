"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const constants_1 = require("../../../../common/constants");
class TextService {
    constructor() {
        this.breadcrumbs = {};
        this.repositoryTypeNames = {};
    }
    init(i18n) {
        this.i18n = i18n;
        this.repositoryTypeNames = {
            [constants_1.REPOSITORY_TYPES.fs]: i18n.translate('xpack.snapshotRestore.repositoryType.fileSystemTypeName', {
                defaultMessage: 'Shared file system',
            }),
            [constants_1.REPOSITORY_TYPES.url]: i18n.translate('xpack.snapshotRestore.repositoryType.readonlyTypeName', {
                defaultMessage: 'Read-only URL',
            }),
            [constants_1.REPOSITORY_TYPES.s3]: i18n.translate('xpack.snapshotRestore.repositoryType.s3TypeName', {
                defaultMessage: 'AWS S3',
            }),
            [constants_1.REPOSITORY_TYPES.hdfs]: i18n.translate('xpack.snapshotRestore.repositoryType.hdfsTypeName', {
                defaultMessage: 'Hadoop HDFS',
            }),
            [constants_1.REPOSITORY_TYPES.azure]: i18n.translate('xpack.snapshotRestore.repositoryType.azureTypeName', {
                defaultMessage: 'Azure',
            }),
            [constants_1.REPOSITORY_TYPES.gcs]: i18n.translate('xpack.snapshotRestore.repositoryType.gcsTypeName', {
                defaultMessage: 'Google Cloud Storage',
            }),
            [constants_1.REPOSITORY_TYPES.source]: i18n.translate('xpack.snapshotRestore.repositoryType.sourceTypeName', {
                defaultMessage: 'Source-only',
            }),
        };
        this.breadcrumbs = {
            home: i18n.translate('xpack.snapshotRestore.home.breadcrumbTitle', {
                defaultMessage: 'Snapshot Repositories',
            }),
            repositoryAdd: i18n.translate('xpack.snapshotRestore.addRepository.breadcrumbTitle', {
                defaultMessage: 'Add repository',
            }),
            repositoryEdit: i18n.translate('xpack.snapshotRestore.editRepository.breadcrumbTitle', {
                defaultMessage: 'Edit repository',
            }),
        };
    }
    getRepositoryTypeName(type, delegateType) {
        const getTypeName = (repositoryType) => {
            return this.repositoryTypeNames[repositoryType] || type || '';
        };
        if (type === constants_1.REPOSITORY_TYPES.source && delegateType) {
            return this.i18n.translate('xpack.snapshotRestore.repositoryType.sourceTypeWithDelegateName', {
                defaultMessage: '{delegateType} (Source-only)',
                values: {
                    delegateType: getTypeName(delegateType),
                },
            });
        }
        return getTypeName(type);
    }
    getSizeNotationHelpText() {
        return this.i18n.translate('xpack.snapshotRestore.repositoryForm.sizeNotationPlaceholder', {
            defaultMessage: 'Examples: {example1}, {example2}, {example3}, {example4}',
            values: {
                example1: '1g',
                example2: '10mb',
                example3: '5k',
                example4: '1024B',
            },
        });
    }
}
exports.textService = new TextService();
