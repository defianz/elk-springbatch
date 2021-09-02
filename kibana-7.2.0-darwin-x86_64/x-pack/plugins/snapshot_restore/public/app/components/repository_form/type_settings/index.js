"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const react_1 = tslib_1.__importDefault(require("react"));
const constants_1 = require("../../../../../common/constants");
const index_1 = require("../../../index");
const index_2 = require("../../index");
const azure_settings_1 = require("./azure_settings");
const fs_settings_1 = require("./fs_settings");
const gcs_settings_1 = require("./gcs_settings");
const hdfs_settings_1 = require("./hdfs_settings");
const readonly_settings_1 = require("./readonly_settings");
const s3_settings_1 = require("./s3_settings");
exports.TypeSettings = ({ repository, updateRepository, settingErrors, }) => {
    const { core: { i18n }, } = index_1.useAppDependencies();
    const { FormattedMessage } = i18n;
    const { type, settings } = repository;
    const updateRepositorySettings = (updatedSettings, replaceSettings) => {
        if (replaceSettings) {
            updateRepository({
                settings: updatedSettings,
            });
        }
        else {
            updateRepository({
                settings: {
                    ...settings,
                    ...updatedSettings,
                },
            });
        }
    };
    const typeSettingsMap = {
        [constants_1.REPOSITORY_TYPES.fs]: fs_settings_1.FSSettings,
        [constants_1.REPOSITORY_TYPES.url]: readonly_settings_1.ReadonlySettings,
        [constants_1.REPOSITORY_TYPES.azure]: azure_settings_1.AzureSettings,
        [constants_1.REPOSITORY_TYPES.gcs]: gcs_settings_1.GCSSettings,
        [constants_1.REPOSITORY_TYPES.hdfs]: hdfs_settings_1.HDFSSettings,
        [constants_1.REPOSITORY_TYPES.s3]: s3_settings_1.S3Settings,
    };
    const renderTypeSettings = (repositoryType) => {
        if (!repositoryType) {
            return null;
        }
        const RepositorySettings = typeSettingsMap[repositoryType];
        if (RepositorySettings) {
            return (react_1.default.createElement(RepositorySettings, { repository: repository, updateRepositorySettings: updateRepositorySettings, settingErrors: settingErrors }));
        }
        return (react_1.default.createElement(index_2.SectionError, { title: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.errorUnknownRepositoryTypesTitle", defaultMessage: "Unknown repository type" }), error: {
                data: {
                    error: i18n.translate('xpack.snapshotRestore.repositoryForm.errorUnknownRepositoryTypesMessage', {
                        defaultMessage: `The repository type '{type}' is not supported.`,
                        values: {
                            type: repositoryType,
                        },
                    }),
                },
            } }));
    };
    return type === constants_1.REPOSITORY_TYPES.source
        ? renderTypeSettings(settings.delegateType)
        : renderTypeSettings(type);
};
