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
exports.GCSDetails = ({ repository }) => {
    const { core: { i18n: { FormattedMessage }, }, } = index_1.useAppDependencies();
    const { settings: { bucket, client, basePath, compress, chunkSize, readonly, maxRestoreBytesPerSec, maxSnapshotBytesPerSec, }, } = repository;
    const listItems = [
        {
            title: (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.typeGCS.bucketLabel", defaultMessage: "Bucket" })),
            description: bucket || '',
        },
    ];
    if (client !== undefined) {
        listItems.push({
            title: (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.typeGCS.clientLabel", defaultMessage: "Client" })),
            description: client,
        });
    }
    if (basePath !== undefined) {
        listItems.push({
            title: (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.typeGCS.basePathLabel", defaultMessage: "Base path" })),
            description: basePath,
        });
    }
    if (compress !== undefined) {
        listItems.push({
            title: (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.typeGCS.compressLabel", defaultMessage: "Snapshot compression" })),
            description: String(compress),
        });
    }
    if (chunkSize !== undefined) {
        listItems.push({
            title: (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.typeGCS.chunkSizeLabel", defaultMessage: "Chunk size" })),
            description: String(chunkSize),
        });
    }
    if (maxSnapshotBytesPerSec !== undefined) {
        listItems.push({
            title: (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.typeGCS.maxSnapshotBytesLabel", defaultMessage: "Max snapshot bytes per second" })),
            description: maxSnapshotBytesPerSec,
        });
    }
    if (maxRestoreBytesPerSec !== undefined) {
        listItems.push({
            title: (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.typeGCS.maxRestoreBytesLabel", defaultMessage: "Max restore bytes per second" })),
            description: maxRestoreBytesPerSec,
        });
    }
    if (readonly !== undefined) {
        listItems.push({
            title: (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.typeGCS.readonlyLabel", defaultMessage: "Read-only" })),
            description: String(readonly),
        });
    }
    return (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
            react_1.default.createElement("h3", null,
                react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.settingsTitle", defaultMessage: "Settings" }))),
        react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
        react_1.default.createElement(eui_1.EuiDescriptionList, { listItems: listItems })));
};
