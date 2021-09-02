"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const eui_1 = require("@elastic/eui");
const react_2 = require("@kbn/i18n/react");
const eui_theme_light_json_1 = tslib_1.__importDefault(require("@elastic/eui/dist/eui_theme_light.json"));
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
exports.Icon = styled_components_1.default(eui_1.EuiIcon) `
  margin-right: ${eui_theme_light_json_1.default.euiSizeS};
`;
class HelpMenuComponent extends react_1.default.PureComponent {
    render() {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(eui_1.EuiHorizontalRule, { margin: "none" }),
            react_1.default.createElement(eui_1.EuiSpacer, null),
            react_1.default.createElement(eui_1.EuiTitle, { size: "xxs" },
                react_1.default.createElement("h6", null,
                    react_1.default.createElement(exports.Icon, { type: "securityAnalyticsApp" }),
                    react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.siem.chrome.help.title", defaultMessage: "SIEM Application Help" }))),
            react_1.default.createElement(eui_1.EuiSpacer, null),
            react_1.default.createElement(eui_1.EuiButton, { iconType: "popout", href: "https://discuss.elastic.co/c/siem", target: "_blank" },
                react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.siem.chrome.help.feedback", defaultMessage: "Submit feedback" }))));
    }
}
exports.HelpMenuComponent = HelpMenuComponent;
