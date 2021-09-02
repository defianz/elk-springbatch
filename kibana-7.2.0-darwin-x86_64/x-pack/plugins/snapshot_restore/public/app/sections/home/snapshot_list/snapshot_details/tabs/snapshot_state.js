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
const constants_1 = require("../../../../../constants");
const index_1 = require("../../../../../index");
exports.SnapshotState = ({ state }) => {
    const { core: { i18n }, } = index_1.useAppDependencies();
    const stateMap = {
        [constants_1.SNAPSHOT_STATE.IN_PROGRESS]: {
            icon: react_1.default.createElement(eui_1.EuiLoadingSpinner, { size: "m" }),
            label: i18n.translate('xpack.snapshotRestore.snapshotState.inProgressLabel', {
                defaultMessage: 'Taking snapshot…',
            }),
        },
        [constants_1.SNAPSHOT_STATE.SUCCESS]: {
            icon: react_1.default.createElement(eui_1.EuiIcon, { color: "success", type: "check" }),
            label: i18n.translate('xpack.snapshotRestore.snapshotState.completeLabel', {
                defaultMessage: 'Snapshot complete',
            }),
        },
        [constants_1.SNAPSHOT_STATE.FAILED]: {
            icon: react_1.default.createElement(eui_1.EuiIcon, { color: "danger", type: "cross" }),
            label: i18n.translate('xpack.snapshotRestore.snapshotState.failedLabel', {
                defaultMessage: 'Snapshot failed',
            }),
        },
        [constants_1.SNAPSHOT_STATE.PARTIAL]: {
            icon: react_1.default.createElement(eui_1.EuiIcon, { color: "warning", type: "alert" }),
            label: i18n.translate('xpack.snapshotRestore.snapshotState.partialLabel', {
                defaultMessage: 'Partial failure',
            }),
            tip: i18n.translate('xpack.snapshotRestore.snapshotState.partialTipDescription', {
                defaultMessage: `Global cluster state was stored, but at least one shard wasn't stored successfully. See the 'Failed indices' tab.`,
            }),
        },
        [constants_1.SNAPSHOT_STATE.INCOMPATIBLE]: {
            icon: react_1.default.createElement(eui_1.EuiIcon, { color: "warning", type: "alert" }),
            label: i18n.translate('xpack.snapshotRestore.snapshotState.incompatibleLabel', {
                defaultMessage: 'Incompatible version',
            }),
            tip: i18n.translate('xpack.snapshotRestore.snapshotState.incompatibleTipDescription', {
                defaultMessage: `Snapshot was created with a version of Elasticsearch incompatible with the cluster's version.`,
            }),
        },
    };
    if (!stateMap[state]) {
        // Help debug unexpected state.
        return state;
    }
    const { icon, label, tip } = stateMap[state];
    const iconTip = tip && (react_1.default.createElement(react_1.Fragment, null,
        ' ',
        react_1.default.createElement(eui_1.EuiIconTip, { content: tip })));
    return (react_1.default.createElement(eui_1.EuiFlexGroup, { gutterSize: "xs", alignItems: "center", responsive: false },
        react_1.default.createElement(eui_1.EuiFlexItem, { grow: false }, icon),
        react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
            react_1.default.createElement("div", null,
                label,
                iconTip))));
};
