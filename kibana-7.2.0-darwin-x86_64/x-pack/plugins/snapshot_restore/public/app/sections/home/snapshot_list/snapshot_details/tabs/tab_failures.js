"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const eui_1 = require("@elastic/eui");
const constants_1 = require("../../../../../constants");
const index_1 = require("../../../../../index");
exports.TabFailures = ({ indexFailures, snapshotState }) => {
    const { core: { i18n: { FormattedMessage }, }, } = index_1.useAppDependencies();
    if (!indexFailures.length) {
        // If the snapshot is in progress then we still might encounter errors later.
        if (snapshotState === constants_1.SNAPSHOT_STATE.IN_PROGRESS) {
            return (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.snapshotDetails.snapshotIsBeingCreatedMessage", defaultMessage: "Snapshot is being created." }));
        }
        else {
            return (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.snapshotDetails.noIndexFailuresMessage", defaultMessage: "All indices were stored successfully." }));
        }
    }
    return indexFailures.map((indexObject, count) => {
        const { index, failures } = indexObject;
        return (react_1.default.createElement("div", { key: index },
            react_1.default.createElement(eui_1.EuiTitle, { size: "xs" },
                react_1.default.createElement("h3", null, index)),
            react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
            failures.map((failure, failuresCount) => {
                const { status, reason, shard_id: shardId } = failure;
                return (react_1.default.createElement("div", { key: `${shardId}${reason}` },
                    react_1.default.createElement(eui_1.EuiText, { size: "xs" },
                        react_1.default.createElement("p", null,
                            react_1.default.createElement("strong", null,
                                react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.snapshotDetails.failureShardTitle", defaultMessage: "Shard {shardId}", values: { shardId } })))),
                    react_1.default.createElement(eui_1.EuiCodeBlock, { paddingSize: "s" },
                        status,
                        ": ",
                        reason),
                    failuresCount < failures.length - 1 ? react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }) : undefined));
            }),
            count < indexFailures.length - 1 ? react_1.default.createElement(eui_1.EuiSpacer, { size: "l" }) : undefined));
    });
};
