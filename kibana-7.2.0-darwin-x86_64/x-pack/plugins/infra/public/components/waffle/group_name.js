"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const eui_1 = require("@elastic/eui");
const react_1 = tslib_1.__importDefault(require("react"));
const eui_styled_components_1 = tslib_1.__importDefault(require("../../../../../common/eui_styled_components"));
class GroupName extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleClick = (event) => {
            event.preventDefault();
            const { groupBy } = this.props.options;
            // When groupBy is empty that means there is nothing todo so let's just do nothing.
            if (groupBy.length === 0) {
                return;
            }
            const currentPath = this.props.isChild && groupBy.length > 1 ? groupBy[1] : groupBy[0];
            this.props.onDrilldown(`${currentPath.field}: "${this.props.group.name}"`);
        };
    }
    render() {
        const { group, isChild } = this.props;
        const linkStyle = {
            fontSize: isChild ? '0.85em' : '1em',
        };
        return (react_1.default.createElement(GroupNameContainer, null,
            react_1.default.createElement(Inner, { isChild: isChild },
                react_1.default.createElement(Name, null,
                    react_1.default.createElement(eui_1.EuiToolTip, { position: "top", content: group.name },
                        react_1.default.createElement(eui_1.EuiLink, { style: linkStyle, onClickCapture: this.handleClick }, group.name))),
                react_1.default.createElement(Count, null, group.count))));
    }
}
exports.GroupName = GroupName;
const GroupNameContainer = eui_styled_components_1.default.div `
  position: relative;
  text-align: center
  font-size: 16px;
  margin-bottom: 5px;
  top: 20px;
  display: flex;
  justify-content: center;
  padding: 0 10px;
`;
const Inner = eui_styled_components_1.default('div') `
  border: 1px solid ${props => props.theme.eui.euiBorderColor};
  background-color: ${props => props.isChild ? props.theme.eui.euiColorLightestShade : props.theme.eui.euiColorEmptyShade};
  border-radius: 4px;
  box-shadow: 0px 2px 0px 0px ${props => props.theme.eui.euiBorderColor};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;
const Name = eui_styled_components_1.default.div `
  flex: 1 1 auto;
  padding: 6px 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const Count = eui_styled_components_1.default.div `
  flex: 0 0 auto;
  border-left: 1px solid ${props => props.theme.eui.euiBorderColor};
  padding: 6px 10px;
  font-size: 0.85em;
  font-weight: normal;
`;
