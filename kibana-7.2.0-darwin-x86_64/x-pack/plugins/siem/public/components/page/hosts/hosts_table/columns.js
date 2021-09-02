"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const moment_1 = tslib_1.__importDefault(require("moment"));
const react_1 = tslib_1.__importDefault(require("react"));
const keury_1 = require("../../../../lib/keury");
const draggable_wrapper_1 = require("../../../drag_and_drop/draggable_wrapper");
const helpers_1 = require("../../../drag_and_drop/helpers");
const empty_value_1 = require("../../../empty_value");
const formatted_date_1 = require("../../../formatted_date");
const links_1 = require("../../../links");
const localized_date_tooltip_1 = require("../../../localized_date_tooltip");
const data_provider_1 = require("../../../timeline/data_providers/data_provider");
const provider_1 = require("../../../timeline/data_providers/provider");
const add_to_kql_1 = require("../../add_to_kql");
const i18n = tslib_1.__importStar(require("./translations"));
exports.getHostsColumns = (type, indexPattern) => [
    {
        field: 'node.host.name',
        name: i18n.NAME,
        truncateText: false,
        hideForMobile: false,
        sortable: true,
        render: hostName => {
            if (hostName != null && hostName.length > 0) {
                const id = helpers_1.escapeDataProviderId(`hosts-table-hostName-${hostName[0]}`);
                return (react_1.default.createElement(draggable_wrapper_1.DraggableWrapper, { key: id, dataProvider: {
                        and: [],
                        enabled: true,
                        excluded: false,
                        id,
                        name: hostName[0],
                        kqlQuery: '',
                        queryMatch: { field: 'host.name', value: hostName[0], operator: data_provider_1.IS_OPERATOR },
                    }, render: (dataProvider, _, snapshot) => snapshot.isDragging ? (react_1.default.createElement(draggable_wrapper_1.DragEffects, null,
                        react_1.default.createElement(provider_1.Provider, { dataProvider: dataProvider }))) : (react_1.default.createElement(add_to_kql_1.AddToKql, { indexPattern: indexPattern, expression: `host.name: "${keury_1.escapeQueryValue(hostName[0])}"`, componentFilterType: "hosts", type: type },
                        react_1.default.createElement(links_1.HostDetailsLink, { hostName: hostName[0] }))) }));
            }
            return empty_value_1.getEmptyTagValue();
        },
    },
    {
        field: 'node.lastSeen',
        name: (react_1.default.createElement(eui_1.EuiToolTip, { content: i18n.FIRST_LAST_SEEN_TOOLTIP },
            react_1.default.createElement(react_1.default.Fragment, null,
                i18n.LAST_SEEN,
                react_1.default.createElement(eui_1.EuiIcon, { size: "s", color: "subdued", type: "questionInCircle", className: "eui-alignTop" })))),
        truncateText: false,
        hideForMobile: false,
        sortable: true,
        render: lastSeen => {
            if (lastSeen != null) {
                return (react_1.default.createElement(localized_date_tooltip_1.LocalizedDateTooltip, { date: moment_1.default(new Date(lastSeen)).toDate() },
                    react_1.default.createElement(formatted_date_1.PreferenceFormattedDate, { value: new Date(lastSeen) })));
            }
            return empty_value_1.getEmptyTagValue();
        },
    },
    {
        field: 'node.host.os.name',
        name: i18n.OS,
        truncateText: false,
        hideForMobile: false,
        sortable: false,
        render: hostOsName => {
            if (hostOsName != null) {
                return (react_1.default.createElement(add_to_kql_1.AddToKql, { indexPattern: indexPattern, expression: `host.os.name: "${keury_1.escapeQueryValue(hostOsName)}"`, componentFilterType: "hosts", type: type },
                    react_1.default.createElement(react_1.default.Fragment, null, hostOsName)));
            }
            return empty_value_1.getEmptyTagValue();
        },
    },
    {
        field: 'node.host.os.version',
        name: i18n.VERSION,
        truncateText: false,
        hideForMobile: false,
        sortable: false,
        render: hostOsVersion => {
            if (hostOsVersion != null) {
                return (react_1.default.createElement(add_to_kql_1.AddToKql, { indexPattern: indexPattern, expression: `host.os.version: "${keury_1.escapeQueryValue(hostOsVersion)}"`, componentFilterType: "hosts", type: type },
                    react_1.default.createElement(react_1.default.Fragment, null, hostOsVersion)));
            }
            return empty_value_1.getEmptyTagValue();
        },
    },
];
