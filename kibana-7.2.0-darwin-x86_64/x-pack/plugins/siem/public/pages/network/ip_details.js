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
const redirect_to_network_1 = require("../../components/link_to/redirect_to_network");
const manage_query_1 = require("../../components/page/manage_query");
const domains_table_1 = require("../../components/page/network/domains_table");
const flow_target_select_connected_1 = require("../../components/page/network/flow_target_select_connected");
const ip_overview_1 = require("../../components/page/network/ip_overview");
const domains_1 = require("../../containers/domains");
const global_time_1 = require("../../containers/global_time");
const ip_overview_2 = require("../../containers/ip_overview");
const source_1 = require("../../containers/source");
const types_1 = require("../../graphql/types");
const helpers_1 = require("../../lib/helpers");
const store_1 = require("../../store");
const tls_table_1 = require("../../components/page/network/tls_table");
const kql_1 = require("./kql");
const network_empty_page_1 = require("./network_empty_page");
const i18n = tslib_1.__importStar(require("./translations"));
const tls_1 = require("../../containers/tls");
const users_table_1 = require("../../components/page/network/users_table");
const users_1 = require("../../containers/users");
const DomainsTableManage = manage_query_1.manageQuery(domains_table_1.DomainsTable);
const TlsTableManage = manage_query_1.manageQuery(tls_table_1.TlsTable);
const UsersTableManage = manage_query_1.manageQuery(users_table_1.UsersTable);
exports.IPDetailsComponent = recompose_1.pure(({ match: { params: { ip }, }, filterQuery, flowTarget, }) => (react_1.default.createElement(source_1.WithSource, { sourceId: "default", "data-test-subj": "ip-details-page" }, ({ indicesExist, indexPattern }) => source_1.indicesExistOrDataTemporarilyUnavailable(indicesExist) ? (react_1.default.createElement(react_sticky_1.StickyContainer, null,
    react_1.default.createElement(filters_global_1.FiltersGlobal, null,
        react_1.default.createElement(kql_1.NetworkKql, { indexPattern: indexPattern, type: store_1.networkModel.NetworkType.details })),
    react_1.default.createElement(header_page_1.HeaderPage, { "data-test-subj": "ip-details-headline", subtitle: react_1.default.createElement(last_event_time_1.LastEventTime, { indexKey: types_1.LastEventIndexKey.ipDetails, ip: helpers_1.decodeIpv6(ip) }), title: helpers_1.decodeIpv6(ip) },
        react_1.default.createElement(flow_target_select_connected_1.FlowTargetSelectConnected, null)),
    react_1.default.createElement(global_time_1.GlobalTime, null, ({ to, from, setQuery }) => (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ip_overview_2.IpOverviewQuery, { sourceId: "default", filterQuery: filterQuery, type: store_1.networkModel.NetworkType.details, ip: helpers_1.decodeIpv6(ip) }, ({ ipOverviewData, loading }) => (react_1.default.createElement(ip_overview_1.IpOverview, { ip: helpers_1.decodeIpv6(ip), data: ipOverviewData, loading: loading, type: store_1.networkModel.NetworkType.details, flowTarget: flowTarget }))),
        react_1.default.createElement(eui_1.EuiHorizontalRule, null),
        react_1.default.createElement(domains_1.DomainsQuery, { endDate: to, filterQuery: filterQuery, flowTarget: flowTarget, ip: helpers_1.decodeIpv6(ip), sourceId: "default", startDate: from, type: store_1.networkModel.NetworkType.details }, ({ id, domains, totalCount, pageInfo, loading, loadMore, refetch }) => (react_1.default.createElement(DomainsTableManage, { data: domains, indexPattern: indexPattern, id: id, flowTarget: flowTarget, hasNextPage: fp_1.getOr(false, 'hasNextPage', pageInfo), ip: ip, loading: loading, loadMore: loadMore, nextCursor: fp_1.getOr(null, 'endCursor.value', pageInfo), refetch: refetch, setQuery: setQuery, totalCount: totalCount, type: store_1.networkModel.NetworkType.details }))),
        react_1.default.createElement(eui_1.EuiSpacer, null),
        react_1.default.createElement(users_1.UsersQuery, { endDate: to, filterQuery: filterQuery, flowTarget: flowTarget, ip: helpers_1.decodeIpv6(ip), sourceId: "default", startDate: from, type: store_1.networkModel.NetworkType.details }, ({ id, users, totalCount, pageInfo, loading, loadMore, refetch }) => (react_1.default.createElement(UsersTableManage, { data: users, id: id, flowTarget: flowTarget, hasNextPage: fp_1.getOr(false, 'hasNextPage', pageInfo), loading: loading, loadMore: loadMore, nextCursor: fp_1.getOr(null, 'endCursor.value', pageInfo), refetch: refetch, setQuery: setQuery, totalCount: totalCount, type: store_1.networkModel.NetworkType.details }))),
        react_1.default.createElement(eui_1.EuiSpacer, null),
        react_1.default.createElement(tls_1.TlsQuery, { endDate: to, filterQuery: filterQuery, flowTarget: flowTarget, ip: helpers_1.decodeIpv6(ip), sourceId: "default", startDate: from, type: store_1.networkModel.NetworkType.details }, ({ id, tls, totalCount, pageInfo, loading, loadMore, refetch }) => (react_1.default.createElement(TlsTableManage, { data: tls, id: id, hasNextPage: fp_1.getOr(false, 'hasNextPage', pageInfo) || false, loading: loading, loadMore: loadMore, nextCursor: fp_1.getOr(null, 'endCursor.value', pageInfo), refetch: refetch, setQuery: setQuery, totalCount: totalCount, type: store_1.networkModel.NetworkType.details })))))))) : (react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(header_page_1.HeaderPage, { title: helpers_1.decodeIpv6(ip) }),
    react_1.default.createElement(network_empty_page_1.NetworkEmptyPage, null))))));
const makeMapStateToProps = () => {
    const getNetworkFilterQuery = store_1.networkSelectors.networkFilterQueryAsJson();
    const getIpDetailsFlowTargetSelector = store_1.networkSelectors.ipDetailsFlowTargetSelector();
    return (state) => ({
        filterQuery: getNetworkFilterQuery(state, store_1.networkModel.NetworkType.details) || '',
        flowTarget: getIpDetailsFlowTargetSelector(state),
    });
};
exports.IPDetails = react_redux_1.connect(makeMapStateToProps)(exports.IPDetailsComponent);
exports.getBreadcrumbs = (ip) => [
    {
        text: i18n.PAGE_TITLE,
        href: redirect_to_network_1.getNetworkUrl(),
    },
    {
        text: helpers_1.decodeIpv6(ip),
    },
];
