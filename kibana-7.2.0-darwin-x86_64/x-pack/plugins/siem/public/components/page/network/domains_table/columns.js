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
const fp_1 = require("lodash/fp");
const moment_1 = tslib_1.__importDefault(require("moment"));
const react_1 = tslib_1.__importDefault(require("react"));
const types_1 = require("../../../../graphql/types");
const helpers_1 = require("../../../../lib/helpers");
const keury_1 = require("../../../../lib/keury");
const draggable_wrapper_1 = require("../../../drag_and_drop/draggable_wrapper");
const helpers_2 = require("../../../drag_and_drop/helpers");
const empty_value_1 = require("../../../empty_value");
const formatted_date_1 = require("../../../formatted_date");
const localized_date_tooltip_1 = require("../../../localized_date_tooltip");
const data_provider_1 = require("../../../timeline/data_providers/data_provider");
const formatted_bytes_1 = require("../../../formatted_bytes");
const provider_1 = require("../../../timeline/data_providers/provider");
const add_to_kql_1 = require("../../add_to_kql");
const i18n = tslib_1.__importStar(require("./translations"));
exports.getDomainsColumns = (indexPattern, ip, flowDirection, flowTarget, type, tableId) => [
    {
        field: `node.${flowTarget}.domainName`,
        name: i18n.DOMAIN_NAME,
        truncateText: false,
        hideForMobile: false,
        sortable: true,
        render: domainName => {
            const domainNameAttr = `${flowTarget}.domainName`;
            if (domainName != null) {
                const id = helpers_2.escapeDataProviderId(`${tableId}-table-${flowTarget}-${flowDirection}-domain-${domainName}`);
                return (react_1.default.createElement(draggable_wrapper_1.DraggableWrapper, { key: id, dataProvider: {
                        and: [],
                        enabled: true,
                        id,
                        name: domainName,
                        excluded: false,
                        kqlQuery: '',
                        queryMatch: { field: domainNameAttr, value: domainName, operator: data_provider_1.IS_OPERATOR },
                    }, render: (dataProvider, _, snapshot) => snapshot.isDragging ? (react_1.default.createElement(draggable_wrapper_1.DragEffects, null,
                        react_1.default.createElement(provider_1.Provider, { dataProvider: dataProvider }))) : (react_1.default.createElement(react_1.default.Fragment, null, domainName)) }));
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
                directions.map((direction, index) => (react_1.default.createElement(add_to_kql_1.AddToKql, { indexPattern: indexPattern, key: helpers_2.escapeDataProviderId(`${tableId}-table-${flowTarget}-${flowDirection}-direction-${direction}`), expression: `network.direction: "${keury_1.escapeQueryValue(direction)}"`, type: type, componentFilterType: 'network' },
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
        field: `node.${flowTarget}.uniqueIpCount`,
        name: getFlowTargetTitle(flowTarget),
        truncateText: false,
        hideForMobile: false,
        sortable: true,
        render: uniqueIpCount => {
            if (uniqueIpCount != null) {
                return numeral_1.default(uniqueIpCount).format('0,000');
            }
            else {
                return empty_value_1.getEmptyTagValue();
            }
        },
    },
    {
        name: (react_1.default.createElement(eui_1.EuiToolTip, { content: i18n.FIRST_LAST_SEEN_TOOLTIP },
            react_1.default.createElement(react_1.default.Fragment, null,
                i18n.LAST_SEEN,
                react_1.default.createElement(eui_1.EuiIcon, { size: "s", color: "subdued", type: "questionInCircle", className: "eui-alignTop" })))),
        truncateText: false,
        hideForMobile: false,
        render: ({ node }) => {
            const lastSeenAttr = `${flowTarget}.lastSeen`;
            const lastSeen = fp_1.getOr(null, lastSeenAttr, node);
            if (lastSeen != null) {
                return (react_1.default.createElement(localized_date_tooltip_1.LocalizedDateTooltip, { date: moment_1.default(new Date(lastSeen)).toDate() },
                    react_1.default.createElement(formatted_date_1.PreferenceFormattedDate, { value: new Date(lastSeen) })));
            }
            return empty_value_1.getEmptyTagValue();
        },
    },
];
const getFlowTargetTitle = (flowTarget) => {
    switch (flowTarget) {
        case types_1.FlowTarget.client:
            return i18n.UNIQUE_CLIENTS;
        case types_1.FlowTarget.server:
            return i18n.UNIQUE_SERVERS;
        case types_1.FlowTarget.source:
            return i18n.UNIQUE_DESTINATIONS;
        case types_1.FlowTarget.destination:
            return i18n.UNIQUE_SOURCES;
    }
    helpers_1.assertUnreachable(flowTarget);
};
