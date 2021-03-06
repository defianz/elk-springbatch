"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const react_1 = tslib_1.__importDefault(require("react"));
const eui_styled_components_1 = tslib_1.__importDefault(require("../../../../../common/eui_styled_components"));
const nodes_to_wafflemap_1 = require("../../containers/waffle/nodes_to_wafflemap");
const type_guards_1 = require("../../containers/waffle/type_guards");
const auto_sizer_1 = require("../auto_sizer");
const group_of_groups_1 = require("./group_of_groups");
const group_of_nodes_1 = require("./group_of_nodes");
const legend_1 = require("./legend");
const apply_wafflemap_layout_1 = require("./lib/apply_wafflemap_layout");
exports.Map = ({ nodes, options, timeRange, onFilter, formatter, bounds, nodeType, dataBounds, }) => {
    const map = nodes_to_wafflemap_1.nodesToWaffleMap(nodes);
    return (react_1.default.createElement(auto_sizer_1.AutoSizer, { content: true }, ({ measureRef, content: { width = 0, height = 0 } }) => {
        const groupsWithLayout = apply_wafflemap_layout_1.applyWaffleMapLayout(map, width, height);
        return (react_1.default.createElement(WaffleMapOuterContainer, { innerRef: (el) => measureRef(el), "data-test-subj": "waffleMap" },
            react_1.default.createElement(WaffleMapInnerContainer, null, groupsWithLayout.map(group => {
                if (type_guards_1.isWaffleMapGroupWithGroups(group)) {
                    return (react_1.default.createElement(group_of_groups_1.GroupOfGroups, { onDrilldown: onFilter, key: group.id, options: options, group: group, formatter: formatter, bounds: bounds, nodeType: nodeType, timeRange: timeRange }));
                }
                if (type_guards_1.isWaffleMapGroupWithNodes(group)) {
                    return (react_1.default.createElement(group_of_nodes_1.GroupOfNodes, { key: group.id, options: options, group: group, onDrilldown: onFilter, formatter: formatter, isChild: false, bounds: bounds, nodeType: nodeType, timeRange: timeRange }));
                }
            })),
            react_1.default.createElement(legend_1.Legend, { formatter: formatter, bounds: bounds, dataBounds: dataBounds, legend: options.legend })));
    }));
};
const WaffleMapOuterContainer = eui_styled_components_1.default.div `
  flex: 1 0 0%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
`;
const WaffleMapInnerContainer = eui_styled_components_1.default.div `
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  padding: 10px;
`;
