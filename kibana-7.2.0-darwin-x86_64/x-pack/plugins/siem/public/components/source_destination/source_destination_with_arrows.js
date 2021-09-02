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
const source_destination_arrows_1 = require("./source_destination_arrows");
const source_destination_ip_1 = require("./source_destination_ip");
/**
 * Visualizes the communication between a source and a destination by
 * providing an interactive (draggable, hyperlinked) visualization,
 * which contains both the source and destination. (See
 * `SourceDestinationIp` ) for details on how the source and destination
 * are visually represented.
 */
exports.SourceDestinationWithArrows = recompose_1.pure(({ contextId, destinationBytes, destinationGeoContinentName, destinationGeoCountryName, destinationGeoCountryIsoCode, destinationGeoRegionName, destinationGeoCityName, destinationIp, destinationPackets, destinationPort, eventId, sourceBytes, sourceGeoContinentName, sourceGeoCountryName, sourceGeoCountryIsoCode, sourceGeoRegionName, sourceGeoCityName, sourcePackets, sourceIp, sourcePort, }) => (React.createElement(eui_1.EuiFlexGroup, { justifyContent: "center", gutterSize: "none" },
    React.createElement(eui_1.EuiFlexItem, { grow: false },
        React.createElement(source_destination_ip_1.SourceDestinationIp, { contextId: contextId, destinationGeoContinentName: destinationGeoContinentName, destinationGeoCountryName: destinationGeoCountryName, destinationGeoCountryIsoCode: destinationGeoCountryIsoCode, destinationGeoRegionName: destinationGeoRegionName, destinationGeoCityName: destinationGeoCityName, destinationIp: destinationIp, destinationPort: destinationPort, eventId: eventId, sourceGeoContinentName: sourceGeoContinentName, sourceGeoCountryName: sourceGeoCountryName, sourceGeoCountryIsoCode: sourceGeoCountryIsoCode, sourceGeoRegionName: sourceGeoRegionName, sourceGeoCityName: sourceGeoCityName, sourceIp: sourceIp, sourcePort: sourcePort, type: "source" })),
    React.createElement(source_destination_arrows_1.SourceDestinationArrows, { contextId: contextId, destinationBytes: destinationBytes, destinationPackets: destinationPackets, eventId: eventId, sourceBytes: sourceBytes, sourcePackets: sourcePackets }),
    React.createElement(eui_1.EuiFlexItem, { grow: false },
        React.createElement(source_destination_ip_1.SourceDestinationIp, { contextId: contextId, destinationGeoContinentName: destinationGeoContinentName, destinationGeoCountryName: destinationGeoCountryName, destinationGeoCountryIsoCode: destinationGeoCountryIsoCode, destinationGeoRegionName: destinationGeoRegionName, destinationGeoCityName: destinationGeoCityName, destinationIp: destinationIp, destinationPort: destinationPort, eventId: eventId, sourceGeoContinentName: sourceGeoContinentName, sourceGeoCountryName: sourceGeoCountryName, sourceGeoCountryIsoCode: sourceGeoCountryIsoCode, sourceGeoRegionName: sourceGeoRegionName, sourceGeoCityName: sourceGeoCityName, sourceIp: sourceIp, sourcePort: sourcePort, type: "destination" })))));
