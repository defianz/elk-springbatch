"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const react_1 = tslib_1.__importStar(require("react"));
const breadcrumbs_1 = require("../breadcrumbs");
const functional_1 = require("../components/functional");
const contexts_1 = require("../contexts");
const hooks_1 = require("../hooks");
const stringify_url_params_1 = require("../lib/helper/stringify_url_params");
exports.MonitorPage = ({ history, location, query, setBreadcrumbs }) => {
    const parsedPath = location.pathname.replace(/^(\/monitor\/)/, '').split('/');
    const [monitorId] = react_1.useState(decodeURI(parsedPath[0]));
    const [geoLocation] = react_1.useState(parsedPath[1] ? decodeURI(parsedPath[1]) : undefined);
    const { colors, refreshApp, setHeadingText } = react_1.useContext(contexts_1.UptimeSettingsContext);
    const [params, updateUrlParams] = hooks_1.useUrlParams(history, location);
    const { dateRangeStart, dateRangeEnd, selectedPingStatus } = params;
    react_1.useEffect(() => {
        query({
            query: graphql_tag_1.default `
          query MonitorPageTitle($monitorId: String!) {
            monitorPageTitle: getMonitorPageTitle(monitorId: $monitorId) {
              id
              url
              name
            }
          }
        `,
            variables: { monitorId },
        }).then((result) => {
            const { name, url, id } = result.data.monitorPageTitle;
            const heading = name || url || id;
            setBreadcrumbs(breadcrumbs_1.getMonitorPageBreadcrumb(heading, stringify_url_params_1.stringifyUrlParams(params)));
            if (setHeadingText) {
                setHeadingText(heading);
            }
        });
    }, [params]);
    const sharedVariables = { dateRangeStart, dateRangeEnd, location: geoLocation, monitorId };
    return (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement(functional_1.MonitorPageTitle, { monitorId: monitorId, variables: { monitorId } }),
        react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
        react_1.default.createElement(functional_1.MonitorStatusBar, { monitorId: monitorId, variables: sharedVariables }),
        react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
        react_1.default.createElement(functional_1.MonitorCharts, Object.assign({}, colors, { variables: sharedVariables })),
        react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
        react_1.default.createElement(functional_1.PingList, { onSelectedStatusUpdate: (selectedStatus) => updateUrlParams({ selectedPingStatus: selectedStatus || '' }), onUpdateApp: refreshApp, selectedOption: selectedPingStatus, variables: {
                ...sharedVariables,
                status: selectedPingStatus,
            } })));
};
