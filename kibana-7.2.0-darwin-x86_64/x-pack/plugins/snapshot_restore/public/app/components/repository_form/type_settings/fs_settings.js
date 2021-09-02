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
exports.FSSettings = ({ repository, updateRepositorySettings, settingErrors, }) => {
    const { core: { i18n }, } = index_1.useAppDependencies();
    const { FormattedMessage } = i18n;
    const { settings: { location, compress, chunkSize, maxRestoreBytesPerSec, maxSnapshotBytesPerSec, readonly, }, } = repository;
    const hasErrors = Boolean(Object.keys(settingErrors).length);
    return (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeFS.locationTitle", defaultMessage: "File system location" }))), description: react_1.default.createElement(react_1.Fragment, null,
                react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryFor.typeFS.locationDescription", defaultMessage: "The location must be registered in the {settingKey} setting on all master and data nodes.", values: {
                        settingKey: react_1.default.createElement(eui_1.EuiCode, null, "path.repo"),
                    } })), idAria: "fsRepositoryLocationDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeFS.locationLabel", defaultMessage: "Location (required)" }), fullWidth: true, describedByIds: ['fsRepositoryLocationDescription'], isInvalid: Boolean(hasErrors && settingErrors.location), error: settingErrors.location },
                react_1.default.createElement(eui_1.EuiFieldText, { defaultValue: location || '', fullWidth: true, onChange: e => {
                        updateRepositorySettings({
                            location: e.target.value,
                        });
                    } }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeFS.compressTitle", defaultMessage: "Snapshot compression" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeFS.compressDescription", defaultMessage: "Compresses the index mapping and setting files for snapshots. Data files are not compressed." }), idAria: "fsRepositoryCompressDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { hasEmptyLabelSpace: true, fullWidth: true, describedByIds: ['fsRepositoryCompressDescription'], isInvalid: Boolean(hasErrors && settingErrors.compress), error: settingErrors.compress },
                react_1.default.createElement(eui_1.EuiSwitch, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeFS.compressLabel", defaultMessage: "Compress snapshots" }), checked: !!compress, onChange: e => {
                        updateRepositorySettings({
                            compress: e.target.checked,
                        });
                    } }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeFS.chunkSizeTitle", defaultMessage: "Chunk size" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeFS.chunkSizeDescription", defaultMessage: "Breaks files into smaller units when taking snapshots." }), idAria: "fsRepositoryChunkSizeDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeFS.chunkSizeLabel", defaultMessage: "Chunk size" }), fullWidth: true, describedByIds: ['fsRepositoryChunkSizeDescription'], isInvalid: Boolean(hasErrors && settingErrors.chunkSize), error: settingErrors.chunkSize, helpText: text_1.textService.getSizeNotationHelpText() },
                react_1.default.createElement(eui_1.EuiFieldText, { defaultValue: chunkSize || '', fullWidth: true, onChange: e => {
                        updateRepositorySettings({
                            chunkSize: e.target.value,
                        });
                    } }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeFS.maxSnapshotBytesTitle", defaultMessage: "Max snapshot bytes per second" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeFS.maxSnapshotBytesDescription", defaultMessage: "The rate for creating snapshots for each node." }), idAria: "fsRepositoryMaxSnapshotBytesDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeFS.maxSnapshotBytesLabel", defaultMessage: "Max snapshot bytes per second" }), fullWidth: true, describedByIds: ['fsRepositoryMaxSnapshotBytesDescription'], isInvalid: Boolean(hasErrors && settingErrors.maxSnapshotBytesPerSec), error: settingErrors.maxSnapshotBytesPerSec, helpText: text_1.textService.getSizeNotationHelpText() },
                react_1.default.createElement(eui_1.EuiFieldText, { defaultValue: maxSnapshotBytesPerSec || '', fullWidth: true, onChange: e => {
                        updateRepositorySettings({
                            maxSnapshotBytesPerSec: e.target.value,
                        });
                    } }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeFS.maxRestoreBytesTitle", defaultMessage: "Max restore bytes per second" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeFS.maxRestoreBytesDescription", defaultMessage: "The snapshot restore rate for each node." }), idAria: "fsRepositoryMaxRestoreBytesDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeFS.maxRestoreBytesLabel", defaultMessage: "Max restore bytes per second" }), fullWidth: true, describedByIds: ['fsRepositoryMaxRestoreBytesDescription'], isInvalid: Boolean(hasErrors && settingErrors.maxRestoreBytesPerSec), error: settingErrors.maxRestoreBytesPerSec, helpText: text_1.textService.getSizeNotationHelpText() },
                react_1.default.createElement(eui_1.EuiFieldText, { defaultValue: maxRestoreBytesPerSec || '', fullWidth: true, onChange: e => {
                        updateRepositorySettings({
                            maxRestoreBytesPerSec: e.target.value,
                        });
                    } }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeFS.readonlyTitle", defaultMessage: "Read-only" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeFS.readonlyDescription", defaultMessage: "Only one cluster should have write access to this repository. All other clusters should be read-only." }), idAria: "fsRepositoryReadonlyDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { hasEmptyLabelSpace: true, fullWidth: true, describedByIds: ['fsRepositoryReadonlyDescription'], isInvalid: Boolean(hasErrors && settingErrors.readonly), error: settingErrors.readonly },
                react_1.default.createElement(eui_1.EuiSwitch, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeFS.readonlyLabel", defaultMessage: "Read-only repository" }), checked: !!readonly, onChange: e => {
                        updateRepositorySettings({
                            readonly: e.target.checked,
                        });
                    } })))));
};
