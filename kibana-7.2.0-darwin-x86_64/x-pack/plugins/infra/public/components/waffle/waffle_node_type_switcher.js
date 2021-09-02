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
const react_2 = tslib_1.__importDefault(require("react"));
const types_1 = require("../../graphql/types");
class WaffleNodeTypeSwitcherClass extends react_2.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleClick = (nodeType) => {
            this.props.changeNodeType(nodeType);
            this.props.changeGroupBy([]);
            this.props.changeMetric({ type: types_1.InfraSnapshotMetricType.cpu });
        };
    }
    render() {
        const { intl } = this.props;
        const nodeOptions = [
            {
                id: types_1.InfraNodeType.host,
                label: intl.formatMessage({
                    id: 'xpack.infra.waffle.nodeTypeSwitcher.hostsLabel',
                    defaultMessage: 'Hosts',
                }),
            },
            {
                id: types_1.InfraNodeType.pod,
                label: 'Kubernetes',
            },
            {
                id: types_1.InfraNodeType.container,
                label: 'Docker',
            },
        ];
        return (react_2.default.createElement(eui_1.EuiButtonGroup, { legend: "Node type selection", color: "primary", options: nodeOptions, idSelected: this.props.nodeType, onChange: this.handleClick, buttonSize: "m" }));
    }
}
exports.WaffleNodeTypeSwitcherClass = WaffleNodeTypeSwitcherClass;
exports.WaffleNodeTypeSwitcher = react_1.injectI18n(WaffleNodeTypeSwitcherClass);
