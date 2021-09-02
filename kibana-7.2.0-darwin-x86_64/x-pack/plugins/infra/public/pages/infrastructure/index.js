"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = require("@kbn/i18n/react");
const react_2 = tslib_1.__importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const document_title_1 = require("../../components/document_title");
const help_center_content_1 = require("../../components/help_center_content");
const routed_tabs_1 = require("../../components/navigation/routed_tabs");
const page_1 = require("../../components/page");
const use_metrics_explorer_options_1 = require("../../containers/metrics_explorer/use_metrics_explorer_options");
const with_metrics_explorer_options_url_state_1 = require("../../containers/metrics_explorer/with_metrics_explorer_options_url_state");
const with_source_1 = require("../../containers/with_source");
const source_configuration_1 = require("../../components/source_configuration");
const source_1 = require("../../containers/source");
const metrics_explorer_1 = require("./metrics_explorer");
const snapshot_1 = require("./snapshot");
exports.InfrastructurePage = react_1.injectI18n(({ match, intl }) => (react_2.default.createElement(source_1.Source.Provider, { sourceId: "default" },
    react_2.default.createElement(source_configuration_1.SourceConfigurationFlyoutState.Provider, null,
        react_2.default.createElement(page_1.ColumnarPage, null,
            react_2.default.createElement(document_title_1.DocumentTitle, { title: intl.formatMessage({
                    id: 'xpack.infra.homePage.documentTitle',
                    defaultMessage: 'Infrastructure',
                }) }),
            react_2.default.createElement(help_center_content_1.HelpCenterContent, { feedbackLink: "https://discuss.elastic.co/c/infrastructure", feedbackLinkText: intl.formatMessage({
                    id: 'xpack.infra.infrastructure.infrastructureHelpContent.feedbackLinkText',
                    defaultMessage: 'Provide feedback for Infrastructure',
                }) }),
            react_2.default.createElement(routed_tabs_1.RoutedTabs, { tabs: [
                    {
                        title: intl.formatMessage({
                            id: 'xpack.infra.homePage.inventoryTabTitle',
                            defaultMessage: 'Inventory',
                        }),
                        path: `${match.path}/inventory`,
                    },
                    {
                        title: intl.formatMessage({
                            id: 'xpack.infra.homePage.metricsExplorerTabTitle',
                            defaultMessage: 'Metrics explorer',
                        }),
                        path: `${match.path}/metrics-explorer`,
                    },
                ] }),
            react_2.default.createElement(react_router_dom_1.Switch, null,
                react_2.default.createElement(react_router_dom_1.Route, { path: `${match.path}/inventory`, component: snapshot_1.SnapshotPage }),
                react_2.default.createElement(react_router_dom_1.Route, { path: `${match.path}/metrics-explorer`, render: props => (react_2.default.createElement(with_source_1.WithSource, null, ({ configuration, derivedIndexPattern }) => (react_2.default.createElement(use_metrics_explorer_options_1.MetricsExplorerOptionsContainer.Provider, null,
                        react_2.default.createElement(with_metrics_explorer_options_url_state_1.WithMetricsExplorerOptionsUrlState, null),
                        react_2.default.createElement(metrics_explorer_1.MetricsExplorerPage, Object.assign({ derivedIndexPattern: derivedIndexPattern, source: configuration }, props)))))) })))))));
