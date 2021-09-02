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
const ip_1 = require("../ip");
const port_1 = require("../port");
const i18n = tslib_1.__importStar(require("../timeline/body/renderers/translations"));
const geo_fields_1 = require("./geo_fields");
const ip_with_port_1 = require("./ip_with_port");
const label_1 = require("./label");
/**
 * Returns `true` if the ip field (i.e. `sourceIp`, `destinationIp`) that
 * corresponds with the specified `type` (i.e. `source`, `destination`) is
 * populated
 */
exports.isIpFieldPopulated = ({ destinationIp, sourceIp, type, }) => (type === 'source' && sourceIp != null) || (type === 'destination' && destinationIp != null);
const IpAdressesWithPorts = recompose_1.pure(({ contextId, destinationIp, destinationPort, eventId, sourceIp, sourcePort, type }) => {
    const ip = type === 'source' ? sourceIp : destinationIp;
    const ipFieldName = type === 'source' ? ip_1.SOURCE_IP_FIELD_NAME : ip_1.DESTINATION_IP_FIELD_NAME;
    const port = type === 'source' ? sourcePort : destinationPort;
    const portFieldName = type === 'source' ? port_1.SOURCE_PORT_FIELD_NAME : port_1.DESTINATION_PORT_FIELD_NAME;
    if (ip == null) {
        return null; // if ip is not populated as an array, ports will be ignored
    }
    // IMPORTANT: The ip and port arrays are parallel arrays; the port at
    // index `i` corresponds with the ip address at index `i`. We must
    // preserve the relationships between the parallel arrays:
    const ipPortPairs = port != null && ip.length === port.length
        ? ip.map((address, i) => ({
            ip: address,
            port: port[i],
        }))
        : ip.map(address => ({
            ip: address,
            port: null,
        }));
    return ip != null ? (React.createElement(eui_1.EuiFlexGroup, { gutterSize: "none" }, fp_1.uniqWith(fp_1.isEqual, ipPortPairs).map(ipPortPair => ipPortPair.ip != null && (React.createElement(eui_1.EuiFlexItem, { grow: false, key: ipPortPair.ip },
        React.createElement(ip_with_port_1.IpWithPort, { contextId: contextId, "data-test-subj": `${type}-ip-and-port`, eventId: eventId, ip: ipPortPair.ip, ipFieldName: ipFieldName, port: ipPortPair.port, portFieldName: portFieldName })))))) : null;
});
/**
 * When the ip field (i.e. `sourceIp`, `destinationIp`) that corresponds with
 * the specified `type` (i.e. `source`, `destination`) is populated, this component
 * renders:
 * - a label (i.e. `Source` or `Destination`)
 * - a draggable / hyperlinked IP address, when it's populated
 * - a port, hyperlinked to a port lookup service, when it's populated
 * - a summary of geolocation details, when they are populated
 */
exports.SourceDestinationIp = recompose_1.pure(({ contextId, destinationGeoContinentName, destinationGeoCountryName, destinationGeoCountryIsoCode, destinationGeoRegionName, destinationGeoCityName, destinationIp, destinationPort, eventId, sourceGeoContinentName, sourceGeoCountryName, sourceGeoCountryIsoCode, sourceGeoRegionName, sourceGeoCityName, sourceIp, sourcePort, type, }) => {
    const label = type === 'source' ? i18n.SOURCE : i18n.DESTINATION;
    return exports.isIpFieldPopulated({ destinationIp, sourceIp, type }) ? (React.createElement(eui_1.EuiBadge, { "data-test-subj": `${type}-ip-badge`, color: "hollow" },
        React.createElement(eui_1.EuiFlexGroup, { alignItems: "center", "data-test-subj": `${type}-ip-group`, direction: "column", gutterSize: "none" },
            React.createElement(eui_1.EuiFlexItem, { grow: false },
                React.createElement(label_1.Label, { "data-test-subj": `${type}-label` }, label)),
            React.createElement(eui_1.EuiFlexItem, { grow: false },
                React.createElement(IpAdressesWithPorts, { contextId: contextId, destinationIp: destinationIp, destinationPort: destinationPort, eventId: eventId, sourceIp: sourceIp, sourcePort: sourcePort, type: type })),
            React.createElement(eui_1.EuiFlexItem, null,
                React.createElement(geo_fields_1.GeoFields, { contextId: contextId, destinationGeoContinentName: destinationGeoContinentName, destinationGeoCountryName: destinationGeoCountryName, destinationGeoCountryIsoCode: destinationGeoCountryIsoCode, destinationGeoRegionName: destinationGeoRegionName, destinationGeoCityName: destinationGeoCityName, eventId: eventId, sourceGeoContinentName: sourceGeoContinentName, sourceGeoCountryName: sourceGeoCountryName, sourceGeoCountryIsoCode: sourceGeoCountryIsoCode, sourceGeoRegionName: sourceGeoRegionName, sourceGeoCityName: sourceGeoCityName, type: type }))))) : null;
});
