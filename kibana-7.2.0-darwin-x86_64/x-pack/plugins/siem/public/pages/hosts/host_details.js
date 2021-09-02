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
const redirect_to_hosts_1 = require("../../components/link_to/redirect_to_hosts");
const hosts_1 = require("../../components/page/hosts");
const authentications_table_1 = require("../../components/page/hosts/authentications_table");
const host_overview_1 = require("../../components/page/hosts/host_overview");
const manage_query_1 = require("../../components/page/manage_query");
const authentications_1 = require("../../containers/authentications");
const events_1 = require("../../containers/events");
const global_time_1 = require("../../containers/global_time");
const overview_1 = require("../../containers/hosts/overview");
const source_1 = require("../../containers/source");
const uncommon_processes_1 = require("../../containers/uncommon_processes");
const types_1 = require("../../graphql/types");
const keury_1 = require("../../lib/keury");
const store_1 = require("../../store");
const hosts_empty_page_1 = require("./hosts_empty_page");
const kql_1 = require("./kql");
const i18n = tslib_1.__importStar(require("./translations"));
const type = store_1.hostsModel.HostsType.details;
const HostOverviewManage = manage_query_1.manageQuery(host_overview_1.HostOverview);
const AuthenticationTableManage = manage_query_1.manageQuery(authentications_table_1.AuthenticationTable);
const UncommonProcessTableManage = manage_query_1.manageQuery(hosts_1.UncommonProcessTable);
const EventsTableManage = manage_query_1.manageQuery(hosts_1.EventsTable);
const HostDetailsComponent = recompose_1.pure(({ match: { params: { hostName }, }, filterQueryExpression, }) => (react_1.default.createElement(source_1.WithSource, { sourceId: "default" }, ({ indicesExist, indexPattern }) => source_1.indicesExistOrDataTemporarilyUnavailable(indicesExist) ? (react_1.default.createElement(react_sticky_1.StickyContainer, null,
    react_1.default.createElement(filters_global_1.FiltersGlobal, null,
        react_1.default.createElement(kql_1.HostsKql, { indexPattern: indexPattern, type: type })),
    react_1.default.createElement(header_page_1.HeaderPage, { subtitle: react_1.default.createElement(last_event_time_1.LastEventTime, { indexKey: types_1.LastEventIndexKey.hostDetails, hostName: hostName }), title: hostName }),
    react_1.default.createElement(global_time_1.GlobalTime, null, ({ to, from, setQuery }) => (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(overview_1.HostOverviewByNameQuery, { sourceId: "default", hostName: hostName, startDate: from, endDate: to }, ({ hostOverview, loading, id, refetch }) => (react_1.default.createElement(HostOverviewManage, { id: id, refetch: refetch, setQuery: setQuery, data: hostOverview, loading: loading }))),
        react_1.default.createElement(eui_1.EuiHorizontalRule, null),
        react_1.default.createElement(authentications_1.AuthenticationsQuery, { sourceId: "default", startDate: from, endDate: to, filterQuery: getFilterQuery(hostName, filterQueryExpression, indexPattern), type: type }, ({ authentications, totalCount, loading, pageInfo, loadMore, id, refetch, }) => (react_1.default.createElement(AuthenticationTableManage, { id: id, refetch: refetch, setQuery: setQuery, loading: loading, data: authentications, totalCount: totalCount, nextCursor: fp_1.getOr(null, 'endCursor.value', pageInfo), hasNextPage: fp_1.getOr(false, 'hasNextPage', pageInfo), loadMore: loadMore, type: type }))),
        react_1.default.createElement(eui_1.EuiSpacer, null),
        react_1.default.createElement(uncommon_processes_1.UncommonProcessesQuery, { sourceId: "default", startDate: from, endDate: to, filterQuery: getFilterQuery(hostName, filterQueryExpression, indexPattern), type: type }, ({ uncommonProcesses, totalCount, loading, pageInfo, loadMore, id, refetch, }) => (react_1.default.createElement(UncommonProcessTableManage, { id: id, refetch: refetch, setQuery: setQuery, loading: loading, data: uncommonProcesses, totalCount: totalCount, nextCursor: fp_1.getOr(null, 'endCursor.value', pageInfo), hasNextPage: fp_1.getOr(false, 'hasNextPage', pageInfo), loadMore: loadMore, type: type }))),
        react_1.default.createElement(eui_1.EuiSpacer, null),
        react_1.default.createElement(events_1.EventsQuery, { endDate: to, filterQuery: getFilterQuery(hostName, filterQueryExpression, indexPattern), sourceId: "default", startDate: from, type: type }, ({ events, loading, id, refetch, totalCount, pageInfo, loadMore }) => (react_1.default.createElement(EventsTableManage, { id: id, refetch: refetch, setQuery: setQuery, data: events, loading: loading, totalCount: totalCount, nextCursor: fp_1.getOr(null, 'endCursor.value', pageInfo), tiebreaker: fp_1.getOr(null, 'endCursor.tiebreaker', pageInfo), hasNextPage: fp_1.getOr(false, 'hasNextPage', pageInfo), loadMore: loadMore, type: type })))))))) : (react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(header_page_1.HeaderPage, { title: hostName }),
    react_1.default.createElement(hosts_empty_page_1.HostsEmptyPage, null))))));
const makeMapStateToProps = () => {
    const getHostsFilterQuery = store_1.hostsSelectors.hostsFilterQueryExpression();
    return (state) => ({
        filterQueryExpression: getHostsFilterQuery(state, type) || '',
    });
};
exports.HostDetails = react_redux_1.connect(makeMapStateToProps)(HostDetailsComponent);
exports.getBreadcrumbs = (hostId) => [
    {
        text: i18n.PAGE_TITLE,
        href: redirect_to_hosts_1.getHostsUrl(),
    },
    {
        text: hostId,
    },
];
const getFilterQuery = (hostName, filterQueryExpression, indexPattern) => fp_1.isEmpty(filterQueryExpression)
    ? hostName
        ? { term: { 'host.name': hostName } }
        : ''
    : keury_1.convertKueryToElasticSearchQuery(`${filterQueryExpression} ${hostName ? `and host.name: "${keury_1.escapeQueryValue(hostName)}"` : ''}`, indexPattern);
