"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const HoverActionsPanelContainer = styled_components_1.default.div `
  height: 100%;
  position: relative;
`;
const HoverActionsPanel = recompose_1.pure(({ children, show }) => (React.createElement(HoverActionsPanelContainer, { "data-test-subj": "hover-actions-panel-container" }, show ? children : null)));
const WithHoverActionsContainer = styled_components_1.default.div `
  display: flex;
  flex-direction: row;
  height: 100%;
  padding-right: 5px;
`;
/**
 * Decorates it's children with actions that are visible on hover.
 * This component does not enforce an opinion on the styling and
 * positioning of the hover content, but see the documentation for
 * the `hoverContent` for tips on (not) effecting layout on-hover.
 *
 * In addition to rendering the `hoverContent` prop on hover, this
 * component also passes `showHoverContent` as a render prop, which
 * provides a signal to the content that the user is in a hover state.
 */
class WithHoverActions extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onMouseEnter = () => {
            this.setState({ showHoverContent: true });
        };
        this.onMouseLeave = () => {
            this.setState({ showHoverContent: false });
        };
        this.state = { showHoverContent: false };
    }
    render() {
        const { alwaysShow = false, hoverContent, render } = this.props;
        return (React.createElement(WithHoverActionsContainer, { onMouseEnter: this.onMouseEnter, onMouseLeave: this.onMouseLeave },
            React.createElement(React.Fragment, null, render(this.state.showHoverContent)),
            React.createElement(HoverActionsPanel, { show: this.state.showHoverContent || alwaysShow }, hoverContent != null ? hoverContent : React.createElement(React.Fragment, null))));
    }
}
exports.WithHoverActions = WithHoverActions;
