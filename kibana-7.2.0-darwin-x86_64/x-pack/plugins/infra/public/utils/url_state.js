"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const throttle_1 = tslib_1.__importDefault(require("lodash/fp/throttle"));
const react_1 = tslib_1.__importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const rison_node_1 = require("rison-node");
const query_string_1 = require("ui/utils/query_string");
class UrlStateContainerLifecycle extends react_1.default.Component {
    constructor() {
        super(...arguments);
        // eslint-disable-next-line @typescript-eslint/member-ordering this is really a method despite what eslint thinks
        this.replaceStateInLocation = throttle_1.default(1000, (urlState) => {
            const { history, location, urlStateKey } = this.props;
            const newLocation = replaceQueryStringInLocation(location, exports.replaceStateKeyInQueryString(urlStateKey, urlState)(exports.getQueryStringFromLocation(location)));
            if (newLocation !== location) {
                history.replace(newLocation);
            }
        });
        this.handleInitialize = (location) => {
            const { onInitialize, mapToUrlState, urlStateKey } = this.props;
            if (!onInitialize || !mapToUrlState) {
                return;
            }
            const newUrlStateString = exports.getParamFromQueryString(exports.getQueryStringFromLocation(location), urlStateKey);
            const newUrlState = mapToUrlState(exports.decodeRisonUrlState(newUrlStateString));
            onInitialize(newUrlState);
        };
        this.handleLocationChange = (prevLocation, newLocation) => {
            const { onChange, mapToUrlState, urlStateKey } = this.props;
            if (!onChange || !mapToUrlState) {
                return;
            }
            const previousUrlStateString = exports.getParamFromQueryString(exports.getQueryStringFromLocation(prevLocation), urlStateKey);
            const newUrlStateString = exports.getParamFromQueryString(exports.getQueryStringFromLocation(newLocation), urlStateKey);
            if (previousUrlStateString !== newUrlStateString) {
                const previousUrlState = mapToUrlState(exports.decodeRisonUrlState(previousUrlStateString));
                const newUrlState = mapToUrlState(exports.decodeRisonUrlState(newUrlStateString));
                if (typeof newUrlState !== 'undefined') {
                    onChange(newUrlState, previousUrlState);
                }
            }
        };
    }
    render() {
        return null;
    }
    componentDidUpdate({ location: prevLocation, urlState: prevUrlState, }) {
        const { history, location, urlState } = this.props;
        if (urlState !== prevUrlState) {
            this.replaceStateInLocation(urlState);
        }
        if (history.action === 'POP' && location !== prevLocation) {
            this.handleLocationChange(prevLocation, location);
        }
    }
    componentDidMount() {
        const { location } = this.props;
        this.handleInitialize(location);
    }
}
exports.UrlStateContainer = (props) => (react_1.default.createElement(react_router_dom_1.Route, null, ({ history, location }) => (react_1.default.createElement(UrlStateContainerLifecycle, Object.assign({ history: history, location: location }, props)))));
exports.decodeRisonUrlState = (value) => {
    try {
        return value ? rison_node_1.decode(value) : undefined;
    }
    catch (error) {
        if (error instanceof Error && error.message.startsWith('rison decoder error')) {
            return {};
        }
        throw error;
    }
};
const encodeRisonUrlState = (state) => rison_node_1.encode(state);
exports.getQueryStringFromLocation = (location) => location.search.substring(1);
exports.getParamFromQueryString = (queryString, key) => {
    const queryParam = query_string_1.QueryString.decode(queryString)[key];
    return Array.isArray(queryParam) ? queryParam[0] : queryParam;
};
exports.replaceStateKeyInQueryString = (stateKey, urlState) => (queryString) => {
    const previousQueryValues = query_string_1.QueryString.decode(queryString);
    const encodedUrlState = typeof urlState !== 'undefined' ? encodeRisonUrlState(urlState) : undefined;
    return query_string_1.QueryString.encode({
        ...previousQueryValues,
        [stateKey]: encodedUrlState,
    });
};
const replaceQueryStringInLocation = (location, queryString) => {
    if (queryString === exports.getQueryStringFromLocation(location)) {
        return location;
    }
    else {
        return {
            ...location,
            search: `?${queryString}`,
        };
    }
};
