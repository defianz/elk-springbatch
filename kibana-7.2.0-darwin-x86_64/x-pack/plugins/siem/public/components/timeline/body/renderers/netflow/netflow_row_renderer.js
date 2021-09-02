"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fp_1 = require("lodash/fp");
const react_1 = tslib_1.__importDefault(require("react"));
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const helpers_1 = require("../../../../../lib/helpers");
const certificate_fingerprint_1 = require("../../../../certificate_fingerprint");
const duration_1 = require("../../../../duration");
const event_id_1 = require("../../../../event_details/event_id");
const ip_1 = require("../../../../ip");
const ja3_fingerprint_1 = require("../../../../ja3_fingerprint");
const netflow_1 = require("../../../../netflow");
const duration_event_start_end_1 = require("../../../../netflow/netflow_columns/duration_event_start_end");
const user_process_1 = require("../../../../netflow/netflow_columns/user_process");
const port_1 = require("../../../../port");
const geo_fields_1 = require("../../../../source_destination/geo_fields");
const source_destination_arrows_1 = require("../../../../source_destination/source_destination_arrows");
const row_renderer_1 = require("../row_renderer");
const helpers_2 = require("../helpers");
const field_names_1 = require("../../../../source_destination/field_names");
const Details = styled_components_1.default.div `
  margin: 10px 0;
`;
const EVENT_CATEGORY_FIELD = 'event.category';
const EVENT_ACTION_FIELD = 'event.action';
const NETWORK_TRAFFIC = 'network_traffic';
const NETWORK_FLOW = 'network_flow';
const NETFLOW_FLOW = 'netflow_flow';
exports.eventCategoryMatches = (eventCategory) => `${eventCategory}`.toLowerCase() === NETWORK_TRAFFIC;
exports.eventActionMatches = (eventAction) => {
    const action = `${eventAction}`.toLowerCase();
    return action === NETWORK_FLOW || action === NETFLOW_FLOW;
};
exports.netflowRowRenderer = {
    isInstance: ecs => {
        return (exports.eventCategoryMatches(fp_1.get(EVENT_CATEGORY_FIELD, ecs)) ||
            exports.eventActionMatches(fp_1.get(EVENT_ACTION_FIELD, ecs)));
    },
    renderRow: ({ data, width, children }) => (react_1.default.createElement(helpers_2.Row, null,
        children,
        react_1.default.createElement(row_renderer_1.RowRendererContainer, { width: width },
            react_1.default.createElement(Details, null,
                react_1.default.createElement(netflow_1.Netflow, { contextId: NETWORK_FLOW, destinationBytes: helpers_1.asArrayIfExists(fp_1.get(source_destination_arrows_1.DESTINATION_BYTES_FIELD_NAME, data)), destinationGeoContinentName: helpers_1.asArrayIfExists(fp_1.get(geo_fields_1.DESTINATION_GEO_CONTINENT_NAME_FIELD_NAME, data)), destinationGeoCountryName: helpers_1.asArrayIfExists(fp_1.get(geo_fields_1.DESTINATION_GEO_COUNTRY_NAME_FIELD_NAME, data)), destinationGeoCountryIsoCode: helpers_1.asArrayIfExists(fp_1.get(geo_fields_1.DESTINATION_GEO_COUNTRY_ISO_CODE_FIELD_NAME, data)), destinationGeoRegionName: helpers_1.asArrayIfExists(fp_1.get(geo_fields_1.DESTINATION_GEO_REGION_NAME_FIELD_NAME, data)), destinationGeoCityName: helpers_1.asArrayIfExists(fp_1.get(geo_fields_1.DESTINATION_GEO_CITY_NAME_FIELD_NAME, data)), destinationIp: helpers_1.asArrayIfExists(fp_1.get(ip_1.DESTINATION_IP_FIELD_NAME, data)), destinationPackets: helpers_1.asArrayIfExists(fp_1.get(source_destination_arrows_1.DESTINATION_PACKETS_FIELD_NAME, data)), destinationPort: helpers_1.asArrayIfExists(fp_1.get(port_1.DESTINATION_PORT_FIELD_NAME, data)), eventDuration: helpers_1.asArrayIfExists(fp_1.get(duration_1.EVENT_DURATION_FIELD_NAME, data)), eventId: fp_1.get(event_id_1.ID_FIELD_NAME, data), eventEnd: helpers_1.asArrayIfExists(fp_1.get(duration_event_start_end_1.EVENT_END_FIELD_NAME, data)), eventStart: helpers_1.asArrayIfExists(fp_1.get(duration_event_start_end_1.EVENT_START_FIELD_NAME, data)), networkBytes: helpers_1.asArrayIfExists(fp_1.get(field_names_1.NETWORK_BYTES_FIELD_NAME, data)), networkCommunityId: helpers_1.asArrayIfExists(fp_1.get(field_names_1.NETWORK_COMMUNITY_ID_FIELD_NAME, data)), networkDirection: helpers_1.asArrayIfExists(fp_1.get(field_names_1.NETWORK_DIRECTION_FIELD_NAME, data)), networkPackets: helpers_1.asArrayIfExists(fp_1.get(field_names_1.NETWORK_PACKETS_FIELD_NAME, data)), networkProtocol: helpers_1.asArrayIfExists(fp_1.get(field_names_1.NETWORK_PROTOCOL_FIELD_NAME, data)), processName: helpers_1.asArrayIfExists(fp_1.get(user_process_1.PROCESS_NAME_FIELD_NAME, data)), sourceBytes: helpers_1.asArrayIfExists(fp_1.get(source_destination_arrows_1.SOURCE_BYTES_FIELD_NAME, data)), sourceGeoContinentName: helpers_1.asArrayIfExists(fp_1.get(geo_fields_1.SOURCE_GEO_CONTINENT_NAME_FIELD_NAME, data)), sourceGeoCountryName: helpers_1.asArrayIfExists(fp_1.get(geo_fields_1.SOURCE_GEO_COUNTRY_NAME_FIELD_NAME, data)), sourceGeoCountryIsoCode: helpers_1.asArrayIfExists(fp_1.get(geo_fields_1.SOURCE_GEO_COUNTRY_ISO_CODE_FIELD_NAME, data)), sourceGeoRegionName: helpers_1.asArrayIfExists(fp_1.get(geo_fields_1.SOURCE_GEO_REGION_NAME_FIELD_NAME, data)), sourceGeoCityName: helpers_1.asArrayIfExists(fp_1.get(geo_fields_1.SOURCE_GEO_CITY_NAME_FIELD_NAME, data)), sourceIp: helpers_1.asArrayIfExists(fp_1.get(ip_1.SOURCE_IP_FIELD_NAME, data)), sourcePackets: helpers_1.asArrayIfExists(fp_1.get(source_destination_arrows_1.SOURCE_PACKETS_FIELD_NAME, data)), sourcePort: helpers_1.asArrayIfExists(fp_1.get(port_1.SOURCE_PORT_FIELD_NAME, data)), tlsClientCertificateFingerprintSha1: helpers_1.asArrayIfExists(fp_1.get(certificate_fingerprint_1.TLS_CLIENT_CERTIFICATE_FINGERPRINT_SHA1_FIELD_NAME, data)), tlsFingerprintsJa3Hash: helpers_1.asArrayIfExists(fp_1.get(ja3_fingerprint_1.JA3_HASH_FIELD_NAME, data)), tlsServerCertificateFingerprintSha1: helpers_1.asArrayIfExists(fp_1.get(certificate_fingerprint_1.TLS_SERVER_CERTIFICATE_FINGERPRINT_SHA1_FIELD_NAME, data)), transport: helpers_1.asArrayIfExists(fp_1.get(field_names_1.NETWORK_TRANSPORT_FIELD_NAME, data)), userName: helpers_1.asArrayIfExists(fp_1.get(user_process_1.USER_NAME_FIELD_NAME, data)) }))))),
};
