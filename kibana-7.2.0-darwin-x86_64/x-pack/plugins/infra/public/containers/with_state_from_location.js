"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const omit_1 = tslib_1.__importDefault(require("lodash/fp/omit"));
const querystring_1 = require("querystring");
const react_1 = tslib_1.__importDefault(require("react"));
const react_router_1 = require("react-router");
// eslint-disable-next-line @typescript-eslint/camelcase
const rison_node_1 = require("rison-node");
exports.withStateFromLocation = ({ mapLocationToState, mapStateToLocation, }) => (WrappedComponent) => {
    var _b;
    const wrappedName = WrappedComponent.displayName || WrappedComponent.name;
    return react_router_1.withRouter((_b = class WithStateFromLocation extends react_1.default.PureComponent {
            constructor() {
                super(...arguments);
                this.pushStateInLocation = (state) => {
                    const { history, location } = this.props;
                    const newLocation = mapStateToLocation(state, this.props.location);
                    if (newLocation !== location) {
                        history.push(newLocation);
                    }
                };
                this.replaceStateInLocation = (state) => {
                    const { history, location } = this.props;
                    const newLocation = mapStateToLocation(state, this.props.location);
                    if (newLocation !== location) {
                        history.replace(newLocation);
                    }
                };
            }
            render() {
                const { location } = this.props;
                const otherProps = omit_1.default(['location', 'history', 'match', 'staticContext'], this.props);
                const stateFromLocation = mapLocationToState(location);
                return (
                // @ts-ignore
                react_1.default.createElement(WrappedComponent, Object.assign({}, otherProps, stateFromLocation, { pushStateInLocation: this.pushStateInLocation, replaceStateInLocation: this.replaceStateInLocation })));
            }
        },
        _b.displayName = `WithStateFromLocation(${wrappedName})`,
        _b));
};
const decodeRisonAppState = (queryValues) => {
    try {
        return queryValues && queryValues._a ? rison_node_1.decode_object(queryValues._a) : {};
    }
    catch (error) {
        if (error instanceof Error && error.message.startsWith('rison decoder error')) {
            return {};
        }
        throw error;
    }
};
const encodeRisonAppState = (state) => ({
    _a: rison_node_1.encode_object(state),
});
exports.mapRisonAppLocationToState = (mapState = (state) => state) => (location) => {
    const queryValues = querystring_1.parse(location.search.substring(1));
    const decodedState = decodeRisonAppState(queryValues);
    return mapState(decodedState);
};
exports.mapStateToRisonAppLocation = (mapState = (state) => state) => (state, location) => {
    const previousQueryValues = querystring_1.parse(location.search.substring(1));
    const previousState = decodeRisonAppState(previousQueryValues);
    const encodedState = encodeRisonAppState({
        ...previousState,
        ...mapState(state),
    });
    const newQueryValues = querystring_1.stringify({
        ...previousQueryValues,
        ...encodedState,
    });
    return {
        ...location,
        search: `?${newQueryValues}`,
    };
};
