"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_redux_1 = require("react-redux");
const actions_1 = require("../../store/actions");
class TimelineRefetchComponent extends react_1.default.PureComponent {
    componentDidUpdate(prevProps) {
        const { loading, id, refetch } = this.props;
        if (prevProps.loading !== loading) {
            this.props.setTimelineQuery({ inputId: 'timeline', id, loading, refetch });
        }
    }
    render() {
        return react_1.default.createElement(react_1.default.Fragment, null, this.props.children);
    }
}
exports.TimelineRefetch = react_redux_1.connect(null, {
    setTimelineQuery: actions_1.inputsActions.setQuery,
})(TimelineRefetchComponent);
