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
exports.HDFSSettings = ({ repository, updateRepositorySettings, settingErrors, }) => {
    const { core: { i18n: { FormattedMessage }, }, } = index_1.useAppDependencies();
    const { settings: { delegateType, uri, path, loadDefaults, compress, chunkSize, maxRestoreBytesPerSec, maxSnapshotBytesPerSec, readonly, 'security.principal': securityPrincipal, ...rest // For conf.* settings
     }, } = repository;
    const hasErrors = Boolean(Object.keys(settingErrors).length);
    const [additionalConf, setAdditionalConf] = react_1.useState(JSON.stringify(rest, null, 2));
    const [isConfInvalid, setIsConfInvalid] = react_1.useState(false);
    return (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeHDFS.uriTitle", defaultMessage: "URI" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeHDFS.uriDescription", defaultMessage: "The URI address for HDFS." }), idAria: "hdfsRepositoryUriDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeHDFS.uriLabel", defaultMessage: "URI (required)" }), fullWidth: true, describedByIds: ['hdfsRepositoryUriDescription'], isInvalid: Boolean(hasErrors && settingErrors.uri), error: settingErrors.uri },
                react_1.default.createElement(eui_1.EuiFieldText, { prepend: react_1.default.createElement(eui_1.EuiText, { size: "s", id: "hdfsRepositoryUriProtocolDescription" }, 'hdfs://'), defaultValue: uri ? uri.split('hdfs://')[1] : '', fullWidth: true, onChange: e => {
                        updateRepositorySettings({
                            uri: e.target.value ? `hdfs://${e.target.value}` : '',
                        });
                    }, "aria-describedby": "hdfsRepositoryUriDescription hdfsRepositoryUriProtocolDescription" }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeHDFS.pathTitle", defaultMessage: "Path" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeHDFS.pathDescription", defaultMessage: "The file path where data is stored." }), idAria: "hdfsRepositoryPathDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeHDFS.pathLabel", defaultMessage: "Path (required)" }), fullWidth: true, describedByIds: ['hdfsRepositoryPathDescription'], isInvalid: Boolean(hasErrors && settingErrors.path), error: settingErrors.path },
                react_1.default.createElement(eui_1.EuiFieldText, { defaultValue: path || '', fullWidth: true, onChange: e => {
                        updateRepositorySettings({
                            path: e.target.value,
                        });
                    } }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeHDFS.loadDefaultsTitle", defaultMessage: "Load defaults" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeHDFS.loadDefaultsDescription", defaultMessage: "Loads the default Hadoop configuration." }), idAria: "hdfsRepositoryLoadDefaultsDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { hasEmptyLabelSpace: true, fullWidth: true, describedByIds: ['hdfsRepositoryLoadDefaultsDescription'], isInvalid: Boolean(hasErrors && settingErrors.loadDefaults), error: settingErrors.loadDefaults },
                react_1.default.createElement(eui_1.EuiSwitch, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeHDFS.loadDefaultsLabel", defaultMessage: "Load defaults" }), checked: !(loadDefaults === false), onChange: e => {
                        updateRepositorySettings({
                            loadDefaults: e.target.checked,
                        });
                    } }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeHDFS.compressTitle", defaultMessage: "Snapshot compression" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeHDFS.compressDescription", defaultMessage: "Compresses the index mapping and setting files for snapshots. Data files are not compressed." }), idAria: "hdfsRepositoryCompressDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { hasEmptyLabelSpace: true, fullWidth: true, describedByIds: ['hdfsRepositoryCompressDescription'], isInvalid: Boolean(hasErrors && settingErrors.compress), error: settingErrors.compress },
                react_1.default.createElement(eui_1.EuiSwitch, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeHDFS.compressLabel", defaultMessage: "Compress snapshots" }), checked: !(compress === false), onChange: e => {
                        updateRepositorySettings({
                            compress: e.target.checked,
                        });
                    } }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeHDFS.chunkSizeTitle", defaultMessage: "Chunk size" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeHDFS.chunkSizeDescription", defaultMessage: "Breaks files into smaller units when taking snapshots." }), idAria: "hdfsRepositoryChunkSizeDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeHDFS.chunkSizeLabel", defaultMessage: "Chunk size" }), fullWidth: true, describedByIds: ['hdfsRepositoryChunkSizeDescription'], isInvalid: Boolean(hasErrors && settingErrors.chunkSize), error: settingErrors.chunkSize, helpText: text_1.textService.getSizeNotationHelpText() },
                react_1.default.createElement(eui_1.EuiFieldText, { defaultValue: chunkSize || '', fullWidth: true, onChange: e => {
                        updateRepositorySettings({
                            chunkSize: e.target.value,
                        });
                    } }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeHDFS.securityPrincipalTitle", defaultMessage: "Security principal" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeHDFS.securityPrincipalDescription", defaultMessage: "The Kerberos principal to use when connecting to a secured HDFS cluster." }), idAria: "hdfsRepositorySecurityPrincipalDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeHDFS.securityPrincipalLabel", defaultMessage: "Security principal" }), fullWidth: true, describedByIds: ['hdfsRepositorySecurityPrincipalDescription'], isInvalid: Boolean(hasErrors && settingErrors.securityPrincipal), error: settingErrors.securityPrincipal },
                react_1.default.createElement(eui_1.EuiFieldText, { defaultValue: securityPrincipal || '', fullWidth: true, onChange: e => {
                        updateRepositorySettings({
                            'security.principal': e.target.value,
                        });
                    } }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeHDFS.configurationTitle", defaultMessage: "Configuration" }))), description: react_1.default.createElement(react_1.Fragment, null,
                react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeHDFS.configurationDescription", defaultMessage: "Additional JSON format configuration parameters to add to the Hadoop configuration. Only client-oriented properties from the Hadoop core and HDFS files are recognized." })), idAria: "hdfsRepositoryConfigurationDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeHDFS.configurationLabel", defaultMessage: "Configuration" }), fullWidth: true, describedByIds: ['hdfsRepositoryConfigurationDescription'], isInvalid: isConfInvalid, error: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeHDFS.configurationFormatError", defaultMessage: "Invalid JSON format" }), helpText: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeHDFS.configurationKeyDescription", defaultMessage: "Keys should be in the format {confKeyFormat}.", values: {
                        confKeyFormat: react_1.default.createElement(eui_1.EuiCode, null, 'conf.<key>'),
                    } }) },
                react_1.default.createElement(eui_1.EuiCodeEditor, { mode: "json", theme: "textmate", width: "100%", value: additionalConf, setOptions: {
                        showLineNumbers: false,
                        tabSize: 2,
                        maxLines: Infinity,
                    }, editorProps: {
                        $blockScrolling: Infinity,
                    }, showGutter: false, minLines: 6, "aria-label": react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeHDFS.configurationAriaLabel", defaultMessage: "Additional configuration for HDFS repository '{name}'", values: {
                            name,
                        } }), onChange: (value) => {
                        setAdditionalConf(value);
                        try {
                            const parsedConf = JSON.parse(value);
                            setIsConfInvalid(false);
                            updateRepositorySettings({
                                delegateType,
                                uri,
                                path,
                                loadDefaults,
                                compress,
                                chunkSize,
                                'security.principal': securityPrincipal,
                                ...parsedConf,
                            }, true);
                        }
                        catch (e) {
                            setIsConfInvalid(true);
                        }
                    } }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeHDFS.maxSnapshotBytesTitle", defaultMessage: "Max snapshot bytes per second" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeHDFS.maxSnapshotBytesDescription", defaultMessage: "The rate for creating snapshots for each node." }), idAria: "hdfsRepositoryMaxSnapshotBytesDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeHDFS.maxSnapshotBytesLabel", defaultMessage: "Max snapshot bytes per second" }), fullWidth: true, describedByIds: ['hdfsRepositoryMaxSnapshotBytesDescription'], isInvalid: Boolean(hasErrors && settingErrors.maxSnapshotBytesPerSec), error: settingErrors.maxSnapshotBytesPerSec, helpText: text_1.textService.getSizeNotationHelpText() },
                react_1.default.createElement(eui_1.EuiFieldText, { defaultValue: maxSnapshotBytesPerSec || '', fullWidth: true, onChange: e => {
                        updateRepositorySettings({
                            maxSnapshotBytesPerSec: e.target.value,
                        });
                    } }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeHDFS.maxRestoreBytesTitle", defaultMessage: "Max restore bytes per second" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeHDFS.maxRestoreBytesDescription", defaultMessage: "The snapshot restore rate for each node." }), idAria: "hdfsRepositoryMaxRestoreBytesDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeHDFS.maxRestoreBytesLabel", defaultMessage: "Max restore bytes per second" }), fullWidth: true, describedByIds: ['hdfsRepositoryMaxRestoreBytesDescription'], isInvalid: Boolean(hasErrors && settingErrors.maxRestoreBytesPerSec), error: settingErrors.maxRestoreBytesPerSec, helpText: text_1.textService.getSizeNotationHelpText() },
                react_1.default.createElement(eui_1.EuiFieldText, { defaultValue: maxRestoreBytesPerSec || '', fullWidth: true, onChange: e => {
                        updateRepositorySettings({
                            maxRestoreBytesPerSec: e.target.value,
                        });
                    } }))),
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeHDFS.readonlyTitle", defaultMessage: "Read-only" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeHDFS.readonlyDescription", defaultMessage: "Only one cluster should have write access to this repository. All other clusters should be read-only." }), idAria: "hdfsRepositoryReadonlyDescription", fullWidth: true },
            react_1.default.createElement(eui_1.EuiFormRow, { hasEmptyLabelSpace: true, fullWidth: true, describedByIds: ['hdfsRepositoryReadonlyDescription'], isInvalid: Boolean(hasErrors && settingErrors.readonly), error: settingErrors.readonly },
                react_1.default.createElement(eui_1.EuiSwitch, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeHDFS.readonlyLabel", defaultMessage: "Read-only repository" }), checked: !!readonly, onChange: e => {
                        updateRepositorySettings({
                            readonly: e.target.checked,
                        });
                    } })))));
};
