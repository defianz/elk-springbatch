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
exports.S3Details = ({ repository }) => {
    const { core: { i18n: { FormattedMessage }, }, } = index_1.useAppDependencies();
    const { settings: { bucket, client, basePath, compress, chunkSize, serverSideEncryption, bufferSize, cannedAcl, storageClass, readonly, maxRestoreBytesPerSec, maxSnapshotBytesPerSec, }, } = repository;
    const listItems = [
        {
            title: (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.typeS3.bucketLabel", defaultMessage: "Bucket" })),
            description: bucket || '',
        },
    ];
    if (client !== undefined) {
        listItems.push({
            title: (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.typeS3.clientLabel", defaultMessage: "Client" })),
            description: client,
        });
    }
    if (basePath !== undefined) {
        listItems.push({
            title: (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.typeS3.basePathLabel", defaultMessage: "Base path" })),
            description: basePath,
        });
    }
    if (compress !== undefined) {
        listItems.push({
            title: (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.typeS3.compressLabel", defaultMessage: "Snapshot compression" })),
            description: String(compress),
        });
    }
    if (chunkSize !== undefined) {
        listItems.push({
            title: (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.typeS3.chunkSizeLabel", defaultMessage: "Chunk size" })),
            description: String(chunkSize),
        });
    }
    if (serverSideEncryption !== undefined) {
        listItems.push({
            title: (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.typeS3.serverSideEncryptionLabel", defaultMessage: "Server-side encryption" })),
            description: String(serverSideEncryption),
        });
    }
    if (bufferSize !== undefined) {
        listItems.push({
            title: (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.typeS3.bufferSizeLabel", defaultMessage: "Buffer size" })),
            description: bufferSize,
        });
    }
    if (cannedAcl !== undefined) {
        listItems.push({
            title: (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.typeS3.cannedAclLabel", defaultMessage: "Canned ACL" })),
            description: cannedAcl,
        });
    }
    if (storageClass !== undefined) {
        listItems.push({
            title: (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.typeS3.storageClassLabel", defaultMessage: "Storage class" })),
            description: storageClass,
        });
    }
    if (maxSnapshotBytesPerSec !== undefined) {
        listItems.push({
            title: (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.typeS3.maxSnapshotBytesLabel", defaultMessage: "Max snapshot bytes per second" })),
            description: maxSnapshotBytesPerSec,
        });
    }
    if (maxRestoreBytesPerSec !== undefined) {
        listItems.push({
            title: (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.typeS3.maxRestoreBytesLabel", defaultMessage: "Max restore bytes per second" })),
            description: maxRestoreBytesPerSec,
        });
    }
    if (readonly !== undefined) {
        listItems.push({
            title: (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.typeS3.readonlyLabel", defaultMessage: "Read-only" })),
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
