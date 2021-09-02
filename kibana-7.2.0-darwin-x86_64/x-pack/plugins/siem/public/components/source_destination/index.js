"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const network_1 = require("./network");
const source_destination_with_arrows_1 = require("./source_destination_with_arrows");
const EuiFlexItemMarginTop = styled_components_1.default(eui_1.EuiFlexItem) `
  margin-top: 3px;
`;
/**
 * Renders a visualization of network traffic between a source and a destination
 * This component is used by the Netflow row renderer
 */
exports.SourceDestination = recompose_1.pure(({ contextId, destinationBytes, destinationGeoContinentName, destinationGeoCountryName, destinationGeoCountryIsoCode, destinationGeoRegionName, destinationGeoCityName, destinationIp, destinationPackets, destinationPort, eventId, networkBytes, networkCommunityId, networkDirection, networkPackets, networkProtocol, sourceBytes, sourceGeoContinentName, sourceGeoCountryName, sourceGeoCountryIsoCode, sourceGeoRegionName, sourceGeoCityName, sourceIp, sourcePackets, sourcePort, transport, }) => (React.createElement(eui_1.EuiFlexGroup, { alignItems: "center", direction: "column", justifyContent: "center", gutterSize: "none" },
    React.createElement(eui_1.EuiFlexItem, { grow: false },
        React.createElement(network_1.Network, { bytes: networkBytes, packets: networkPackets, communityId: networkCommunityId, contextId: contextId, eventId: eventId, direction: networkDirection, protocol: networkProtocol, transport: transport })),
    React.createElement(EuiFlexItemMarginTop, { grow: false },
        React.createElement(source_destination_with_arrows_1.SourceDestinationWithArrows, { contextId: contextId, destinationBytes: destinationBytes, destinationGeoContinentName: destinationGeoContinentName, destinationGeoCountryName: destinationGeoCountryName, destinationGeoCountryIsoCode: destinationGeoCountryIsoCode, destinationGeoRegionName: destinationGeoRegionName, destinationGeoCityName: destinationGeoCityName, destinationIp: destinationIp, destinationPackets: destinationPackets, destinationPort: destinationPort, eventId: eventId, sourceBytes: sourceBytes, sourceGeoContinentName: sourceGeoContinentName, sourceGeoCountryName: sourceGeoCountryName, sourceGeoCountryIsoCode: sourceGeoCountryIsoCode, sourceGeoRegionName: sourceGeoRegionName, sourceGeoCityName: sourceGeoCityName, sourceIp: sourceIp, sourcePackets: sourcePackets, sourcePort: sourcePort })))));
