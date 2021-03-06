"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const react_1 = tslib_1.__importDefault(require("react"));
const types_1 = require("../graphql/types");
const lib_1 = require("../lib/lib");
const initialState = {
    options: {
        timerange: {
            interval: '1m',
            to: moment_1.default.utc().valueOf(),
            from: moment_1.default
                .utc()
                .subtract(1, 'h')
                .valueOf(),
        },
        wafflemap: {
            formatter: lib_1.InfraFormatterType.percent,
            formatTemplate: '{{value}}',
            metric: { type: types_1.InfraSnapshotMetricType.cpu },
            groupBy: [],
            legend: {
                type: lib_1.InfraWaffleMapLegendMode.gradient,
                rules: [
                    {
                        value: 0,
                        color: '#D3DAE6',
                    },
                    {
                        value: 1,
                        color: '#3185FC',
                    },
                ],
            },
        },
    },
};
exports.withOptions = (WrappedComponent) => (react_1.default.createElement(WithOptions, null, args => react_1.default.createElement(WrappedComponent, Object.assign({}, args))));
class WithOptions extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.state = initialState;
    }
    render() {
        return this.props.children(this.state.options);
    }
}
exports.WithOptions = WithOptions;
