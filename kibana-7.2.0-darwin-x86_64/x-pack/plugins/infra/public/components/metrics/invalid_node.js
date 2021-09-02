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
const eui_styled_components_1 = tslib_1.__importDefault(require("../../../../../common/eui_styled_components"));
const source_configuration_1 = require("../../components/source_configuration");
const with_kibana_chrome_1 = require("../../containers/with_kibana_chrome");
exports.InvalidNodeError = ({ nodeName }) => {
    const { showIndicesConfiguration } = react_2.useContext(source_configuration_1.SourceConfigurationFlyoutState.Context);
    return (react_2.default.createElement(with_kibana_chrome_1.WithKibanaChrome, null, ({ basePath }) => (react_2.default.createElement(CenteredEmptyPrompt, { title: react_2.default.createElement("h2", null,
            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.metrics.invalidNodeErrorTitle", defaultMessage: "Looks like {nodeName} isn't collecting any metrics data", values: {
                    nodeName,
                } })), body: react_2.default.createElement("p", null,
            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.metrics.invalidNodeErrorDescription", defaultMessage: "Double check your configuration" })), actions: react_2.default.createElement(eui_1.EuiFlexGroup, null,
            react_2.default.createElement(eui_1.EuiFlexItem, null,
                react_2.default.createElement(eui_1.EuiButton, { href: `${basePath}/app/kibana#/home/tutorial_directory/metrics`, color: "primary", fill: true },
                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.homePage.noMetricsIndicesInstructionsActionLabel", defaultMessage: "View setup instructions" }))),
            react_2.default.createElement(eui_1.EuiFlexItem, null,
                react_2.default.createElement(eui_1.EuiButton, { color: "primary", onClick: showIndicesConfiguration },
                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.configureSourceActionLabel", defaultMessage: "Change source configuration" })))) }))));
};
const CenteredEmptyPrompt = eui_styled_components_1.default(eui_1.EuiEmptyPrompt) `
  align-self: center;
`;
