"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_2 = require("@kbn/i18n/react");
const with_metrics_time_1 = require("../../containers/metrics/with_metrics_time");
const use_host_ip_to_name_1 = require("./use_host_ip_to_name");
const query_params_1 = require("./query_params");
const loading_page_1 = require("../../components/loading_page");
const error_1 = require("../error");
const source_1 = require("../../containers/source/source");
exports.RedirectToHostDetailViaIP = react_2.injectI18n(({ match: { params: { hostIp }, }, location, intl, }) => {
    const { source } = source_1.useSource({ sourceId: 'default' });
    const { error, name } = use_host_ip_to_name_1.useHostIpToName(hostIp, (source && source.configuration && source.configuration.metricAlias) || null);
    if (error) {
        return (react_1.default.createElement(error_1.Error, { message: intl.formatMessage({
                id: 'xpack.infra.linkTo.hostWithIp.error',
                defaultMessage: 'Host not found with IP address "{hostIp}".',
            }, { hostIp }) }));
    }
    const searchString = with_metrics_time_1.replaceMetricTimeInQueryString(query_params_1.getFromFromLocation(location), query_params_1.getToFromLocation(location))('');
    if (name) {
        return react_1.default.createElement(react_router_dom_1.Redirect, { to: `/metrics/host/${name}?${searchString}` });
    }
    return (react_1.default.createElement(loading_page_1.LoadingPage, { message: intl.formatMessage({
            id: 'xpack.infra.linkTo.hostWithIp.loading',
            defaultMessage: 'Loading host with IP address "{hostIp}".',
        }, { hostIp }) }));
});
