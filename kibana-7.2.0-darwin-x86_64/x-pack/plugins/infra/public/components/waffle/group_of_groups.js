"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const eui_styled_components_1 = tslib_1.__importDefault(require("../../../../../common/eui_styled_components"));
const group_name_1 = require("./group_name");
const group_of_nodes_1 = require("./group_of_nodes");
exports.GroupOfGroups = props => {
    return (react_1.default.createElement(GroupOfGroupsContainer, null,
        react_1.default.createElement(group_name_1.GroupName, { group: props.group, onDrilldown: props.onDrilldown, options: props.options }),
        react_1.default.createElement(Groups, null, props.group.groups.map(group => (react_1.default.createElement(group_of_nodes_1.GroupOfNodes, { isChild: true, key: group.id, onDrilldown: props.onDrilldown, options: props.options, group: group, formatter: props.formatter, bounds: props.bounds, nodeType: props.nodeType, timeRange: props.timeRange }))))));
};
const GroupOfGroupsContainer = eui_styled_components_1.default.div `
  margin: 0 10px;
`;
const Groups = eui_styled_components_1.default.div `
  display: flex;
  background-color: rgba(0, 0, 0, 0.05);
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px 10px 10px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.eui.euiBorderColor};
  box-shadow: 0 1px 7px rgba(0, 0, 0, 0.1);
`;
