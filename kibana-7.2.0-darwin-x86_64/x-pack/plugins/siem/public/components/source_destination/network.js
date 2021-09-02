"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const fp_1 = require("lodash/fp");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const direction_1 = require("../direction");
const draggables_1 = require("../draggables");
const i18n = tslib_1.__importStar(require("./translations"));
const field_names_1 = require("./field_names");
const formatted_bytes_1 = require("../formatted_bytes");
const EuiFlexItemMarginRight = styled_components_1.default(eui_1.EuiFlexItem) `
  margin-right: 3px;
`;
const Stats = styled_components_1.default(eui_1.EuiText) `
  margin: 0 5px;
`;
/**
 * Renders a row of draggable badges containing fields from the
 * `Network` category of fields
 */
exports.Network = recompose_1.pure(({ bytes, communityId, contextId, direction, eventId, packets, protocol, transport }) => (React.createElement(eui_1.EuiFlexGroup, { alignItems: "center", justifyContent: "center", gutterSize: "none" },
    direction != null
        ? fp_1.uniq(direction).map(dir => (React.createElement(EuiFlexItemMarginRight, { grow: false, key: dir },
            React.createElement(direction_1.DirectionBadge, { contextId: contextId, eventId: eventId, direction: dir }))))
        : null,
    protocol != null
        ? fp_1.uniq(protocol).map(proto => (React.createElement(EuiFlexItemMarginRight, { grow: false, key: proto },
            React.createElement(draggables_1.DraggableBadge, { contextId: contextId, "data-test-subj": "network-protocol", eventId: eventId, field: field_names_1.NETWORK_PROTOCOL_FIELD_NAME, value: proto }))))
        : null,
    bytes != null
        ? fp_1.uniq(bytes).map(b => !isNaN(Number(b)) ? (React.createElement(EuiFlexItemMarginRight, { grow: false, key: b },
            React.createElement(draggables_1.DefaultDraggable, { field: field_names_1.NETWORK_BYTES_FIELD_NAME, id: `${contextId}-${eventId}-${field_names_1.NETWORK_BYTES_FIELD_NAME}-${b}`, value: b },
                React.createElement(Stats, { size: "xs" },
                    React.createElement("span", { "data-test-subj": "network-bytes" },
                        React.createElement(formatted_bytes_1.PreferenceFormattedBytes, { value: b })))))) : null)
        : null,
    packets != null
        ? fp_1.uniq(packets).map(p => (React.createElement(EuiFlexItemMarginRight, { grow: false, key: p },
            React.createElement(draggables_1.DefaultDraggable, { field: field_names_1.NETWORK_PACKETS_FIELD_NAME, id: `${contextId}-${eventId}-${field_names_1.NETWORK_PACKETS_FIELD_NAME}-${p}`, value: p },
                React.createElement(Stats, { size: "xs" },
                    React.createElement("span", { "data-test-subj": "network-packets" }, `${p} ${i18n.PACKETS}`))))))
        : null,
    transport != null
        ? fp_1.uniq(transport).map(trans => (React.createElement(EuiFlexItemMarginRight, { grow: false, key: trans },
            React.createElement(draggables_1.DraggableBadge, { contextId: contextId, "data-test-subj": "network-transport", eventId: eventId, field: field_names_1.NETWORK_TRANSPORT_FIELD_NAME, value: trans }))))
        : null,
    communityId != null
        ? fp_1.uniq(communityId).map(trans => (React.createElement(eui_1.EuiFlexItem, { grow: false, key: trans },
            React.createElement(draggables_1.DraggableBadge, { contextId: contextId, "data-test-subj": "network-community-id", eventId: eventId, field: field_names_1.NETWORK_COMMUNITY_ID_FIELD_NAME, value: trans }))))
        : null)));
