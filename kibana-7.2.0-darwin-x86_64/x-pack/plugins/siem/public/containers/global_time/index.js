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
const store_1 = require("../../store");
const actions_1 = require("../../store/actions");
class GlobalTimeComponent extends react_1.default.PureComponent {
    componentDidMount() {
        this.props.deleteAllQuery({ id: 'global' });
    }
    render() {
        const { children, from, to, setGlobalQuery } = this.props;
        return (react_1.default.createElement(react_1.default.Fragment, null, children({
            from,
            to,
            setQuery: ({ id, loading, refetch }) => setGlobalQuery({ inputId: 'global', id, loading, refetch }),
        })));
    }
}
const mapStateToProps = (state) => {
    const timerange = store_1.inputsSelectors.globalTimeRangeSelector(state);
    return {
        from: timerange.from,
        to: timerange.to,
    };
};
exports.GlobalTime = react_redux_1.connect(mapStateToProps, {
    deleteAllQuery: actions_1.inputsActions.deleteAllQuery,
    setGlobalQuery: actions_1.inputsActions.setQuery,
})(GlobalTimeComponent);
