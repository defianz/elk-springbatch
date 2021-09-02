"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const text_1 = require("../text");
const constants_1 = require("../../../../common/constants");
exports.validateRepository = (repository, validateSettings = true) => {
    const { name, type, settings } = repository;
    const { i18n } = text_1.textService;
    const validation = {
        isValid: true,
        errors: {},
    };
    if (validateSettings) {
        const settingsValidation = validateRepositorySettings(type, settings);
        if (Object.keys(settingsValidation).length) {
            validation.errors.settings = settingsValidation;
        }
    }
    if (isStringEmpty(name)) {
        validation.errors.name = [
            i18n.translate('xpack.snapshotRestore.repositoryValidation.nameRequired', {
                defaultMessage: 'Repository name is required.',
            }),
        ];
    }
    if (isStringEmpty(type) ||
        (type === constants_1.REPOSITORY_TYPES.source && isStringEmpty(settings.delegateType))) {
        validation.errors.type = [
            i18n.translate('xpack.snapshotRestore.repositoryValidation.delegateTypeRequired', {
                defaultMessage: 'Type is required.',
            }),
        ];
    }
    if (Object.keys(validation.errors).length) {
        validation.isValid = false;
    }
    return validation;
};
const isStringEmpty = (str) => {
    return str ? !Boolean(str.trim()) : true;
};
const validateRepositorySettings = (type, settings) => {
    switch (type) {
        case constants_1.REPOSITORY_TYPES.fs:
            return validateFSRepositorySettings(settings);
        case constants_1.REPOSITORY_TYPES.url:
            return validateReadonlyRepositorySettings(settings);
        case constants_1.REPOSITORY_TYPES.source:
            return validateRepositorySettings(settings.delegateType, settings);
        case constants_1.REPOSITORY_TYPES.s3:
            return validateS3RepositorySettings(settings);
        case constants_1.REPOSITORY_TYPES.gcs:
            return validateGCSRepositorySettings(settings);
        case constants_1.REPOSITORY_TYPES.hdfs:
            return validateHDFSRepositorySettings(settings);
        // No validation on settings needed for azure (all settings are optional)
        default:
            return {};
    }
};
const validateFSRepositorySettings = (settings) => {
    const i18n = text_1.textService.i18n;
    const validation = {};
    const { location } = settings;
    if (isStringEmpty(location)) {
        validation.location = [
            i18n.translate('xpack.snapshotRestore.repositoryValidation.locationRequired', {
                defaultMessage: 'Location is required.',
            }),
        ];
    }
    return validation;
};
const validateReadonlyRepositorySettings = (settings) => {
    const i18n = text_1.textService.i18n;
    const validation = {};
    const { url } = settings;
    if (isStringEmpty(url)) {
        validation.url = [
            i18n.translate('xpack.snapshotRestore.repositoryValidation.urlRequired', {
                defaultMessage: 'URL is required.',
            }),
        ];
    }
    return validation;
};
const validateS3RepositorySettings = (settings) => {
    const i18n = text_1.textService.i18n;
    const validation = {};
    const { bucket } = settings;
    if (isStringEmpty(bucket)) {
        validation.bucket = [
            i18n.translate('xpack.snapshotRestore.repositoryValidation.bucketRequired', {
                defaultMessage: 'Bucket is required.',
            }),
        ];
    }
    return validation;
};
const validateGCSRepositorySettings = (settings) => {
    const i18n = text_1.textService.i18n;
    const validation = {};
    const { bucket } = settings;
    if (isStringEmpty(bucket)) {
        validation.bucket = [
            i18n.translate('xpack.snapshotRestore.repositoryValidation.bucketRequired', {
                defaultMessage: 'Bucket is required.',
            }),
        ];
    }
    return validation;
};
const validateHDFSRepositorySettings = (settings) => {
    const i18n = text_1.textService.i18n;
    const validation = {};
    const { uri, path } = settings;
    if (isStringEmpty(uri)) {
        validation.uri = [
            i18n.translate('xpack.snapshotRestore.repositoryValidation.uriRequired', {
                defaultMessage: 'URI is required.',
            }),
        ];
    }
    if (isStringEmpty(path)) {
        validation.path = [
            i18n.translate('xpack.snapshotRestore.repositoryValidation.pathRequired', {
                defaultMessage: 'Path is required.',
            }),
        ];
    }
    return validation;
};
