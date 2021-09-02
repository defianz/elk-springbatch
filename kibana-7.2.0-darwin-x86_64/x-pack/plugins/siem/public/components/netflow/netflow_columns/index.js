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
const source_destination_1 = require("../../source_destination");
const duration_event_start_end_1 = require("./duration_event_start_end");
const user_process_1 = require("./user_process");
exports.EVENT_START = 'event.start';
exports.EVENT_END = 'event.end';
const EuiFlexItemMarginRight = styled_components_1.default(eui_1.EuiFlexItem) `
  margin-right: 10px;
`;
/**
 * Renders columns of draggable badges that describe both Netflow data, or more
 * generally, hosts interacting over a network connection. This component is
 * consumed by the `Netflow` visualization / row renderer.
 *
 * This component will allow columns to wrap if constraints on width prevent all
 * the columns from fitting on a single horizontal row
 */
exports.NetflowColumns = recompose_1.pure(({ contextId, destinationBytes, destinationGeoContinentName, destinationGeoCountryName, destinationGeoCountryIsoCode, destinationGeoRegionName, destinationGeoCityName, destinationIp, destinationPackets, destinationPort, eventDuration, eventId, eventEnd, eventStart, networkBytes, networkCommunityId, networkDirection, networkPackets, networkProtocol, processName, sourceBytes, sourceGeoContinentName, sourceGeoCountryName, sourceGeoCountryIsoCode, sourceGeoRegionName, sourceGeoCityName, sourceIp, sourcePackets, sourcePort, transport, userName, }) => (React.createElement(eui_1.EuiFlexGroup, { "data-test-subj": "netflow-columns", gutterSize: "none", justifyContent: "center", wrap: true },
    React.createElement(EuiFlexItemMarginRight, { grow: false },
        React.createElement(user_process_1.UserProcess, { contextId: contextId, eventId: eventId, processName: processName, userName: userName })),
    React.createElement(EuiFlexItemMarginRight, { grow: false },
        React.createElement(duration_event_start_end_1.DurationEventStartEnd, { contextId: contextId, eventDuration: eventDuration, eventId: eventId, eventEnd: eventEnd, eventStart: eventStart })),
    React.createElement(eui_1.EuiFlexItem, { grow: false },
        React.createElement(source_destination_1.SourceDestination, { contextId: contextId, destinationBytes: destinationBytes, destinationGeoContinentName: destinationGeoContinentName, destinationGeoCountryName: destinationGeoCountryName, destinationGeoCountryIsoCode: destinationGeoCountryIsoCode, destinationGeoRegionName: destinationGeoRegionName, destinationGeoCityName: destinationGeoCityName, destinationIp: destinationIp, destinationPackets: destinationPackets, destinationPort: destinationPort, eventId: eventId, networkBytes: networkBytes, networkCommunityId: networkCommunityId, networkDirection: networkDirection, networkPackets: networkPackets, networkProtocol: networkProtocol, sourceBytes: sourceBytes, sourceGeoContinentName: sourceGeoContinentName, sourceGeoCountryName: sourceGeoCountryName, sourceGeoCountryIsoCode: sourceGeoCountryIsoCode, sourceGeoRegionName: sourceGeoRegionName, sourceGeoCityName: sourceGeoCityName, sourceIp: sourceIp, sourcePackets: sourcePackets, sourcePort: sourcePort, transport: transport })))));
