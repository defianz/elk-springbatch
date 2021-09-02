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
const source_configuration_flyout_state_1 = require("./source_configuration_flyout_state");
exports.SourceConfigurationButton = () => {
    const { toggleIsVisible } = react_2.useContext(source_configuration_flyout_state_1.SourceConfigurationFlyoutState.Context);
    return (react_2.default.createElement(eui_1.EuiButtonEmpty, { "aria-label": "Configure source", color: "text", "data-test-subj": "configureSourceButton", iconType: "gear", onClick: toggleIsVisible, size: "xs" },
        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.sourceConfiguration.sourceConfigurationButtonLabel", defaultMessage: "Configuration" })));
};
