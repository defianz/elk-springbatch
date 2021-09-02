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
exports.GCSSettings = ({ repository, updateRepositorySettings, settingErrors, }) => {
    const { core: { i18n: { FormattedMessage }, }, } = index_1.useAppDependencies();
    const { settings: { bucket, client, basePath, compress, chunkSize, maxRestoreBytesPerSec, maxSnapshotBytesPerSec, readonly, }, } = repository;
    const hasErrors = Boolean(Object.keys(settingErrors).length);
    return (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeGCS.clientTitle", defaultMessage: "Client" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeGCS.clientDescription", defaultMessage: "The name of the Google Cloud Storage client." }), idAria: "gcsRepositoryClientDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeGCS.clientLabel", defaultMessage: "Client" }), fullWidth: true, describedByIds: ['gcsRepositoryClientDescription'], isInvalid: Boolean(hasErrors && settingErrors.client), error: settingErrors.client },
                react_1.default.createElement(eui_1.EuiFieldText, { defaultValue: client || '', fullWidth: true, onChange: e => {
                        updateRepositorySettings({
                            client: e.target.value,
                        });
                    } }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeGCS.bucketTitle", defaultMessage: "Bucket" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeGCS.bucketDescription", defaultMessage: "The name of the Google Cloud Storage bucket to use for snapshots." }), idAria: "gcsRepositoryBucketDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeGCS.bucketLabel", defaultMessage: "Bucket (required)" }), fullWidth: true, describedByIds: ['gcsRepositoryBucketDescription'], isInvalid: Boolean(hasErrors && settingErrors.bucket), error: settingErrors.bucket },
                react_1.default.createElement(eui_1.EuiFieldText, { defaultValue: bucket || '', fullWidth: true, onChange: e => {
                        updateRepositorySettings({
                            bucket: e.target.value,
                        });
                    } }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeGCS.basePathTitle", defaultMessage: "Base path" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeGCS.basePathDescription", defaultMessage: "The bucket path to the repository data." }), idAria: "gcsRepositoryBasePathDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeGCS.basePathLabel", defaultMessage: "Base path" }), fullWidth: true, describedByIds: ['gcsRepositoryBasePathDescription'], isInvalid: Boolean(hasErrors && settingErrors.basePath), error: settingErrors.basePath },
                react_1.default.createElement(eui_1.EuiFieldText, { defaultValue: basePath || '', fullWidth: true, onChange: e => {
                        updateRepositorySettings({
                            basePath: e.target.value,
                        });
                    } }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeGCS.compressTitle", defaultMessage: "Compress snapshots" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeGCS.compressDescription", defaultMessage: "Compresses the index mapping and setting files for snapshots. Data files are not compressed." }), idAria: "gcsRepositoryCompressDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { hasEmptyLabelSpace: true, fullWidth: true, describedByIds: ['gcsRepositoryCompressDescription'], isInvalid: Boolean(hasErrors && settingErrors.compress), error: settingErrors.compress },
                react_1.default.createElement(eui_1.EuiSwitch, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeGCS.compressLabel", defaultMessage: "Compress snapshots" }), checked: !(compress === false), onChange: e => {
                        updateRepositorySettings({
                            compress: e.target.checked,
                        });
                    } }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeGCS.chunkSizeTitle", defaultMessage: "Chunk size" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeGCS.chunkSizeDescription", defaultMessage: "Breaks files into smaller units when taking snapshots." }), idAria: "gcsRepositoryChunkSizeDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeGCS.chunkSizeLabel", defaultMessage: "Chunk size" }), fullWidth: true, describedByIds: ['gcsRepositoryChunkSizeDescription'], isInvalid: Boolean(hasErrors && settingErrors.chunkSize), error: settingErrors.chunkSize, helpText: text_1.textService.getSizeNotationHelpText() },
                react_1.default.createElement(eui_1.EuiFieldText, { defaultValue: chunkSize || '', fullWidth: true, onChange: e => {
                        updateRepositorySettings({
                            chunkSize: e.target.value,
                        });
                    } }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeGCS.maxSnapshotBytesTitle", defaultMessage: "Max snapshot bytes per second" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeGCS.maxSnapshotBytesDescription", defaultMessage: "The rate for creating snapshots for each node." }), idAria: "gcsRepositoryMaxSnapshotBytesDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeGCS.maxSnapshotBytesLabel", defaultMessage: "Max snapshot bytes per second" }), fullWidth: true, describedByIds: ['gcsRepositoryMaxSnapshotBytesDescription'], isInvalid: Boolean(hasErrors && settingErrors.maxSnapshotBytesPerSec), error: settingErrors.maxSnapshotBytesPerSec, helpText: text_1.textService.getSizeNotationHelpText() },
                react_1.default.createElement(eui_1.EuiFieldText, { defaultValue: maxSnapshotBytesPerSec || '', fullWidth: true, onChange: e => {
                        updateRepositorySettings({
                            maxSnapshotBytesPerSec: e.target.value,
                        });
                    } }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeGCS.maxRestoreBytesTitle", defaultMessage: "Max restore bytes per second" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeGCS.maxRestoreBytesDescription", defaultMessage: "The snapshot restore rate for each node." }), idAria: "gcsRepositoryMaxRestoreBytesDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeGCS.maxRestoreBytesLabel", defaultMessage: "Max restore bytes per second" }), fullWidth: true, describedByIds: ['gcsRepositoryMaxRestoreBytesDescription'], isInvalid: Boolean(hasErrors && settingErrors.maxRestoreBytesPerSec), error: settingErrors.maxRestoreBytesPerSec, helpText: text_1.textService.getSizeNotationHelpText() },
                react_1.default.createElement(eui_1.EuiFieldText, { defaultValue: maxRestoreBytesPerSec || '', fullWidth: true, onChange: e => {
                        updateRepositorySettings({
                            maxRestoreBytesPerSec: e.target.value,
                        });
                    } }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeGCS.readonlyTitle", defaultMessage: "Read-only" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeGCS.readonlyDescription", defaultMessage: "Only one cluster should have write access to this repository. All other clusters should be read-only." }), idAria: "gcsRepositoryReadonlyDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { hasEmptyLabelSpace: true, fullWidth: true, describedByIds: ['gcsRepositoryReadonlyDescription'], isInvalid: Boolean(hasErrors && settingErrors.readonly), error: settingErrors.readonly },
                react_1.default.createElement(eui_1.EuiSwitch, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeGCS.readonlyLabel", defaultMessage: "Read-only repository" }), checked: !!readonly, onChange: e => {
                        updateRepositorySettings({
                            readonly: e.target.checked,
                        });
                    } })))));
};
