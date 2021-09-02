"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const numeral_1 = tslib_1.__importDefault(require("@elastic/numeral"));
const fp_1 = require("lodash/fp");
const react_1 = tslib_1.__importDefault(require("react"));
const types_1 = require("../../../../graphql/types");
const helpers_1 = require("../../../../lib/helpers");
const keury_1 = require("../../../../lib/keury");
const draggable_wrapper_1 = require("../../../drag_and_drop/draggable_wrapper");
const helpers_2 = require("../../../drag_and_drop/helpers");
const empty_value_1 = require("../../../empty_value");
const links_1 = require("../../../links");
const data_provider_1 = require("../../../timeline/data_providers/data_provider");
const provider_1 = require("../../../timeline/data_providers/provider");
const add_to_kql_1 = require("../../add_to_kql");
const i18n = tslib_1.__importStar(require("./translations"));
const helpers_3 = require("../../../tables/helpers");
const formatted_bytes_1 = require("../../../formatted_bytes");
exports.getNetworkTopNFlowColumns = (indexPattern, flowDirection, flowTarget, type, tableId) => [
    {
        name: getIpTitle(flowTarget),
        truncateText: false,
        hideForMobile: false,
        render: ({ node }) => {
            const ipAttr = `${flowTarget}.ip`;
            const ip = fp_1.get(ipAttr, node);
            const id = helpers_2.escapeDataProviderId(`${tableId}-table-${flowTarget}-${flowDirection}-ip-${ip}`);
            if (ip != null) {
                return (react_1.default.createElement(draggable_wrapper_1.DraggableWrapper, { key: id, dataProvider: {
                        and: [],
                        enabled: true,
                        id,
                        name: ip,
                        excluded: false,
                        kqlQuery: '',
                        queryMatch: { field: ipAttr, value: ip, operator: data_provider_1.IS_OPERATOR },
                    }, render: (dataProvider, _, snapshot) => snapshot.isDragging ? (react_1.default.createElement(draggable_wrapper_1.DragEffects, null,
                        react_1.default.createElement(provider_1.Provider, { dataProvider: dataProvider }))) : (react_1.default.createElement(links_1.IPDetailsLink, { ip: ip })) }));
            }
            else {
                return empty_value_1.getEmptyTagValue();
            }
        },
    },
    {
        name: i18n.DOMAIN,
        truncateText: false,
        hideForMobile: false,
        render: ({ node }) => {
            const domainAttr = `${flowTarget}.domain`;
            const ipAttr = `${flowTarget}.ip`;
            const domains = fp_1.get(domainAttr, node);
            const ip = fp_1.get(ipAttr, node);
            if (Array.isArray(domains) && domains.length > 0) {
                const id = helpers_2.escapeDataProviderId(`${tableId}-table-${ip}-${flowDirection}`);
                return helpers_3.getRowItemDraggables({
                    rowItems: domains,
                    attrName: domainAttr,
                    idPrefix: id,
                    displayCount: 1,
                });
            }
            else {
                return empty_value_1.getEmptyTagValue();
            }
        },
    },
    {
        field: 'node.network.direction',
        name: i18n.DIRECTION,
        truncateText: false,
        hideForMobile: false,
        render: directions => fp_1.isEmpty(directions)
            ? empty_value_1.getEmptyTagValue()
            : directions &&
                directions.map((direction, index) => (react_1.default.createElement(add_to_kql_1.AddToKql, { indexPattern: indexPattern, key: helpers_2.escapeDataProviderId(`${tableId}-table-${flowTarget}-${flowDirection}-direction-${direction}`), expression: `network.direction: "${keury_1.escapeQueryValue(direction)}"`, componentFilterType: "network", type: type },
                    react_1.default.createElement(react_1.default.Fragment, null,
                        empty_value_1.defaultToEmptyTag(direction),
                        index < directions.length - 1 ? '\u00A0' : null)))),
    },
    {
        field: 'node.network.bytes',
        name: i18n.BYTES,
        truncateText: false,
        hideForMobile: false,
        sortable: true,
        render: bytes => {
            if (bytes != null) {
                return react_1.default.createElement(formatted_bytes_1.PreferenceFormattedBytes, { value: bytes });
            }
            else {
                return empty_value_1.getEmptyTagValue();
            }
        },
    },
    {
        field: 'node.network.packets',
        name: i18n.PACKETS,
        truncateText: false,
        hideForMobile: false,
        sortable: true,
        render: packets => {
            if (packets != null) {
                return numeral_1.default(packets).format('0,000');
            }
            else {
                return empty_value_1.getEmptyTagValue();
            }
        },
    },
    {
        field: `node.${flowTarget}.count`,
        name: getUniqueTitle(flowTarget),
        truncateText: false,
        hideForMobile: false,
        sortable: true,
        render: ipCount => {
            if (ipCount != null) {
                return numeral_1.default(ipCount).format('0,000');
            }
            else {
                return empty_value_1.getEmptyTagValue();
            }
        },
    },
];
const getIpTitle = (flowTarget) => {
    switch (flowTarget) {
        case types_1.FlowTarget.source:
            return i18n.SOURCE_IP;
        case types_1.FlowTarget.destination:
            return i18n.DESTINATION_IP;
        case types_1.FlowTarget.client:
            return i18n.CLIENT_IP;
        case types_1.FlowTarget.server:
            return i18n.SERVER_IP;
    }
    helpers_1.assertUnreachable(flowTarget);
};
const getUniqueTitle = (flowTarget) => {
    switch (flowTarget) {
        case types_1.FlowTarget.source:
            return i18n.UNIQUE_DESTINATION_IP;
        case types_1.FlowTarget.destination:
            return i18n.UNIQUE_SOURCE_IP;
        case types_1.FlowTarget.client:
            return i18n.UNIQUE_SERVER_IP;
        case types_1.FlowTarget.server:
            return i18n.UNIQUE_CLIENT_IP;
    }
    helpers_1.assertUnreachable(flowTarget);
};
