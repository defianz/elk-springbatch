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
const fingerprints_1 = require("./fingerprints");
const netflow_columns_1 = require("./netflow_columns");
/**
 * Renders a visual representation of network traffic between hosts,
 * typically for use in a row renderer. In addition to rendering Netflow event
 * data (i.e. `event.action: netflow_flow`), this row renderer is also useful
 * when, for example:
 * - `event.action` is `network_flow` or `socket_open`
 * - `event.category` is `network_traffic`
 * - rendering data from `Zeek` and `Suricata`
 */
exports.Netflow = recompose_1.pure(({ contextId, destinationBytes, destinationGeoContinentName, destinationGeoCountryName, destinationGeoCountryIsoCode, destinationGeoRegionName, destinationGeoCityName, destinationIp, destinationPackets, destinationPort, eventDuration, eventId, eventEnd, eventStart, networkBytes, networkCommunityId, networkDirection, networkPackets, networkProtocol, processName, sourceBytes, sourceGeoContinentName, sourceGeoCountryName, sourceGeoCountryIsoCode, sourceGeoRegionName, sourceGeoCityName, sourcePackets, sourceIp, sourcePort, tlsClientCertificateFingerprintSha1, tlsFingerprintsJa3Hash, tlsServerCertificateFingerprintSha1, transport, userName, }) => (React.createElement(eui_1.EuiFlexGroup, { alignItems: "center", "data-test-subj": "netflow-rows", direction: "column", justifyContent: "center", wrap: true, gutterSize: "none" },
    React.createElement(eui_1.EuiFlexItem, { grow: false },
        React.createElement(netflow_columns_1.NetflowColumns, { contextId: contextId, destinationBytes: destinationBytes, destinationGeoContinentName: destinationGeoContinentName, destinationGeoCountryName: destinationGeoCountryName, destinationGeoCountryIsoCode: destinationGeoCountryIsoCode, destinationGeoRegionName: destinationGeoRegionName, destinationGeoCityName: destinationGeoCityName, destinationIp: destinationIp, destinationPackets: destinationPackets, destinationPort: destinationPort, eventDuration: eventDuration, eventId: eventId, eventEnd: eventEnd, eventStart: eventStart, networkBytes: networkBytes, networkCommunityId: networkCommunityId, networkDirection: networkDirection, networkPackets: networkPackets, networkProtocol: networkProtocol, processName: processName, sourceBytes: sourceBytes, sourceGeoContinentName: sourceGeoContinentName, sourceGeoCountryName: sourceGeoCountryName, sourceGeoCountryIsoCode: sourceGeoCountryIsoCode, sourceGeoRegionName: sourceGeoRegionName, sourceGeoCityName: sourceGeoCityName, sourceIp: sourceIp, sourcePackets: sourcePackets, sourcePort: sourcePort, transport: transport, userName: userName })),
    React.createElement(eui_1.EuiFlexItem, { grow: false },
        React.createElement(fingerprints_1.Fingerprints, { contextId: contextId, eventId: eventId, tlsClientCertificateFingerprintSha1: tlsClientCertificateFingerprintSha1, tlsFingerprintsJa3Hash: tlsFingerprintsJa3Hash, tlsServerCertificateFingerprintSha1: tlsServerCertificateFingerprintSha1 })))));
