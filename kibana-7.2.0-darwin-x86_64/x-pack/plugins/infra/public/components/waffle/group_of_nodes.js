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
const node_1 = require("./node");
exports.GroupOfNodes = ({ group, options, formatter, onDrilldown, isChild = false, bounds, nodeType, timeRange, }) => {
    const width = group.width > 200 ? group.width : 200;
    return (react_1.default.createElement(GroupOfNodesContainer, { style: { width } },
        react_1.default.createElement(group_name_1.GroupName, { group: group, onDrilldown: onDrilldown, isChild: isChild, options: options }),
        react_1.default.createElement(Nodes, null, group.nodes.map(node => (react_1.default.createElement(node_1.Node, { key: node.pathId, options: options, squareSize: group.squareSize, node: node, formatter: formatter, bounds: bounds, nodeType: nodeType, timeRange: timeRange }))))));
};
const GroupOfNodesContainer = eui_styled_components_1.default.div `
  margin: 0 10px;
`;
const Nodes = eui_styled_components_1.default.div `
  display: flex;
  background-color: rgba(0, 0, 0, 0.05);
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px 10px 10px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.eui.euiBorderColor};
  box-shadow: 0 1px 7px rgba(0, 0, 0, 0.1);
`;
