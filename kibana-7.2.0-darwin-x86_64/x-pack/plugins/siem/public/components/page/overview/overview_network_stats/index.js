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
const react_1 = require("@kbn/i18n/react");
const fp_1 = require("lodash/fp");
const react_2 = tslib_1.__importDefault(require("react"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const empty_value_1 = require("../../../empty_value");
const overviewNetworkStats = (data) => [
    {
        description: fp_1.has('auditbeatSocket', data) && data.auditbeatSocket !== null
            ? numeral_1.default(data.auditbeatSocket).format('0,0')
            : empty_value_1.getEmptyTagValue(),
        title: (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.siem.overview.auditBeatSocketTitle", defaultMessage: "Auditbeat Socket" })),
    },
    {
        description: fp_1.has('filebeatCisco', data) && data.filebeatCisco !== null
            ? numeral_1.default(data.filebeatCisco).format('0,0')
            : empty_value_1.getEmptyTagValue(),
        title: (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.siem.overview.filebeatCiscoTitle", defaultMessage: "Filebeat Cisco" })),
    },
    {
        description: fp_1.has('filebeatNetflow', data) && data.filebeatNetflow !== null
            ? numeral_1.default(data.filebeatNetflow).format('0,0')
            : empty_value_1.getEmptyTagValue(),
        title: (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.siem.overview.filebeatNetflowTitle", defaultMessage: "Filebeat Netflow" })),
    },
    {
        description: fp_1.has('filebeatPanw', data) && data.filebeatPanw !== null
            ? numeral_1.default(data.filebeatPanw).format('0,0')
            : empty_value_1.getEmptyTagValue(),
        title: (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.siem.overview.filebeatPanwTitle", defaultMessage: "Filebeat Palo Alto Network" })),
    },
    {
        description: fp_1.has('filebeatSuricata', data) && data.filebeatSuricata !== null
            ? numeral_1.default(data.filebeatSuricata).format('0,0')
            : empty_value_1.getEmptyTagValue(),
        title: (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.siem.overview.fileBeatSuricataTitle", defaultMessage: "Filebeat Suricata" })),
    },
    {
        description: fp_1.has('filebeatZeek', data) && data.filebeatZeek !== null
            ? numeral_1.default(data.filebeatZeek).format('0,0')
            : empty_value_1.getEmptyTagValue(),
        title: (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.siem.overview.fileBeatZeekTitle", defaultMessage: "Filebeat Zeek" })),
    },
    {
        description: fp_1.has('packetbeatDNS', data) && data.packetbeatDNS !== null
            ? numeral_1.default(data.packetbeatDNS).format('0,0')
            : empty_value_1.getEmptyTagValue(),
        title: (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.siem.overview.packetBeatDnsTitle", defaultMessage: "Packetbeat DNS" })),
    },
    {
        description: fp_1.has('packetbeatFlow', data) && data.packetbeatFlow !== null
            ? numeral_1.default(data.packetbeatFlow).format('0,0')
            : empty_value_1.getEmptyTagValue(),
        title: (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.siem.overview.packetBeatFlowTitle", defaultMessage: "Packetbeat Flow" })),
    },
    {
        description: fp_1.has('packetbeatTLS', data) && data.packetbeatTLS !== null
            ? numeral_1.default(data.packetbeatTLS).format('0,0')
            : empty_value_1.getEmptyTagValue(),
        title: (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.siem.overview.packetbeatTLSTitle", defaultMessage: "Packetbeat TLS" })),
    },
];
exports.DescriptionListDescription = styled_components_1.default(eui_1.EuiDescriptionListDescription) `
  text-align: right;
`;
const StatValue = recompose_1.pure(({ isLoading, value }) => (react_2.default.createElement(react_2.default.Fragment, null, isLoading ? react_2.default.createElement(eui_1.EuiLoadingSpinner, { size: "m" }) : value != null ? value : empty_value_1.getEmptyTagValue())));
exports.OverviewNetworkStats = recompose_1.pure(({ data, loading }) => (react_2.default.createElement(eui_1.EuiDescriptionList, { type: "column" }, overviewNetworkStats(data).map((item, index) => (react_2.default.createElement(react_2.default.Fragment, { key: index },
    react_2.default.createElement(eui_1.EuiDescriptionListTitle, null, item.title),
    react_2.default.createElement(exports.DescriptionListDescription, { "data-test-subj": "stat-loader-description" },
        react_2.default.createElement(StatValue, { isLoading: loading, value: item.description }))))))));
