"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const moment_1 = tslib_1.__importDefault(require("moment"));
const polished_1 = require("polished");
const react_1 = tslib_1.__importDefault(require("react"));
const react_2 = require("@kbn/i18n/react");
const eui_styled_components_1 = tslib_1.__importDefault(require("../../../../../common/eui_styled_components"));
const color_from_value_1 = require("./lib/color_from_value");
const node_context_menu_1 = require("./node_context_menu");
const initialState = {
    isPopoverOpen: false,
};
exports.Node = react_2.injectI18n(class extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.state = initialState;
        this.togglePopover = () => {
            this.setState(prevState => ({ isPopoverOpen: !prevState.isPopoverOpen }));
        };
        this.closePopover = () => {
            if (this.state.isPopoverOpen) {
                this.setState({ isPopoverOpen: false });
            }
        };
    }
    render() {
        const { nodeType, node, options, squareSize, bounds, formatter, timeRange, intl, } = this.props;
        const { isPopoverOpen } = this.state;
        const { metric } = node;
        const valueMode = squareSize > 70;
        const ellipsisMode = squareSize > 30;
        const rawValue = (metric && metric.value) || 0;
        const color = color_from_value_1.colorFromValue(options.legend, rawValue, bounds);
        const value = formatter(rawValue);
        const newTimerange = {
            ...timeRange,
            from: moment_1.default(timeRange.to)
                .subtract(1, 'hour')
                .valueOf(),
        };
        const nodeAriaLabel = intl.formatMessage({
            id: 'xpack.infra.node.ariaLabel',
            defaultMessage: '{nodeName}, click to open menu',
        }, { nodeName: node.name });
        return (react_1.default.createElement(node_context_menu_1.NodeContextMenu, { node: node, nodeType: nodeType, isPopoverOpen: isPopoverOpen, closePopover: this.closePopover, options: options, timeRange: newTimerange, popoverPosition: "upCenter" },
            react_1.default.createElement(eui_1.EuiToolTip, { position: "top", content: `${node.name} | ${value}` },
                react_1.default.createElement(NodeContainer, { "data-test-subj": "nodeContainer", style: { width: squareSize || 0, height: squareSize || 0 }, onClick: this.togglePopover },
                    react_1.default.createElement(SquareOuter, { color: color },
                        react_1.default.createElement(SquareInner, { color: color }, valueMode ? (react_1.default.createElement(ValueInner, { "aria-label": nodeAriaLabel },
                            react_1.default.createElement(Label, { color: color }, node.name),
                            react_1.default.createElement(Value, { color: color }, value))) : (ellipsisMode && (react_1.default.createElement(ValueInner, { "aria-label": nodeAriaLabel },
                            react_1.default.createElement(Label, { color: color }, "..."))))))))));
    }
});
const NodeContainer = eui_styled_components_1.default.div `
  position: relative;
`;
const SquareOuter = eui_styled_components_1.default('div') `
  position: absolute;
  top: 4px;
  left: 4px;
  bottom: 4px;
  right: 4px;
  background-color: ${props => polished_1.darken(0.1, props.color)};
  border-radius: 3px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
`;
const SquareInner = eui_styled_components_1.default('div') `
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 2px;
  left: 0;
  border-radius: 3px;
  background-color: ${props => props.color};
`;
const ValueInner = eui_styled_components_1.default.button `
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  line-height: 1.2em;
  align-items: center;
  align-content: center;
  padding: 1em;
  overflow: hidden;
  flex-wrap: wrap;
  width: 100%;
  border: none;
  &:focus {
    outline: none !important;
    border: ${params => params.theme.eui.euiFocusRingSize} solid
      ${params => params.theme.eui.euiFocusRingColor};
    box-shadow: none;
  }
`;
const Value = eui_styled_components_1.default('div') `
  font-weight: bold;
  font-size: 0.9em;
  text-align: center;
  width: 100%;
  flex: 1 0 auto;
  line-height: 1.2em;
  color: ${props => polished_1.readableColor(props.color)};
`;
const Label = eui_styled_components_1.default('div') `
  text-overflow: ellipsis;
  font-size: 0.7em;
  margin-bottom: 0.7em;
  text-align: center;
  width: 100%;
  flex: 1 0 auto;
  white-space: nowrap;
  overflow: hidden;
  color: ${props => polished_1.readableColor(props.color)};
`;
