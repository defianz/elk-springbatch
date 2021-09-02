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
const index_1 = require("../../../../../index");
exports.HDFSDetails = ({ repository }) => {
    const { core: { i18n: { FormattedMessage }, }, } = index_1.useAppDependencies();
    const { settings } = repository;
    const { uri, path, loadDefaults, compress, chunkSize, readonly, maxSnapshotBytesPerSec, maxRestoreBytesPerSec, 'security.principal': securityPrincipal, ...rest } = settings;
    const listItems = [
        {
            title: (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.typeHDFS.uriLabel", defaultMessage: "URI" })),
            description: uri || '',
        },
        {
            title: (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.typeHDFS.pathLabel", defaultMessage: "Path" })),
            description: path || '',
        },
    ];
    if (loadDefaults !== undefined) {
        listItems.push({
            title: (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.typeHDFS.loadDefaultsLabel", defaultMessage: "Load defaults" })),
            description: String(loadDefaults),
        });
    }
    if (compress !== undefined) {
        listItems.push({
            title: (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.typeHDFS.compressLabel", defaultMessage: "Snapshot compression" })),
            description: String(compress),
        });
    }
    if (chunkSize !== undefined) {
        listItems.push({
            title: (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.typeHDFS.chunkSizeLabel", defaultMessage: "Chunk size" })),
            description: String(chunkSize),
        });
    }
    if (maxSnapshotBytesPerSec !== undefined) {
        listItems.push({
            title: (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.typeHDFS.maxSnapshotBytesLabel", defaultMessage: "Max snapshot bytes per second" })),
            description: maxSnapshotBytesPerSec,
        });
    }
    if (maxRestoreBytesPerSec !== undefined) {
        listItems.push({
            title: (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.typeHDFS.maxRestoreBytesLabel", defaultMessage: "Max restore bytes per second" })),
            description: maxRestoreBytesPerSec,
        });
    }
    if (readonly !== undefined) {
        listItems.push({
            title: (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.typeHDFS.readonlyLabel", defaultMessage: "Read-only" })),
            description: String(readonly),
        });
    }
    if (securityPrincipal !== undefined) {
        listItems.push({
            title: (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.typeHDFS.securityPrincipalLabel", defaultMessage: "Security principal" })),
            description: securityPrincipal,
        });
    }
    Object.keys(rest).forEach(key => {
        listItems.push({
            title: react_1.default.createElement(react_1.Fragment, null, key),
            description: String(settings[key]),
        });
    });
    return (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
            react_1.default.createElement("h3", null,
                react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.settingsTitle", defaultMessage: "Settings" }))),
        react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
        react_1.default.createElement(eui_1.EuiDescriptionList, { listItems: listItems })));
};
