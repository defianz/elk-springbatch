"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = require("@kbn/i18n/react");
const react_2 = tslib_1.__importDefault(require("react"));
const recompose_1 = require("recompose");
const header_panel_1 = require("../../../header_panel");
const manage_query_1 = require("../../../page/manage_query");
const overview_network_1 = require("../../../../containers/overview/overview_network");
const overview_network_stats_1 = require("../overview_network_stats");
const OverviewNetworkStatsManage = manage_query_1.manageQuery(overview_network_stats_1.OverviewNetworkStats);
exports.OverviewNetwork = recompose_1.pure(({ endDate, startDate, setQuery }) => (react_2.default.createElement(eui_1.EuiFlexItem, null,
    react_2.default.createElement(eui_1.EuiPanel, null,
        react_2.default.createElement(header_panel_1.HeaderPanel, { border: true, subtitle: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.siem.overview.networkSubtitle", defaultMessage: "Showing: Last 24 Hours" }), title: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.siem.overview.networkTitle", defaultMessage: "Network Events" }) },
            react_2.default.createElement(eui_1.EuiButton, { href: "#/link-to/network/" },
                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.siem.overview.networkAction", defaultMessage: "View Network" }))),
        react_2.default.createElement(overview_network_1.OverviewNetworkQuery, { endDate: endDate, sourceId: "default", startDate: startDate }, ({ overviewNetwork, loading, id, refetch }) => (react_2.default.createElement(OverviewNetworkStatsManage, { loading: loading, data: overviewNetwork, setQuery: setQuery, id: id, refetch: refetch })))))));
