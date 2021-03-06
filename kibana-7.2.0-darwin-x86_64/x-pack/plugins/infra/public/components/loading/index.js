"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const React = tslib_1.__importStar(require("react"));
const eui_styled_components_1 = tslib_1.__importDefault(require("../../../../../common/eui_styled_components"));
class InfraLoadingPanel extends React.PureComponent {
    render() {
        const { height, text, width } = this.props;
        return (React.createElement(exports.InfraLoadingStaticPanel, { style: { height, width } },
            React.createElement(exports.InfraLoadingStaticContentPanel, null,
                React.createElement(eui_1.EuiPanel, null,
                    React.createElement(eui_1.EuiLoadingChart, { size: "m" }),
                    React.createElement(eui_1.EuiText, null,
                        React.createElement("p", null, text))))));
    }
}
exports.InfraLoadingPanel = InfraLoadingPanel;
exports.InfraLoadingStaticPanel = eui_styled_components_1.default.div `
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
exports.InfraLoadingStaticContentPanel = eui_styled_components_1.default.div `
  flex: 0 0 auto;
  align-self: center;
  text-align: center;
`;
