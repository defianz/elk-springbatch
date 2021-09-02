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
const react_redux_1 = require("react-redux");
const react_sticky_1 = require("react-sticky");
const recompose_1 = require("recompose");
const filters_global_1 = require("../../components/filters_global");
const header_page_1 = require("../../components/header_page");
const last_event_time_1 = require("../../components/last_event_time");
const manage_query_1 = require("../../components/page/manage_query");
const network_1 = require("../../components/page/network");
const network_dns_table_1 = require("../../components/page/network/network_dns_table");
const global_time_1 = require("../../containers/global_time");
const kpi_network_1 = require("../../containers/kpi_network");
const network_dns_1 = require("../../containers/network_dns");
const network_top_n_flow_1 = require("../../containers/network_top_n_flow");
const source_1 = require("../../containers/source");
const types_1 = require("../../graphql/types");
const store_1 = require("../../store");
const kql_1 = require("./kql");
const network_empty_page_1 = require("./network_empty_page");
const i18n = tslib_1.__importStar(require("./translations"));
const NetworkTopNFlowTableManage = manage_query_1.manageQuery(network_1.NetworkTopNFlowTable);
const NetworkDnsTableManage = manage_query_1.manageQuery(network_dns_table_1.NetworkDnsTable);
const KpiNetworkComponentManage = manage_query_1.manageQuery(network_1.KpiNetworkComponent);
const NetworkComponent = recompose_1.pure(({ filterQuery }) => (react_1.default.createElement(source_1.WithSource, { sourceId: "default" }, ({ indicesExist, indexPattern }) => source_1.indicesExistOrDataTemporarilyUnavailable(indicesExist) ? (react_1.default.createElement(react_sticky_1.StickyContainer, null,
    react_1.default.createElement(filters_global_1.FiltersGlobal, null,
        react_1.default.createElement(kql_1.NetworkKql, { indexPattern: indexPattern, type: store_1.networkModel.NetworkType.page })),
    react_1.default.createElement(header_page_1.HeaderPage, { subtitle: react_1.default.createElement(last_event_time_1.LastEventTime, { indexKey: types_1.LastEventIndexKey.network }), title: i18n.PAGE_TITLE }),
    react_1.default.createElement(global_time_1.GlobalTime, null, ({ to, from, setQuery }) => (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(kpi_network_1.KpiNetworkQuery, { endDate: to, filterQuery: filterQuery, sourceId: "default", startDate: from }, ({ kpiNetwork, loading, id, refetch }) => (react_1.default.createElement(KpiNetworkComponentManage, { id: id, setQuery: setQuery, refetch: refetch, data: kpiNetwork, loading: loading }))),
        react_1.default.createElement(eui_1.EuiSpacer, null),
        react_1.default.createElement(network_top_n_flow_1.NetworkTopNFlowQuery, { endDate: to, filterQuery: filterQuery, sourceId: "default", startDate: from, type: store_1.networkModel.NetworkType.page }, ({ totalCount, loading, networkTopNFlow, pageInfo, loadMore, id, refetch }) => (react_1.default.createElement(NetworkTopNFlowTableManage, { data: networkTopNFlow, indexPattern: indexPattern, id: id, hasNextPage: fp_1.getOr(false, 'hasNextPage', pageInfo), loading: loading, loadMore: loadMore, nextCursor: fp_1.getOr(null, 'endCursor.value', pageInfo), refetch: refetch, setQuery: setQuery, totalCount: totalCount, type: store_1.networkModel.NetworkType.page }))),
        react_1.default.createElement(eui_1.EuiSpacer, null),
        react_1.default.createElement(network_dns_1.NetworkDnsQuery, { endDate: to, filterQuery: filterQuery, sourceId: "default", startDate: from, type: store_1.networkModel.NetworkType.page }, ({ totalCount, loading, networkDns, pageInfo, loadMore, id, refetch }) => (react_1.default.createElement(NetworkDnsTableManage, { data: networkDns, id: id, hasNextPage: fp_1.getOr(false, 'hasNextPage', pageInfo), loading: loading, loadMore: loadMore, nextCursor: fp_1.getOr(null, 'endCursor.value', pageInfo), refetch: refetch, setQuery: setQuery, totalCount: totalCount, type: store_1.networkModel.NetworkType.page })))))))) : (react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(header_page_1.HeaderPage, { title: i18n.PAGE_TITLE }),
    react_1.default.createElement(network_empty_page_1.NetworkEmptyPage, null))))));
const makeMapStateToProps = () => {
    const getNetworkFilterQueryAsJson = store_1.networkSelectors.networkFilterQueryAsJson();
    const mapStateToProps = (state) => ({
        filterQuery: getNetworkFilterQueryAsJson(state, store_1.networkModel.NetworkType.page) || '',
    });
    return mapStateToProps;
};
exports.Network = react_redux_1.connect(makeMapStateToProps)(NetworkComponent);
