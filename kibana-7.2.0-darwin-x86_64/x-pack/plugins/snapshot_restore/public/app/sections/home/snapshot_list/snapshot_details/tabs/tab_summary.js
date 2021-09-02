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
const text_1 = require("../../../../../services/text");
const components_1 = require("../../../../../components");
const snapshot_state_1 = require("./snapshot_state");
exports.TabSummary = ({ snapshotDetails }) => {
    const { core: { i18n: { FormattedMessage }, }, } = index_1.useAppDependencies();
    const includeGlobalStateToHumanizedMap = {
        0: (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.snapshotDetails.itemIncludeGlobalStateNoLabel", defaultMessage: "No" })),
        1: (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.snapshotDetails.itemIncludeGlobalStateYesLabel", defaultMessage: "Yes" })),
    };
    const { versionId, version, 
    // TODO: Add a tooltip explaining that: a false value means that the cluster global state
    // is not stored as part of the snapshot.
    includeGlobalState, indices, state, startTimeInMillis, endTimeInMillis, durationInMillis, uuid, } = snapshotDetails;
    const indicesList = indices.length ? (react_1.default.createElement("ul", null, indices.map((index) => (react_1.default.createElement("li", { key: index },
        react_1.default.createElement(eui_1.EuiTitle, { size: "xs" },
            react_1.default.createElement("span", null, index))))))) : (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.snapshotDetails.itemIndicesNoneLabel", "data-test-subj": "srSnapshotDetailsIndicesNoneTitle", defaultMessage: "-" }));
    return (react_1.default.createElement(eui_1.EuiDescriptionList, { textStyle: "reverse" },
        react_1.default.createElement(eui_1.EuiFlexGroup, null,
            react_1.default.createElement(eui_1.EuiFlexItem, { "data-test-subj": "srSnapshotDetailsVersionItem" },
                react_1.default.createElement(eui_1.EuiDescriptionListTitle, null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.snapshotDetails.itemVersionLabel", "data-test-subj": "srSnapshotDetailsVersionTitle", defaultMessage: "Version / Version ID" })),
                react_1.default.createElement(eui_1.EuiDescriptionListDescription, { className: "eui-textBreakWord", "data-test-subj": "srSnapshotDetailsVersionDescription" },
                    version,
                    " / ",
                    versionId)),
            react_1.default.createElement(eui_1.EuiFlexItem, { "data-test-subj": "srSnapshotDetailsIncludeGlobalUuidItem" },
                react_1.default.createElement(eui_1.EuiDescriptionListTitle, null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.snapshotDetails.itemUuidLabel", "data-test-subj": "srSnapshotDetailsUuidTitle", defaultMessage: "UUID" })),
                react_1.default.createElement(eui_1.EuiDescriptionListDescription, { className: "eui-textBreakWord", "data-test-subj": "srSnapshotDetailUuidDescription" }, uuid))),
        react_1.default.createElement(eui_1.EuiFlexGroup, null,
            react_1.default.createElement(eui_1.EuiFlexItem, { "data-test-subj": "srSnapshotDetailsStateItem" },
                react_1.default.createElement(eui_1.EuiDescriptionListTitle, null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.snapshotDetails.itemStateLabel", "data-test-subj": "srSnapshotDetailsStateTitle", defaultMessage: "State" })),
                react_1.default.createElement(eui_1.EuiDescriptionListDescription, { className: "eui-textBreakWord", "data-test-subj": "srSnapshotDetailStateDescription" },
                    react_1.default.createElement(snapshot_state_1.SnapshotState, { state: state }))),
            react_1.default.createElement(eui_1.EuiFlexItem, { "data-test-subj": "srSnapshotDetailsIncludeGlobalStateItem" },
                react_1.default.createElement(eui_1.EuiDescriptionListTitle, null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.snapshotDetails.itemIncludeGlobalStateLabel", "data-test-subj": "srSnapshotDetailsIncludeGlobalStateTitle", defaultMessage: "Includes global state" })),
                react_1.default.createElement(eui_1.EuiDescriptionListDescription, { className: "eui-textBreakWord", "data-test-subj": "srSnapshotDetailIncludeGlobalStateDescription" }, includeGlobalStateToHumanizedMap[includeGlobalState]))),
        react_1.default.createElement(eui_1.EuiFlexGroup, null,
            react_1.default.createElement(eui_1.EuiFlexItem, { "data-test-subj": "srSnapshotDetailsIndicesItem" },
                react_1.default.createElement(eui_1.EuiDescriptionListTitle, null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.snapshotDetails.itemIndicesLabel", "data-test-subj": "srSnapshotDetailsIndicesTitle", defaultMessage: "Indices ({indicesCount})", values: { indicesCount: indices.length } })),
                react_1.default.createElement(eui_1.EuiDescriptionListDescription, { className: "eui-textBreakWord", "data-test-subj": "srSnapshotDetailIndicesDescription" },
                    react_1.default.createElement(eui_1.EuiText, null, indicesList)))),
        react_1.default.createElement(eui_1.EuiFlexGroup, null,
            react_1.default.createElement(eui_1.EuiFlexItem, { "data-test-subj": "srSnapshotDetailsStartTimeItem" },
                react_1.default.createElement(eui_1.EuiDescriptionListTitle, null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.snapshotDetails.itemStartTimeLabel", "data-test-subj": "srSnapshotDetailsStartTimeTitle", defaultMessage: "Start time" })),
                react_1.default.createElement(eui_1.EuiDescriptionListDescription, { className: "eui-textBreakWord", "data-test-subj": "srSnapshotDetailStartTimeDescription" },
                    react_1.default.createElement(components_1.DataPlaceholder, { data: startTimeInMillis }, text_1.formatDate(startTimeInMillis)))),
            react_1.default.createElement(eui_1.EuiFlexItem, { "data-test-subj": "srSnapshotDetailsEndTimeItem" },
                react_1.default.createElement(eui_1.EuiDescriptionListTitle, null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.snapshotDetails.itemEndTimeLabel", "data-test-subj": "srSnapshotDetailsEndTimeTitle", defaultMessage: "End time" })),
                react_1.default.createElement(eui_1.EuiDescriptionListDescription, { className: "eui-textBreakWord", "data-test-subj": "srSnapshotDetailEndTimeDescription" }, state === constants_1.SNAPSHOT_STATE.IN_PROGRESS ? (react_1.default.createElement(eui_1.EuiLoadingSpinner, { size: "m" })) : (react_1.default.createElement(components_1.DataPlaceholder, { data: endTimeInMillis }, text_1.formatDate(endTimeInMillis)))))),
        react_1.default.createElement(eui_1.EuiFlexGroup, null,
            react_1.default.createElement(eui_1.EuiFlexItem, { "data-test-subj": "srSnapshotDetailsDurationItem" },
                react_1.default.createElement(eui_1.EuiDescriptionListTitle, null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.snapshotDetails.itemDurationLabel", "data-test-subj": "srSnapshotDetailsDurationTitle", defaultMessage: "Duration" })),
                react_1.default.createElement(eui_1.EuiDescriptionListDescription, { className: "eui-textBreakWord", "data-test-subj": "srSnapshotDetailDurationDescription" }, state === constants_1.SNAPSHOT_STATE.IN_PROGRESS ? (react_1.default.createElement(eui_1.EuiLoadingSpinner, { size: "m" })) : (react_1.default.createElement(components_1.DataPlaceholder, { data: durationInMillis },
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.snapshotDetails.itemDurationValueLabel", "data-test-subj": "srSnapshotDetailsDurationValue", defaultMessage: "{seconds} {seconds, plural, one {second} other {seconds}}", values: { seconds: Math.ceil(durationInMillis / 1000) } }))))))));
};
