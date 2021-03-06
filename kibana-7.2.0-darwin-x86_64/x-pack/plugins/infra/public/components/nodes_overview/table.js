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
const lodash_1 = require("lodash");
const react_2 = tslib_1.__importDefault(require("react"));
const nodes_to_wafflemap_1 = require("../../containers/waffle/nodes_to_wafflemap");
const field_to_display_name_1 = require("../waffle/lib/field_to_display_name");
const node_context_menu_1 = require("../waffle/node_context_menu");
const initialState = {
    isPopoverOpen: [],
};
const getGroupPaths = (path) => {
    switch (path.length) {
        case 3:
            return path.slice(0, 2);
        case 2:
            return path.slice(0, 1);
        default:
            return [];
    }
};
exports.TableView = react_1.injectI18n(class extends react_2.default.PureComponent {
    constructor() {
        super(...arguments);
        this.state = initialState;
        this.openPopoverFor = (id) => () => {
            this.setState(prevState => ({ isPopoverOpen: [...prevState.isPopoverOpen, id] }));
        };
        this.closePopoverFor = (id) => () => {
            if (this.state.isPopoverOpen.includes(id)) {
                this.setState(prevState => {
                    return {
                        isPopoverOpen: prevState.isPopoverOpen.filter(subject => subject !== id),
                    };
                });
            }
        };
    }
    render() {
        const { nodes, options, formatter, intl, timeRange, nodeType } = this.props;
        const columns = [
            {
                field: 'name',
                name: intl.formatMessage({
                    id: 'xpack.infra.tableView.columnName.name',
                    defaultMessage: 'Name',
                }),
                sortable: true,
                truncateText: true,
                textOnly: true,
                render: (value, item) => (react_2.default.createElement(node_context_menu_1.NodeContextMenu, { node: item.node, nodeType: nodeType, closePopover: this.closePopoverFor(item.node.pathId), timeRange: timeRange, isPopoverOpen: this.state.isPopoverOpen.includes(item.node.pathId), options: options, popoverPosition: "rightCenter" },
                    react_2.default.createElement(eui_1.EuiButtonEmpty, { onClick: this.openPopoverFor(item.node.pathId) }, value))),
            },
            ...options.groupBy.map((grouping, index) => ({
                field: `group_${index}`,
                name: field_to_display_name_1.fieldToName((grouping && grouping.field) || '', intl),
                sortable: true,
                truncateText: true,
                textOnly: true,
                render: (value) => {
                    const handleClick = () => this.props.onFilter(`${grouping.field}:"${value}"`);
                    return (react_2.default.createElement(eui_1.EuiToolTip, { content: "Set Filter" },
                        react_2.default.createElement(eui_1.EuiButtonEmpty, { onClick: handleClick }, value)));
                },
            })),
            {
                field: 'value',
                name: intl.formatMessage({
                    id: 'xpack.infra.tableView.columnName.last1m',
                    defaultMessage: 'Last 1m',
                }),
                sortable: true,
                truncateText: true,
                dataType: 'number',
                render: (value) => react_2.default.createElement("span", null, formatter(value)),
            },
            {
                field: 'avg',
                name: intl.formatMessage({
                    id: 'xpack.infra.tableView.columnName.avg',
                    defaultMessage: 'Avg',
                }),
                sortable: true,
                truncateText: true,
                dataType: 'number',
                render: (value) => react_2.default.createElement("span", null, formatter(value)),
            },
            {
                field: 'max',
                name: intl.formatMessage({
                    id: 'xpack.infra.tableView.columnName.max',
                    defaultMessage: 'Max',
                }),
                sortable: true,
                truncateText: true,
                dataType: 'number',
                render: (value) => react_2.default.createElement("span", null, formatter(value)),
            },
        ];
        const items = nodes.map(node => {
            const name = lodash_1.last(node.path);
            return {
                name: (name && name.label) || 'unknown',
                ...getGroupPaths(node.path).reduce((acc, path, index) => ({
                    ...acc,
                    [`group_${index}`]: path.label,
                }), {}),
                value: node.metric.value,
                avg: node.metric.avg,
                max: node.metric.max,
                node: nodes_to_wafflemap_1.createWaffleMapNode(node),
            };
        });
        const initialSorting = {
            sort: {
                field: 'value',
                direction: 'desc',
            },
        };
        return (react_2.default.createElement(eui_1.EuiInMemoryTable, { pagination: true, sorting: initialSorting, items: items, columns: columns }));
    }
});
