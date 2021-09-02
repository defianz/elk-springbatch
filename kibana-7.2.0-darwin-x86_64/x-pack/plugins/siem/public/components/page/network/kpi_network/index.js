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
const react_1 = tslib_1.__importDefault(require("react"));
const recompose_1 = require("recompose");
const eui_2 = require("@elastic/eui");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const stat_items_1 = require("../../../../components/stat_items");
const i18n = tslib_1.__importStar(require("./translations"));
const fieldTitleMapping = [
    {
        fields: [
            {
                key: 'networkEvents',
                value: null,
            },
        ],
        description: i18n.NETWORK_EVENTS,
    },
    {
        fields: [
            {
                key: 'uniqueFlowId',
                value: null,
            },
        ],
        description: i18n.UNIQUE_ID,
    },
    {
        fields: [
            {
                key: 'activeAgents',
                value: null,
            },
        ],
        description: i18n.ACTIVE_AGENTS,
    },
    {
        fields: [
            {
                key: 'uniqueSourcePrivateIps',
                value: null,
            },
        ],
        description: i18n.UNIQUE_SOURCE_PRIVATE_IPS,
    },
    {
        fields: [
            {
                key: 'uniqueDestinationPrivateIps',
                value: null,
            },
        ],
        description: i18n.UNIQUE_DESTINATION_PRIVATE_IPS,
    },
    {
        fields: [
            {
                key: 'dnsQueries',
                value: null,
            },
        ],
        description: i18n.DNS_QUERIES,
    },
    {
        fields: [
            {
                key: 'tlsHandshakes',
                value: null,
            },
        ],
        description: i18n.TLS_HANDSHAKES,
    },
];
const FlexGroup = styled_components_1.default(eui_1.EuiFlexGroup) `
  margin-height: 86px;
`;
exports.KpiNetworkComponent = recompose_1.pure(({ data, loading }) => {
    return loading ? (react_1.default.createElement(FlexGroup, { justifyContent: "center", alignItems: "center" },
        react_1.default.createElement(eui_2.EuiFlexItem, { grow: false },
            react_1.default.createElement(eui_2.EuiLoadingSpinner, { size: "xl" })))) : (react_1.default.createElement(eui_1.EuiFlexGroup, null, fieldTitleMapping.map(stat => (react_1.default.createElement(stat_items_1.StatItemsComponent, { key: `kpi-network-summary-${stat.fields[0].key}`, description: stat.description, fields: addValueToFields(stat.fields, data) })))));
});
const addValueToFields = (fields, data) => fields.map(field => ({ ...field, value: fp_1.get(field.key, data) }));
