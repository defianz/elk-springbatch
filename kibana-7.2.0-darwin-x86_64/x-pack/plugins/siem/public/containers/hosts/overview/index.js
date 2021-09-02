"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fp_1 = require("lodash/fp");
const react_1 = tslib_1.__importDefault(require("react"));
const react_apollo_1 = require("react-apollo");
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const constants_1 = require("../../../../common/constants");
const helpers_1 = require("../../helpers");
const query_template_1 = require("../../query_template");
const host_overview_gql_query_1 = require("./host_overview.gql_query");
class HostOverviewByNameQuery extends query_template_1.QueryTemplate {
    render() {
        const { id = 'hostOverviewQuery', children, hostName, sourceId, startDate, endDate, } = this.props;
        return (react_1.default.createElement(react_apollo_1.Query, { query: host_overview_gql_query_1.HostOverviewQuery, fetchPolicy: helpers_1.getDefaultFetchPolicy(), notifyOnNetworkStatusChange: true, variables: {
                sourceId,
                hostName,
                timerange: {
                    interval: '12h',
                    from: startDate,
                    to: endDate,
                },
                defaultIndex: chrome_1.default.getUiSettingsClient().get(constants_1.DEFAULT_INDEX_KEY),
            } }, ({ data, loading, refetch }) => {
            const hostOverview = fp_1.getOr([], 'source.HostOverview', data);
            return children({
                id,
                refetch,
                loading,
                hostOverview,
                startDate,
                endDate,
            });
        }));
    }
}
exports.HostOverviewByNameQuery = HostOverviewByNameQuery;
