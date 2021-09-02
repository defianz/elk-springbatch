"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const numeral_1 = tslib_1.__importDefault(require("@elastic/numeral"));
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const arrows_1 = require("../arrows");
const helpers_1 = require("../arrows/helpers");
const draggables_1 = require("../draggables");
const formatted_bytes_1 = require("../formatted_bytes");
const i18n = tslib_1.__importStar(require("./translations"));
exports.SOURCE_BYTES_FIELD_NAME = 'source.bytes';
exports.SOURCE_PACKETS_FIELD_NAME = 'source.packets';
exports.DESTINATION_BYTES_FIELD_NAME = 'destination.bytes';
exports.DESTINATION_PACKETS_FIELD_NAME = 'destination.packets';
const Percent = styled_components_1.default.span `
  margin-right: 5px;
`;
const SourceDestinationArrowsContainer = styled_components_1.default(eui_1.EuiFlexGroup) `
  margin: 0 2px;
`;
const Data = styled_components_1.default(eui_1.EuiText) `
  margin: 0 5px;
`;
/**
 * Visualizes the communication from a source as an arrow with draggable badges
 */
const SourceArrow = recompose_1.pure(({ contextId, eventId, sourceBytes, sourceBytesPercent, sourcePackets }) => {
    const sourceArrowHeight = sourceBytesPercent != null
        ? helpers_1.getArrowHeightFromPercent(sourceBytesPercent)
        : helpers_1.DEFAULT_ARROW_HEIGHT;
    return (React.createElement(eui_1.EuiFlexGroup, { alignItems: "center", gutterSize: "none", justifyContent: "center" },
        React.createElement(eui_1.EuiFlexItem, { grow: false },
            React.createElement(arrows_1.ArrowBody, { height: sourceArrowHeight })),
        sourceBytes != null && !isNaN(Number(sourceBytes)) ? (React.createElement(eui_1.EuiFlexItem, { grow: false },
            React.createElement(draggables_1.DefaultDraggable, { field: exports.SOURCE_BYTES_FIELD_NAME, id: `${contextId}-${eventId}-${exports.SOURCE_BYTES_FIELD_NAME}-${sourceBytes}`, value: sourceBytes },
                React.createElement(Data, { size: "xs" },
                    sourceBytesPercent != null ? (React.createElement(Percent, { "data-test-subj": "source-bytes-percent" }, `(${numeral_1.default(sourceBytesPercent).format('0.00')}%)`)) : null,
                    React.createElement("span", { "data-test-subj": "source-bytes" },
                        React.createElement(formatted_bytes_1.PreferenceFormattedBytes, { value: sourceBytes })))))) : null,
        React.createElement(eui_1.EuiFlexItem, { grow: false },
            React.createElement(arrows_1.ArrowBody, { "data-test-subj": "source-arrow", height: sourceArrowHeight })),
        sourcePackets != null && !isNaN(Number(sourcePackets)) ? (React.createElement(eui_1.EuiFlexItem, { grow: false },
            React.createElement(draggables_1.DefaultDraggable, { field: exports.SOURCE_PACKETS_FIELD_NAME, id: `${contextId}-${eventId}-${exports.SOURCE_PACKETS_FIELD_NAME}-${sourcePackets}`, value: sourcePackets },
                React.createElement(Data, { size: "xs" },
                    React.createElement("span", { "data-test-subj": "source-packets" }, `${sourcePackets} ${i18n.PACKETS}`))))) : null,
        React.createElement(eui_1.EuiFlexItem, { grow: false },
            React.createElement(arrows_1.ArrowBody, { height: sourceArrowHeight })),
        React.createElement(eui_1.EuiFlexItem, { grow: false },
            React.createElement(arrows_1.ArrowHead, { direction: "arrowRight" }))));
});
/**
 * Visualizes the communication from a destination as an arrow with draggable
 * badges
 */
