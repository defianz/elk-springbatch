"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// @ts-ignore EuiSearchBar missing
const eui_1 = require("@elastic/eui");
const i18n_1 = require("@kbn/i18n");
const react_1 = tslib_1.__importStar(require("react"));
const breadcrumbs_1 = require("../breadcrumbs");
const functional_1 = require("../components/functional");
const contexts_1 = require("../contexts");
const hooks_1 = require("../hooks");
const stringify_url_params_1 = require("../lib/helper/stringify_url_params");
exports.OverviewPage = ({ basePath, setBreadcrumbs, history, location }) => {
    const { colors, refreshApp, setHeadingText } = react_1.useContext(contexts_1.UptimeSettingsContext);
    const [params, updateUrl] = hooks_1.useUrlParams(history, location);
    const { dateRangeStart, dateRangeEnd, search } = params;
    react_1.useEffect(() => {
        setBreadcrumbs(breadcrumbs_1.getOverviewPageBreadcrumbs());
        if (setHeadingText) {
            setHeadingText(i18n_1.i18n.translate('xpack.uptime.overviewPage.headerText', {
                defaultMessage: 'Overview',
                description: `The text that will be displayed in the app's heading when the Overview page loads.`,
            }));
        }
    }, []);
    const filterQueryString = search || '';
    const sharedProps = {
        dateRangeStart,
        dateRangeEnd,
        filters: search ? JSON.stringify(eui_1.EuiSearchBar.Query.toESQuery(filterQueryString)) : undefined,
    };
    const updateQuery = ({ query }) => {
        try {
            if (query && typeof query.text !== 'undefined') {
                updateUrl({ search: query.text });
            }
            if (refreshApp) {
                refreshApp();
            }
        }
        catch (e) {
            updateUrl({ search: '' });
        }
    };
    const linkParameters = stringify_url_params_1.stringifyUrlParams(params);
    return (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement(functional_1.EmptyState, { basePath: basePath, implementsCustomErrorState: true, variables: sharedProps },
            react_1.default.createElement(functional_1.FilterBar, { currentQuery: filterQueryString, updateQuery: updateQuery, variables: sharedProps }),
            react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
            react_1.default.createElement(functional_1.Snapshot, { colors: colors, variables: sharedProps }),
            react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
            react_1.default.createElement(functional_1.MonitorList, { basePath: basePath, dangerColor: colors.danger, dateRangeStart: dateRangeStart, dateRangeEnd: dateRangeEnd, linkParameters: linkParameters, variables: sharedProps }),
            react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
            react_1.default.createElement(functional_1.ErrorList, { linkParameters: linkParameters, variables: sharedProps }))));
};
