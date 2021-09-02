"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = require("@kbn/i18n/react");
const compose_1 = tslib_1.__importDefault(require("lodash/fp/compose"));
const react_2 = tslib_1.__importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const loading_page_1 = require("../../components/loading_page");
const with_log_filter_1 = require("../../containers/logs/with_log_filter");
const with_log_position_1 = require("../../containers/logs/with_log_position");
const source_id_1 = require("../../containers/source_id");
const query_params_1 = require("./query_params");
const source_1 = require("../../containers/source/source");
exports.RedirectToNodeLogs = react_1.injectI18n(({ match: { params: { nodeId, nodeType, sourceId = 'default' }, }, location, intl, }) => {
    const { source, isLoading } = source_1.useSource({ sourceId });
    const configuration = source && source.configuration;
    if (isLoading) {
        return (react_2.default.createElement(loading_page_1.LoadingPage, { message: intl.formatMessage({
                id: 'xpack.infra.redirectToNodeLogs.loadingNodeLogsMessage',
                defaultMessage: 'Loading {nodeType} logs',
            }, {
                nodeType,
            }) }));
    }
    if (!configuration) {
        return null;
    }
    const nodeFilter = `${configuration.fields[nodeType]}: ${nodeId}`;
    const userFilter = query_params_1.getFilterFromLocation(location);
    const filter = userFilter ? `(${nodeFilter}) and (${userFilter})` : nodeFilter;
    const searchString = compose_1.default(with_log_filter_1.replaceLogFilterInQueryString(filter), with_log_position_1.replaceLogPositionInQueryString(query_params_1.getTimeFromLocation(location)), source_id_1.replaceSourceIdInQueryString(sourceId))('');
    return react_2.default.createElement(react_router_dom_1.Redirect, { to: `/logs?${searchString}` });
});
exports.getNodeLogsUrl = ({ nodeId, nodeType, time, }) => [`#/link-to/${nodeType}-logs/`, nodeId, ...(time ? [`?time=${time}`] : [])].join('');