const DestinationArrow = recompose_1.pure(({ contextId, eventId, destinationBytes, destinationBytesPercent, destinationPackets }) => {
    const destinationArrowHeight = destinationBytesPercent != null
        ? helpers_1.getArrowHeightFromPercent(destinationBytesPercent)
        : helpers_1.DEFAULT_ARROW_HEIGHT;
    return (React.createElement(eui_1.EuiFlexGroup, { alignItems: "center", gutterSize: "none", justifyContent: "center" },
        React.createElement(eui_1.EuiFlexItem, { grow: false },
            React.createElement(arrows_1.ArrowHead, { direction: "arrowLeft" })),
        React.createElement(eui_1.EuiFlexItem, { grow: false },
            React.createElement(arrows_1.ArrowBody, { height: destinationArrowHeight })),
        destinationBytes != null && !isNaN(Number(destinationBytes)) ? (React.createElement(eui_1.EuiFlexItem, { grow: false },
            React.createElement(draggables_1.DefaultDraggable, { field: exports.DESTINATION_BYTES_FIELD_NAME, id: `${contextId}-${eventId}-${exports.DESTINATION_BYTES_FIELD_NAME}-${destinationBytes}`, value: destinationBytes },
                React.createElement(Data, { size: "xs" },
                    destinationBytesPercent != null ? (React.createElement(Percent, { "data-test-subj": "destination-bytes-percent" }, `(${numeral_1.default(destinationBytesPercent).format('0.00')}%)`)) : null,
                    React.createElement("span", { "data-test-subj": "destination-bytes" },
                        React.createElement(formatted_bytes_1.PreferenceFormattedBytes, { value: destinationBytes })))))) : null,
        React.createElement(eui_1.EuiFlexItem, { grow: false },
            React.createElement(arrows_1.ArrowBody, { height: destinationArrowHeight })),
        destinationPackets != null && !isNaN(Number(destinationPackets)) ? (React.createElement(eui_1.EuiFlexItem, { grow: false },
            React.createElement(draggables_1.DefaultDraggable, { field: exports.DESTINATION_PACKETS_FIELD_NAME, id: `${contextId}-${eventId}-${exports.DESTINATION_PACKETS_FIELD_NAME}-${destinationPackets}`, value: destinationPackets },
                React.createElement(Data, { size: "xs" },
                    React.createElement("span", { "data-test-subj": "destination-packets" }, `${numeral_1.default(destinationPackets).format('0,0')} ${i18n.PACKETS}`))))) : null,
        React.createElement(eui_1.EuiFlexItem, { grow: false },
            React.createElement(arrows_1.ArrowBody, { height: destinationArrowHeight }))));
});
/**
 * Visualizes the communication between a source and a destination using arrows
 * that grow in thickness based on the percentage of bytes transferred, and stats badges
 */
exports.SourceDestinationArrows = recompose_1.pure(({ contextId, destinationBytes, destinationPackets, eventId, sourceBytes, sourcePackets }) => {
    const maybeSourceBytes = sourceBytes != null && helpers_1.hasOneValue(sourceBytes) ? sourceBytes[0] : undefined;
    const maybeSourcePackets = sourcePackets != null && helpers_1.hasOneValue(sourcePackets) ? sourcePackets[0] : undefined;
    const maybeDestinationBytes = destinationBytes != null && helpers_1.hasOneValue(destinationBytes) ? destinationBytes[0] : undefined;
    const maybeDestinationPackets = destinationPackets != null && helpers_1.hasOneValue(destinationPackets)
        ? destinationPackets[0]
        : undefined;
    const maybeSourceBytesPercent = maybeSourceBytes != null && maybeDestinationBytes != null
        ? helpers_1.getPercent({
            numerator: Number(maybeSourceBytes),
            denominator: Number(maybeSourceBytes) + Number(maybeDestinationBytes),
        })
        : undefined;
    const maybeDestinationBytesPercent = maybeSourceBytesPercent != null ? 100 - maybeSourceBytesPercent : undefined;
    return (React.createElement(SourceDestinationArrowsContainer, { alignItems: "center", "data-test-subj": "source-destination-arrows-container", justifyContent: "center", direction: "column", gutterSize: "none" },
        maybeSourceBytes != null ? (React.createElement(eui_1.EuiFlexItem, { grow: false },
            React.createElement(SourceArrow, { contextId: contextId, sourceBytes: maybeSourceBytes, sourcePackets: maybeSourcePackets, sourceBytesPercent: maybeSourceBytesPercent, eventId: eventId }))) : null,
        maybeDestinationBytes != null ? (React.createElement(eui_1.EuiFlexItem, { grow: false },
            React.createElement(DestinationArrow, { contextId: contextId, destinationBytes: maybeDestinationBytes, destinationPackets: maybeDestinationPackets, destinationBytesPercent: maybeDestinationBytesPercent, eventId: eventId }))) : null));
});
