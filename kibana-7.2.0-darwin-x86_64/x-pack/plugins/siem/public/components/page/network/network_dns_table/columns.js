"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const numeral_1 = tslib_1.__importDefault(require("@elastic/numeral"));
const react_1 = tslib_1.__importDefault(require("react"));
const types_1 = require("../../../../graphql/types");
const draggable_wrapper_1 = require("../../../drag_and_drop/draggable_wrapper");
const helpers_1 = require("../../../drag_and_drop/helpers");
const empty_value_1 = require("../../../empty_value");
const data_provider_1 = require("../../../timeline/data_providers/data_provider");
const formatted_bytes_1 = require("../../../formatted_bytes");
const provider_1 = require("../../../timeline/data_providers/provider");
const i18n = tslib_1.__importStar(require("./translations"));
exports.getNetworkDnsColumns = (type) => [
    {
        field: `node.${types_1.NetworkDnsFields.dnsName}`,
        name: i18n.REGISTERED_DOMAIN,
        truncateText: false,
        hideForMobile: false,
        sortable: true,
        render: dnsName => {
            if (dnsName != null) {
                const id = helpers_1.escapeDataProviderId(`networkDns-table--name-${dnsName}`);
                return (react_1.default.createElement(draggable_wrapper_1.DraggableWrapper, { key: id, dataProvider: {
                        and: [],
                        enabled: true,
                        id,
                        name: dnsName,
                        excluded: false,
                        kqlQuery: '',
                        queryMatch: {
                            field: 'dns.question.etld_plus_one',
                            value: dnsName,
                            operator: data_provider_1.IS_OPERATOR,
                        },
                    }, render: (dataProvider, _, snapshot) => snapshot.isDragging ? (react_1.default.createElement(draggable_wrapper_1.DragEffects, null,
                        react_1.default.createElement(provider_1.Provider, { dataProvider: dataProvider }))) : (empty_value_1.defaultToEmptyTag(dnsName)) }));
            }
            else {
                return empty_value_1.getEmptyTagValue();
            }
        },
    },
    {
        field: `node.${types_1.NetworkDnsFields.queryCount}`,
        name: i18n.TOTAL_QUERIES,
        sortable: true,
        truncateText: false,
        hideForMobile: false,
        render: queryCount => {
            if (queryCount != null) {
                return numeral_1.default(queryCount).format('0');
            }
            else {
                return empty_value_1.getEmptyTagValue();
            }
        },
    },
    {
        field: `node.${types_1.NetworkDnsFields.uniqueDomains}`,
        name: i18n.UNIQUE_DOMAINS,
        sortable: true,
        truncateText: false,
        hideForMobile: false,
        render: uniqueDomains => {
            if (uniqueDomains != null) {
                return numeral_1.default(uniqueDomains).format('0');
            }
            else {
                return empty_value_1.getEmptyTagValue();
            }
        },
    },
    {
        field: `node.${types_1.NetworkDnsFields.dnsBytesIn}`,
        name: i18n.DNS_BYTES_IN,
        sortable: true,
        truncateText: false,
        hideForMobile: false,
        render: dnsBytesIn => {
            if (dnsBytesIn != null) {
                return react_1.default.createElement(formatted_bytes_1.PreferenceFormattedBytes, { value: dnsBytesIn });
            }
            else {
                return empty_value_1.getEmptyTagValue();
            }
        },
    },
    {
        field: `node.${types_1.NetworkDnsFields.dnsBytesOut}`,
        name: i18n.DNS_BYTES_OUT,
        sortable: true,
        truncateText: false,
        hideForMobile: false,
        render: dnsBytesOut => {
            if (dnsBytesOut != null) {
                return react_1.default.createElement(formatted_bytes_1.PreferenceFormattedBytes, { value: dnsBytesOut });
            }
            else {
                return empty_value_1.getEmptyTagValue();
            }
        },
    },
];
