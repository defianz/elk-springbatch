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
exports.AzureSettings = ({ repository, updateRepositorySettings, settingErrors, }) => {
    const { core: { i18n: { FormattedMessage }, }, } = index_1.useAppDependencies();
    const { settings: { client, container, basePath, compress, chunkSize, readonly, locationMode, maxRestoreBytesPerSec, maxSnapshotBytesPerSec, }, } = repository;
    const hasErrors = Boolean(Object.keys(settingErrors).length);
    const locationModeOptions = ['primary_only', 'secondary_only'].map(option => ({
        value: option,
        text: option,
    }));
    return (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeAzure.clientTitle", defaultMessage: "Client" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeAzure.clientDescription", defaultMessage: "The name of the Azure client." }), idAria: "azureRepositoryClientDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeAzure.clientLabel", defaultMessage: "Client" }), fullWidth: true, describedByIds: ['azureRepositoryClientDescription'], isInvalid: Boolean(hasErrors && settingErrors.client), error: settingErrors.client },
                react_1.default.createElement(eui_1.EuiFieldText, { defaultValue: client || '', fullWidth: true, onChange: e => {
                        updateRepositorySettings({
                            client: e.target.value,
                        });
                    } }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeAzure.containerTitle", defaultMessage: "Container" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeAzure.containerDescription", defaultMessage: "The name of the Azure container to use for snapshots." }), idAria: "azureRepositoryContainerDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeAzure.containerLabel", defaultMessage: "Container" }), fullWidth: true, describedByIds: ['azureRepositoryContainerDescription'], isInvalid: Boolean(hasErrors && settingErrors.container), error: settingErrors.container },
                react_1.default.createElement(eui_1.EuiFieldText, { defaultValue: container || '', fullWidth: true, onChange: e => {
                        updateRepositorySettings({
                            container: e.target.value,
                        });
                    } }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeAzure.basePathTitle", defaultMessage: "Base path" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeAzure.basePathDescription", defaultMessage: "The container path to the repository data." }), idAria: "azureRepositoryBasePathDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeAzure.basePathLabel", defaultMessage: "Base path" }), fullWidth: true, describedByIds: ['azureRepositoryBasePathDescription'], isInvalid: Boolean(hasErrors && settingErrors.basePath), error: settingErrors.basePath },
                react_1.default.createElement(eui_1.EuiFieldText, { defaultValue: basePath || '', fullWidth: true, onChange: e => {
                        updateRepositorySettings({
                            basePath: e.target.value,
                        });
                    } }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeAzure.compressTitle", defaultMessage: "Snapshot compression" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeAzure.compressDescription", defaultMessage: "Compresses the index mapping and setting files for snapshots. Data files are not compressed." }), idAria: "azureRepositoryCompressDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { hasEmptyLabelSpace: true, fullWidth: true, describedByIds: ['azureRepositoryCompressDescription'], isInvalid: Boolean(hasErrors && settingErrors.compress), error: settingErrors.compress },
                react_1.default.createElement(eui_1.EuiSwitch, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeAzure.compressLabel", defaultMessage: "Compress snapshots" }), checked: !(compress === false), onChange: e => {
                        updateRepositorySettings({
                            compress: e.target.checked,
                        });
                    } }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeAzure.chunkSizeTitle", defaultMessage: "Chunk size" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeAzure.chunkSizeDescription", defaultMessage: "Breaks files into smaller units when taking snapshots." }), idAria: "azureRepositoryChunkSizeDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeAzure.chunkSizeLabel", defaultMessage: "Chunk size" }), fullWidth: true, describedByIds: ['azureRepositoryChunkSizeDescription'], isInvalid: Boolean(hasErrors && settingErrors.chunkSize), error: settingErrors.chunkSize, helpText: text_1.textService.getSizeNotationHelpText() },
                react_1.default.createElement(eui_1.EuiFieldText, { defaultValue: chunkSize || '', fullWidth: true, onChange: e => {
                        updateRepositorySettings({
                            chunkSize: e.target.value,
                        });
                    } }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeAzure.maxSnapshotBytesTitle", defaultMessage: "Max snapshot bytes per second" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeAzure.maxSnapshotBytesDescription", defaultMessage: "The rate for creating snapshots for each node." }), idAria: "azureRepositoryMaxSnapshotBytesDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeAzure.maxSnapshotBytesLabel", defaultMessage: "Max snapshot bytes per second" }), fullWidth: true, describedByIds: ['azureRepositoryMaxSnapshotBytesDescription'], isInvalid: Boolean(hasErrors && settingErrors.maxSnapshotBytesPerSec), error: settingErrors.maxSnapshotBytesPerSec, helpText: text_1.textService.getSizeNotationHelpText() },
                react_1.default.createElement(eui_1.EuiFieldText, { defaultValue: maxSnapshotBytesPerSec || '', fullWidth: true, onChange: e => {
                        updateRepositorySettings({
                            maxSnapshotBytesPerSec: e.target.value,
                        });
                    } }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeAzure.maxRestoreBytesTitle", defaultMessage: "Max restore bytes per second" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeAzure.maxRestoreBytesDescription", defaultMessage: "The snapshot restore rate for each node." }), idAria: "azureRepositoryMaxRestoreBytesDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeAzure.maxRestoreBytesLabel", defaultMessage: "Max restore bytes per second" }), fullWidth: true, describedByIds: ['azureRepositoryMaxRestoreBytesDescription'], isInvalid: Boolean(hasErrors && settingErrors.maxRestoreBytesPerSec), error: settingErrors.maxRestoreBytesPerSec, helpText: text_1.textService.getSizeNotationHelpText() },
                react_1.default.createElement(eui_1.EuiFieldText, { defaultValue: maxRestoreBytesPerSec || '', fullWidth: true, onChange: e => {
                        updateRepositorySettings({
                            maxRestoreBytesPerSec: e.target.value,
                        });
                    } }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeAzure.locationModeTitle", defaultMessage: "Location mode" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeAzure.locationModeDescription", defaultMessage: "The primary or secondary location. If secondary, read-only is true." }), idAria: "azureRepositoryLocationModeDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeAzure.locationModeLabel", defaultMessage: "Location mode" }), fullWidth: true, describedByIds: ['azureRepositoryLocationModeDescription'], isInvalid: Boolean(hasErrors && settingErrors.locationMode), error: settingErrors.locationMode },
                react_1.default.createElement(eui_1.EuiSelect, { options: locationModeOptions, value: locationMode || locationModeOptions[0].value, onChange: e => {
                        updateRepositorySettings({
                            locationMode: e.target.value,
                            readonly: e.target.value === locationModeOptions[1].value ? true : readonly,
                        });
                    }, fullWidth: true }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeAzure.readonlyTitle", defaultMessage: "Read-only" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeAzure.readonlyDescription", defaultMessage: "Only one cluster should have write access to this repository. All other clusters should be read-only." }), idAria: "azureRepositoryReadonlyDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { hasEmptyLabelSpace: true, fullWidth: true, describedByIds: ['azureRepositoryReadonlyDescription'], isInvalid: Boolean(hasErrors && settingErrors.readonly), error: settingErrors.readonly },
                react_1.default.createElement(eui_1.EuiSwitch, { disabled: locationMode === locationModeOptions[1].value, label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeAzure.readonlyLabel", defaultMessage: "Read-only repository" }), checked: !!readonly, onChange: e => {
                        updateRepositorySettings({
                            readonly: locationMode === locationModeOptions[1].value ? true : e.target.checked,
                        });
                    } })))));
};
