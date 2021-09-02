"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const eui_1 = require("@elastic/eui");
const index_1 = require("../../../index");
const text_1 = require("../../../services/text");
exports.S3Settings = ({ repository, updateRepositorySettings, settingErrors, }) => {
    const { core: { i18n: { FormattedMessage }, }, } = index_1.useAppDependencies();
    const { settings: { bucket, client, basePath, compress, chunkSize, serverSideEncryption, bufferSize, cannedAcl, storageClass, maxRestoreBytesPerSec, maxSnapshotBytesPerSec, readonly, }, } = repository;
    const cannedAclOptions = [
        'private',
        'public-read',
        'public-read-write',
        'authenticated-read',
        'log-delivery-write',
        'bucket-owner-read',
        'bucket-owner-full-control',
    ].map(option => ({
        value: option,
        text: option,
    }));
    const hasErrors = Boolean(Object.keys(settingErrors).length);
    const storageClassOptions = ['standard', 'reduced_redundancy', 'standard_ia'].map(option => ({
        value: option,
        text: option,
    }));
    return (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeS3.clientTitle", defaultMessage: "Client" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeS3.clientDescription", defaultMessage: "The name of the AWS S3 client." }), idAria: "s3RepositoryClientDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeS3.clientLabel", defaultMessage: "Client" }), fullWidth: true, describedByIds: ['s3RepositoryClientDescription'], isInvalid: Boolean(hasErrors && settingErrors.client), error: settingErrors.client },
                react_1.default.createElement(eui_1.EuiFieldText, { defaultValue: client || '', fullWidth: true, onChange: e => {
                        updateRepositorySettings({
                            client: e.target.value,
                        });
                    } }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeS3.bucketTitle", defaultMessage: "Bucket" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeS3.bucketDescription", defaultMessage: "The name of the AWS S3 bucket to use for snapshots." }), idAria: "s3RepositoryBucketDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeS3.bucketLabel", defaultMessage: "Bucket (required)" }), fullWidth: true, describedByIds: ['s3RepositoryBucketDescription'], isInvalid: Boolean(hasErrors && settingErrors.bucket), error: settingErrors.bucket },
                react_1.default.createElement(eui_1.EuiFieldText, { defaultValue: bucket || '', fullWidth: true, onChange: e => {
                        updateRepositorySettings({
                            bucket: e.target.value,
                        });
                    } }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeS3.basePathTitle", defaultMessage: "Base path" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeS3.basePathDescription", defaultMessage: "The bucket path to the repository data." }), idAria: "s3RepositoryBasePathDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeS3.basePathLabel", defaultMessage: "Base path" }), fullWidth: true, describedByIds: ['s3RepositoryBasePathDescription'], isInvalid: Boolean(hasErrors && settingErrors.basePath), error: settingErrors.basePath },
                react_1.default.createElement(eui_1.EuiFieldText, { defaultValue: basePath || '', fullWidth: true, onChange: e => {
                        updateRepositorySettings({
                            basePath: e.target.value,
                        });
                    } }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeS3.compressTitle", defaultMessage: "Snapshot compression" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeS3.compressDescription", defaultMessage: "Compresses the index mapping and setting files for snapshots. Data files are not compressed." }), idAria: "s3RepositoryCompressDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { hasEmptyLabelSpace: true, fullWidth: true, describedByIds: ['s3RepositoryCompressDescription'], isInvalid: Boolean(hasErrors && settingErrors.compress), error: settingErrors.compress },
                react_1.default.createElement(eui_1.EuiSwitch, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeS3.compressLabel", defaultMessage: "Compress snapshots" }), checked: !(compress === false), onChange: e => {
                        updateRepositorySettings({
                            compress: e.target.checked,
                        });
                    } }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeS3.chunkSizeTitle", defaultMessage: "Chunk size" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeS3.chunkSizeDescription", defaultMessage: "Breaks files into smaller units when taking snapshots." }), idAria: "s3RepositoryChunkSizeDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeS3.chunkSizeLabel", defaultMessage: "Chunk size" }), fullWidth: true, describedByIds: ['s3RepositoryChunkSizeDescription'], isInvalid: Boolean(hasErrors && settingErrors.chunkSize), error: settingErrors.chunkSize, helpText: text_1.textService.getSizeNotationHelpText() },
                react_1.default.createElement(eui_1.EuiFieldText, { defaultValue: chunkSize || '', fullWidth: true, onChange: e => {
                        updateRepositorySettings({
                            chunkSize: e.target.value,
                        });
                    } }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeS3.serverSideEncryptionTitle", defaultMessage: "Server-side encryption" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeS3.serverSideEncryptionDescription", defaultMessage: "Encrypts files on the server using AES256 algorithm." }), idAria: "s3RepositoryServerSideEncryptionDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { hasEmptyLabelSpace: true, fullWidth: true, describedByIds: ['s3RepositoryServerSideEncryptionDescription'], isInvalid: Boolean(hasErrors && settingErrors.serverSideEncryption), error: settingErrors.serverSideEncryption },
                react_1.default.createElement(eui_1.EuiSwitch, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeS3.serverSideEncryptionLabel", defaultMessage: "Server-side encryption" }), checked: !!serverSideEncryption, onChange: e => {
                        updateRepositorySettings({
                            serverSideEncryption: e.target.checked,
                        });
                    } }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeS3.bufferSizeTitle", defaultMessage: "Buffer size" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeS3.bufferSizeDescription", defaultMessage: "Beyond this minimum threshold, the S3 repository will use the AWS Multipart Upload API\n              to split the chunk into several parts and upload each in its own request." }), idAria: "s3RepositoryBufferSizeDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeS3.bufferSizeLabel", defaultMessage: "Buffer size" }), fullWidth: true, describedByIds: ['s3RepositoryBufferSizeDescription'], isInvalid: Boolean(hasErrors && settingErrors.bufferSize), error: settingErrors.bufferSize, helpText: text_1.textService.getSizeNotationHelpText() },
                react_1.default.createElement(eui_1.EuiFieldText, { defaultValue: bufferSize || '', fullWidth: true, onChange: e => {
                        updateRepositorySettings({
                            bufferSize: e.target.value,
                        });
                    } }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeS3.cannedAclTitle", defaultMessage: "Canned ACL" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeS3.cannedAclDescription", defaultMessage: "The canned ACL to add to new S3 buckets and objects." }), idAria: "s3RepositoryCannedAclDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeS3.cannedAclLabel", defaultMessage: "Canned ACL" }), fullWidth: true, describedByIds: ['s3RepositoryCannedAclDescription'], isInvalid: Boolean(hasErrors && settingErrors.cannedAcl), error: settingErrors.cannedAcl },
                react_1.default.createElement(eui_1.EuiSelect, { options: cannedAclOptions, value: cannedAcl || cannedAclOptions[0].value, onChange: e => {
                        updateRepositorySettings({
                            cannedAcl: e.target.value,
                        });
                    }, fullWidth: true }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeS3.storageClassTitle", defaultMessage: "Storage class" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeS3.storageClassDescription", defaultMessage: "The storage class for new objects in the S3 repository." }), idAria: "s3RepositoryStorageClassDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeS3.storageClassLabel", defaultMessage: "Storage class" }), fullWidth: true, describedByIds: ['s3RepositoryStorageClassDescription'], isInvalid: Boolean(hasErrors && settingErrors.storageClass), error: settingErrors.storageClass },
                react_1.default.createElement(eui_1.EuiSelect, { options: storageClassOptions, value: storageClass || storageClassOptions[0].value, onChange: e => {
                        updateRepositorySettings({
                            storageClass: e.target.value,
                        });
                    }, fullWidth: true }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeS3.maxSnapshotBytesTitle", defaultMessage: "Max snapshot bytes per second" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeS3.maxSnapshotBytesDescription", defaultMessage: "The rate for creating snapshots for each node." }), idAria: "s3RepositoryMaxSnapshotBytesDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeS3.maxSnapshotBytesLabel", defaultMessage: "Max snapshot bytes per second" }), fullWidth: true, describedByIds: ['s3RepositoryMaxSnapshotBytesDescription'], isInvalid: Boolean(hasErrors && settingErrors.maxSnapshotBytesPerSec), error: settingErrors.maxSnapshotBytesPerSec, helpText: text_1.textService.getSizeNotationHelpText() },
                react_1.default.createElement(eui_1.EuiFieldText, { defaultValue: maxSnapshotBytesPerSec || '', fullWidth: true, onChange: e => {
                        updateRepositorySettings({
                            maxSnapshotBytesPerSec: e.target.value,
                        });
                    } }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeS3.maxRestoreBytesTitle", defaultMessage: "Max restore bytes per second" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeS3.maxRestoreBytesDescription", defaultMessage: "The snapshot restore rate for each node." }), idAria: "s3RepositoryMaxRestoreBytesDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeS3.maxRestoreBytesLabel", defaultMessage: "Max restore bytes per second" }), fullWidth: true, describedByIds: ['s3RepositoryMaxRestoreBytesDescription'], isInvalid: Boolean(hasErrors && settingErrors.maxRestoreBytesPerSec), error: settingErrors.maxRestoreBytesPerSec, helpText: text_1.textService.getSizeNotationHelpText() },
                react_1.default.createElement(eui_1.EuiFieldText, { defaultValue: maxRestoreBytesPerSec || '', fullWidth: true, onChange: e => {
                        updateRepositorySettings({
                            maxRestoreBytesPerSec: e.target.value,
                        });
                    } }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeS3.readonlyTitle", defaultMessage: "Read-only" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeS3.readonlyDescription", defaultMessage: "Only one cluster should have write access to this repository. All other clusters should be read-only." }), idAria: "s3RepositoryReadonlyDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { hasEmptyLabelSpace: true, fullWidth: true, describedByIds: ['s3RepositoryReadonlyDescription'], isInvalid: Boolean(hasErrors && settingErrors.readonly), error: settingErrors.readonly },
                react_1.default.createElement(eui_1.EuiSwitch, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeS3.readonlyLabel", defaultMessage: "Read-only repository" }), checked: !!readonly, onChange: e => {
                        updateRepositorySettings({
                            readonly: e.target.checked,
                        });
                    } })))));
};
