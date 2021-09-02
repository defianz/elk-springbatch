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
const hosts_1 = require("../../components/page/hosts");
const authentications_table_1 = require("../../components/page/hosts/authentications_table");
const manage_query_1 = require("../../components/page/manage_query");
const authentications_1 = require("../../containers/authentications");
const events_1 = require("../../containers/events");
const global_time_1 = require("../../containers/global_time");
const hosts_2 = require("../../containers/hosts");
const kpi_hosts_1 = require("../../containers/kpi_hosts");
const source_1 = require("../../containers/source");
const uncommon_processes_1 = require("../../containers/uncommon_processes");
const types_1 = require("../../graphql/types");
const store_1 = require("../../store");
const hosts_empty_page_1 = require("./hosts_empty_page");
const kql_1 = require("./kql");
const i18n = tslib_1.__importStar(require("./translations"));
const AuthenticationTableManage = manage_query_1.manageQuery(authentications_table_1.AuthenticationTable);
const HostsTableManage = manage_query_1.manageQuery(hosts_1.HostsTable);
const EventsTableManage = manage_query_1.manageQuery(hosts_1.EventsTable);
const UncommonProcessTableManage = manage_query_1.manageQuery(hosts_1.UncommonProcessTable);
const KpiHostsComponentManage = manage_query_1.manageQuery(hosts_1.KpiHostsComponent);
const HostsComponent = recompose_1.pure(({ filterQuery }) => (react_1.default.createElement(source_1.WithSource, { sourceId: "default" }, ({ indicesExist, indexPattern }) => source_1.indicesExistOrDataTemporarilyUnavailable(indicesExist) ? (react_1.default.createElement(react_sticky_1.StickyContainer, null,
    react_1.default.createElement(filters_global_1.FiltersGlobal, null,
        react_1.default.createElement(kql_1.HostsKql, { indexPattern: indexPattern, type: store_1.hostsModel.HostsType.page })),
    react_1.default.createElement(header_page_1.HeaderPage, { subtitle: react_1.default.createElement(last_event_time_1.LastEventTime, { indexKey: types_1.LastEventIndexKey.hosts }), title: i18n.PAGE_TITLE }),
    react_1.default.createElement(global_time_1.GlobalTime, null, ({ to, from, setQuery }) => (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(kpi_hosts_1.KpiHostsQuery, { endDate: to, filterQuery: filterQuery, sourceId: "default", startDate: from }, ({ kpiHosts, loading, id, refetch }) => (react_1.default.createElement(KpiHostsComponentManage, { id: id, setQuery: setQuery, refetch: refetch, data: kpiHosts, loading: loading }))),
        react_1.default.createElement(eui_1.EuiSpacer, null),
        react_1.default.createElement(hosts_2.HostsQuery, { endDate: to, filterQuery: filterQuery, sourceId: "default", startDate: from, type: store_1.hostsModel.HostsType.page }, ({ hosts, totalCount, loading, pageInfo, loadMore, id, refetch }) => (react_1.default.createElement(HostsTableManage, { id: id, indexPattern: indexPattern, refetch: refetch, setQuery: setQuery, loading: loading, data: hosts, totalCount: totalCount, hasNextPage: fp_1.getOr(false, 'hasNextPage', pageInfo), nextCursor: fp_1.getOr(null, 'endCursor.value', pageInfo), loadMore: loadMore, type: store_1.hostsModel.HostsType.page }))),
        react_1.default.createElement(eui_1.EuiSpacer, null),
        react_1.default.createElement(authentications_1.AuthenticationsQuery, { endDate: to, filterQuery: filterQuery, sourceId: "default", startDate: from, type: store_1.hostsModel.HostsType.page }, ({ authentications, totalCount, loading, pageInfo, loadMore, id, refetch }) => (react_1.default.createElement(AuthenticationTableManage, { id: id, refetch: refetch, setQuery: setQuery, loading: loading, data: authentications, totalCount: totalCount, nextCursor: fp_1.getOr(null, 'endCursor.value', pageInfo), hasNextPage: fp_1.getOr(false, 'hasNextPage', pageInfo), loadMore: loadMore, type: store_1.hostsModel.HostsType.page }))),
        react_1.default.createElement(eui_1.EuiSpacer, null),
        react_1.default.createElement(uncommon_processes_1.UncommonProcessesQuery, { endDate: to, filterQuery: filterQuery, sourceId: "default", startDate: from, type: store_1.hostsModel.HostsType.page }, ({ uncommonProcesses, totalCount, loading, pageInfo, loadMore, id, refetch, }) => (react_1.default.createElement(UncommonProcessTableManage, { id: id, refetch: refetch, setQuery: setQuery, loading: loading, data: uncommonProcesses, totalCount: totalCount, nextCursor: fp_1.getOr(null, 'endCursor.value', pageInfo), hasNextPage: fp_1.getOr(false, 'hasNextPage', pageInfo), loadMore: loadMore, type: store_1.hostsModel.HostsType.page }))),
        react_1.default.createElement(eui_1.EuiSpacer, null),
        react_1.default.createElement(events_1.EventsQuery, { endDate: to, filterQuery: filterQuery, sourceId: "default", startDate: from, type: store_1.hostsModel.HostsType.page }, ({ events, loading, id, refetch, totalCount, pageInfo, loadMore }) => (react_1.default.createElement(EventsTableManage, { id: id, refetch: refetch, setQuery: setQuery, data: events, loading: loading, totalCount: totalCount, nextCursor: fp_1.getOr(null, 'endCursor.value', pageInfo), tiebreaker: fp_1.getOr(null, 'endCursor.tiebreaker', pageInfo), hasNextPage: fp_1.getOr(false, 'hasNextPage', pageInfo), loadMore: loadMore, type: store_1.hostsModel.HostsType.page })))))))) : (react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(header_page_1.HeaderPage, { title: i18n.PAGE_TITLE }),
    react_1.default.createElement(hosts_empty_page_1.HostsEmptyPage, null))))));
const makeMapStateToProps = () => {
    const getHostsFilterQueryAsJson = store_1.hostsSelectors.hostsFilterQueryAsJson();
    const mapStateToProps = (state) => ({
        filterQuery: getHostsFilterQueryAsJson(state, store_1.hostsModel.HostsType.page) || '',
    });
    return mapStateToProps;
};
exports.Hosts = react_redux_1.connect(makeMapStateToProps)(HostsComponent);
