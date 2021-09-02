"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const fp_1 = require("lodash/fp");
const react_1 = tslib_1.__importDefault(require("react"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const hosts_1 = require("../../../containers/hosts");
const network_1 = require("../../../containers/network");
const helpers_1 = require("../../../lib/helpers");
const with_hover_actions_1 = require("../../with_hover_actions");
const i18n = tslib_1.__importStar(require("./translations"));
class AddToKqlComponent extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.addToKql = () => {
            const { expression, filterQueryDraft, applyFilterQueryFromKueryExpression } = this.props;
            applyFilterQueryFromKueryExpression(filterQueryDraft && !fp_1.isEmpty(filterQueryDraft.expression)
                ? `${filterQueryDraft.expression} and ${expression}`
                : expression);
        };
    }
    render() {
        const { children } = this.props;
        return (react_1.default.createElement(with_hover_actions_1.WithHoverActions, { hoverContent: react_1.default.createElement(HoverActionsContainer, { "data-test-subj": "hover-actions-container" },
                react_1.default.createElement(eui_1.EuiToolTip, { content: i18n.FILTER_FOR_VALUE },
                    react_1.default.createElement(eui_1.EuiIcon, { type: "filter", onClick: this.addToKql }))), render: () => children }));
    }
}
const HoverActionsContainer = styled_components_1.default(eui_1.EuiPanel) `
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 25px;
  justify-content: center;
  left: 5px;
  position: absolute;
  top: -10px;
  width: 30px;
  cursor: pointer;
`;
exports.AddToKql = recompose_1.pure(({ children, expression, type, componentFilterType, indexPattern }) => {
    switch (componentFilterType) {
        case 'hosts':
            return (react_1.default.createElement(hosts_1.HostsFilter, { indexPattern: indexPattern, type: type }, ({ applyFilterQueryFromKueryExpression, filterQueryDraft }) => (react_1.default.createElement(AddToKqlComponent, { applyFilterQueryFromKueryExpression: applyFilterQueryFromKueryExpression, expression: expression, filterQueryDraft: filterQueryDraft }, children))));
        case 'network':
            return (react_1.default.createElement(network_1.NetworkFilter, { indexPattern: indexPattern, type: type }, ({ applyFilterQueryFromKueryExpression, filterQueryDraft }) => (react_1.default.createElement(AddToKqlComponent, { applyFilterQueryFromKueryExpression: applyFilterQueryFromKueryExpression, expression: expression, filterQueryDraft: filterQueryDraft }, children))));
    }
    helpers_1.assertUnreachable(componentFilterType, 'Unknown Filter Type in switch statement');
});
