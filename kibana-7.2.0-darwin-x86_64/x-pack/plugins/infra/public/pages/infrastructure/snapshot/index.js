"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = require("@kbn/i18n/react");
const react_2 = tslib_1.__importStar(require("react"));
const react_3 = require("ui/capabilities/react");
const page_content_1 = require("./page_content");
const toolbar_1 = require("./toolbar");
const document_title_1 = require("../../../components/document_title");
const no_indices_1 = require("../../../components/empty_states/no_indices");
const header_1 = require("../../../components/header");
const page_1 = require("../../../components/page");
const source_configuration_1 = require("../../../components/source_configuration");
const source_configuration_2 = require("../../../components/source_configuration");
const source_error_page_1 = require("../../../components/source_error_page");
const source_loading_page_1 = require("../../../components/source_loading_page");
const source_1 = require("../../../containers/source");
const with_waffle_filters_1 = require("../../../containers/waffle/with_waffle_filters");
const with_waffle_options_1 = require("../../../containers/waffle/with_waffle_options");
const with_waffle_time_1 = require("../../../containers/waffle/with_waffle_time");
const with_kibana_chrome_1 = require("../../../containers/with_kibana_chrome");
exports.SnapshotPage = react_3.injectUICapabilities(react_1.injectI18n((props) => {
    const { intl, uiCapabilities } = props;
    const { showIndicesConfiguration } = react_2.useContext(source_configuration_2.SourceConfigurationFlyoutState.Context);
    const { derivedIndexPattern, hasFailedLoadingSource, isLoading, loadSourceFailureMessage, loadSource, metricIndicesExist, } = react_2.useContext(source_1.Source.Context);
    return (react_2.default.createElement(page_1.ColumnarPage, null,
        react_2.default.createElement(document_title_1.DocumentTitle, { title: (previousTitle) => intl.formatMessage({
                id: 'xpack.infra.infrastructureSnapshotPage.documentTitle',
                defaultMessage: '{previousTitle} | Inventory',
            }, {
                previousTitle,
            }) }),
        react_2.default.createElement(header_1.Header, { breadcrumbs: [
                {
                    href: '#/',
                    text: intl.formatMessage({
                        id: 'xpack.infra.header.infrastructureTitle',
                        defaultMessage: 'Infrastructure',
                    }),
                },
            ], readOnlyBadge: !uiCapabilities.infrastructure.save }),
        react_2.default.createElement(source_configuration_1.SourceConfigurationFlyout, { shouldAllowEdit: uiCapabilities.infrastructure.configureSource }),
        isLoading ? (react_2.default.createElement(source_loading_page_1.SourceLoadingPage, null)) : metricIndicesExist ? (react_2.default.createElement(react_2.default.Fragment, null,
            react_2.default.createElement(with_waffle_time_1.WithWaffleTimeUrlState, null),
            react_2.default.createElement(with_waffle_filters_1.WithWaffleFilterUrlState, { indexPattern: derivedIndexPattern }),
            react_2.default.createElement(with_waffle_options_1.WithWaffleOptionsUrlState, null),
            react_2.default.createElement(toolbar_1.SnapshotToolbar, null),
            react_2.default.createElement(page_content_1.SnapshotPageContent, null))) : hasFailedLoadingSource ? (react_2.default.createElement(source_error_page_1.SourceErrorPage, { errorMessage: loadSourceFailureMessage || '', retry: loadSource })) : (react_2.default.createElement(with_kibana_chrome_1.WithKibanaChrome, null, ({ basePath }) => (react_2.default.createElement(no_indices_1.NoIndices, { title: intl.formatMessage({
                id: 'xpack.infra.homePage.noMetricsIndicesTitle',
                defaultMessage: "Looks like you don't have any metrics indices.",
            }), message: intl.formatMessage({
                id: 'xpack.infra.homePage.noMetricsIndicesDescription',
                defaultMessage: "Let's add some!",
            }), actions: react_2.default.createElement(eui_1.EuiFlexGroup, null,
                react_2.default.createElement(eui_1.EuiFlexItem, null,
                    react_2.default.createElement(eui_1.EuiButton, { href: `${basePath}/app/kibana#/home/tutorial_directory/metrics`, color: "primary", fill: true, "data-test-subj": "infrastructureViewSetupInstructionsButton" }, intl.formatMessage({
                        id: 'xpack.infra.homePage.noMetricsIndicesInstructionsActionLabel',
                        defaultMessage: 'View setup instructions',
                    }))),
                uiCapabilities.infrastructure.configureSource ? (react_2.default.createElement(eui_1.EuiFlexItem, null,
                    react_2.default.createElement(eui_1.EuiButton, { "data-test-subj": "configureSourceButton", color: "primary", onClick: showIndicesConfiguration }, intl.formatMessage({
                        id: 'xpack.infra.configureSourceActionLabel',
                        defaultMessage: 'Change source configuration',
                    })))) : null), "data-test-subj": "noMetricsIndicesPrompt" }))))));
}));
