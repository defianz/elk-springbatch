"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const eui_theme_dark_json_1 = tslib_1.__importDefault(require("@elastic/eui/dist/eui_theme_dark.json"));
const eui_theme_light_json_1 = tslib_1.__importDefault(require("@elastic/eui/dist/eui_theme_light.json"));
const i18n_1 = require("@kbn/i18n");
const react_1 = tslib_1.__importStar(require("react"));
const react_apollo_1 = require("react-apollo");
const react_router_dom_1 = require("react-router-dom");
const capabilities_1 = require("ui/capabilities");
const i18n_2 = require("ui/i18n");
const pages_1 = require("./pages");
const contexts_1 = require("./contexts");
const uptime_date_picker_1 = require("./components/functional/uptime_date_picker");
const hooks_1 = require("./hooks");
const Application = (props) => {
    const { basePath, client, darkMode, isApmAvailable, isInfraAvailable, isLogsAvailable, renderGlobalHelpControls, routerBasename, setBreadcrumbs, setBadge, } = props;
    let colors;
    if (darkMode) {
        colors = {
            success: eui_theme_dark_json_1.default.euiColorSuccess,
            range: eui_theme_dark_json_1.default.euiFocusBackgroundColor,
            mean: eui_theme_dark_json_1.default.euiColorPrimary,
            danger: eui_theme_dark_json_1.default.euiColorDanger,
        };
    }
    else {
        colors = {
            success: eui_theme_light_json_1.default.euiColorSuccess,
            range: eui_theme_light_json_1.default.euiFocusBackgroundColor,
            mean: eui_theme_light_json_1.default.euiColorPrimary,
            danger: eui_theme_light_json_1.default.euiColorDanger,
        };
    }
    const [lastRefresh, setLastRefresh] = react_1.useState(Date.now());
    const [headingText, setHeadingText] = react_1.useState(undefined);
    react_1.useEffect(() => {
        renderGlobalHelpControls();
        setBadge(!capabilities_1.capabilities.get().uptime.save
            ? {
                text: i18n_1.i18n.translate('xpack.uptime.badge.readOnly.text', {
                    defaultMessage: 'Read only',
                }),
                tooltip: i18n_1.i18n.translate('xpack.uptime.badge.readOnly.tooltip', {
                    defaultMessage: 'Unable to save',
                }),
                iconType: 'glasses',
            }
            : undefined);
    }, []);
    const refreshApp = () => {
        setLastRefresh(Date.now());
    };
    return (react_1.default.createElement(i18n_2.I18nContext, null,
        react_1.default.createElement(react_router_dom_1.BrowserRouter, { basename: routerBasename },
            react_1.default.createElement(react_router_dom_1.Route, { path: "/", render: (rootRouteProps) => {
                    const [{ autorefreshInterval, autorefreshIsPaused, dateRangeStart, dateRangeEnd },] = hooks_1.useUrlParams(rootRouteProps.history, rootRouteProps.location);
                    return (react_1.default.createElement(react_apollo_1.ApolloProvider, { client: client },
                        react_1.default.createElement(contexts_1.UptimeSettingsContext.Provider, { value: {
                                autorefreshInterval,
                                autorefreshIsPaused,
                                basePath,
                                colors,
                                dateRangeStart,
                                dateRangeEnd,
                                isApmAvailable,
                                isInfraAvailable,
                                isLogsAvailable,
                                refreshApp,
                                setHeadingText,
                            } },
                            react_1.default.createElement(contexts_1.UptimeRefreshContext.Provider, { value: { lastRefresh } },
                                react_1.default.createElement(eui_1.EuiPage, { className: "app-wrapper-panel ", "data-test-subj": "uptimeApp" },
                                    react_1.default.createElement("div", null,
                                        react_1.default.createElement(eui_1.EuiFlexGroup, { alignItems: "center", justifyContent: "spaceBetween", gutterSize: "s" },
                                            react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                                                react_1.default.createElement(eui_1.EuiTitle, null,
                                                    react_1.default.createElement("h2", null, headingText))),
                                            react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                                                react_1.default.createElement(uptime_date_picker_1.UptimeDatePicker, Object.assign({ refreshApp: refreshApp }, rootRouteProps)))),
                                        react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
                                        react_1.default.createElement(react_router_dom_1.Switch, null,
                                            react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/", render: routerProps => (react_1.default.createElement(pages_1.OverviewPage, Object.assign({ basePath: basePath, setBreadcrumbs: setBreadcrumbs }, routerProps))) }),
                                            react_1.default.createElement(react_router_dom_1.Route, { path: "/monitor/:id/:location?", render: routerProps => (react_1.default.createElement(pages_1.MonitorPage, Object.assign({ query: client.query, setBreadcrumbs: setBreadcrumbs }, routerProps))) }))))))));
                } }))));
};
exports.UptimeApp = (props) => react_1.default.createElement(Application, Object.assign({}, props));
