"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fp_1 = require("lodash/fp");
const react_1 = tslib_1.__importDefault(require("react"));
const redux_1 = require("redux");
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const actions_1 = require("../../store/actions");
const store_1 = require("../../store");
const keury_1 = require("../../lib/keury");
const constants_1 = require("./constants");
const helpers_1 = require("./helpers");
class UrlStateContainerLifecycle extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.replaceStateInLocation = fp_1.throttle(1000, (urlState, urlStateKey) => {
            const { history, location } = this.props;
            const newLocation = helpers_1.replaceQueryStringInLocation(location, helpers_1.replaceStateKeyInQueryString(urlStateKey, urlState)(helpers_1.getQueryStringFromLocation(location)));
            if (newLocation !== location) {
                history.replace(newLocation);
            }
        });
        this.setInitialStateFromUrl = (urlKey, newUrlStateString, location) => {
            if (urlKey === constants_1.CONSTANTS.timerange) {
                const timerangeStateData = helpers_1.decodeRisonUrlState(newUrlStateString);
                const globalId = 'global';
                const globalLinkTo = { linkTo: fp_1.get('global.linkTo', timerangeStateData) };
                const globalType = fp_1.get('global.timerange.kind', timerangeStateData);
                if (globalType) {
                    if (globalLinkTo.linkTo.length === 0) {
                        this.props.toggleTimelineLinkTo({ linkToId: 'global' });
                    }
                    if (globalType === 'absolute') {
                        const absoluteRange = fp_1.get('global.timerange', timerangeStateData);
                        this.props.setAbsoluteTimerange({
                            ...absoluteRange,
                            id: globalId,
                        });
                    }
                    if (globalType === 'relative') {
                        const relativeRange = fp_1.get('global.timerange', timerangeStateData);
                        this.props.setRelativeTimerange({
                            ...relativeRange,
                            id: globalId,
                        });
                    }
                }
                const timelineId = 'timeline';
                const timelineLinkTo = { linkTo: fp_1.get('timeline.linkTo', timerangeStateData) };
                const timelineType = fp_1.get('timeline.timerange.kind', timerangeStateData);
                if (timelineType) {
                    if (timelineLinkTo.linkTo.length === 0) {
                        this.props.toggleTimelineLinkTo({ linkToId: 'timeline' });
                    }
                    if (timelineType === 'absolute') {
                        const absoluteRange = fp_1.get('timeline.timerange', timerangeStateData);
                        this.props.setAbsoluteTimerange({
                            ...absoluteRange,
                            id: timelineId,
                        });
                    }
                    if (timelineType === 'relative') {
                        const relativeRange = fp_1.get('timeline.timerange', timerangeStateData);
                        this.props.setRelativeTimerange({
                            ...relativeRange,
                            id: timelineId,
                        });
                    }
                }
            }
            if (urlKey === constants_1.CONSTANTS.kqlQuery) {
                const kqlQueryStateData = helpers_1.decodeRisonUrlState(newUrlStateString);
                if (helpers_1.isKqlForRoute(location.pathname, kqlQueryStateData)) {
                    const filterQuery = {
                        kuery: kqlQueryStateData.filterQuery,
                        serializedQuery: keury_1.convertKueryToElasticSearchQuery(kqlQueryStateData.filterQuery ? kqlQueryStateData.filterQuery.expression : '', this.props.indexPattern),
                    };
                    if (kqlQueryStateData.queryLocation === constants_1.CONSTANTS.hostsPage ||
                        kqlQueryStateData.queryLocation === constants_1.CONSTANTS.hostsDetails) {
                        const hostsType = constants_1.LOCATION_MAPPED_TO_MODEL[kqlQueryStateData.queryLocation];
                        this.props.setHostsKql({
                            filterQuery,
                            hostsType,
                        });
                    }
                    if (kqlQueryStateData.queryLocation === constants_1.CONSTANTS.networkPage ||
                        kqlQueryStateData.queryLocation === constants_1.CONSTANTS.networkDetails) {
                        const networkType = constants_1.LOCATION_MAPPED_TO_MODEL[kqlQueryStateData.queryLocation];
                        this.props.setNetworkKql({
                            filterQuery,
                            networkType,
                        });
                    }
                }
            }
        };
        this.handleInitialize = (location) => {
            constants_1.URL_STATE_KEYS.forEach((urlKey) => {
                const newUrlStateString = helpers_1.getParamFromQueryString(helpers_1.getQueryStringFromLocation(location), urlKey);
                if (newUrlStateString) {
                    this.setInitialStateFromUrl(urlKey, newUrlStateString, location);
                }
                else {
                    if (urlKey === constants_1.CONSTANTS.timerange) {
                        this.replaceStateInLocation(this.props.urlState[urlKey], urlKey);
                    }
                    if (urlKey === constants_1.CONSTANTS.kqlQuery) {
                        const currentLocation = helpers_1.getCurrentLocation(location.pathname);
                        if (currentLocation !== null) {
                            this.replaceStateInLocation(this.props.urlState[constants_1.CONSTANTS.kqlQuery][currentLocation], urlKey);
                        }
                    }
                }
            });
        };
    }
    render() {
        return null;
    }
    componentDidUpdate({ location: prevLocation, urlState: prevUrlState, }) {
        const { location, urlState } = this.props;
        if (JSON.stringify(urlState) !== JSON.stringify(prevUrlState)) {
            constants_1.URL_STATE_KEYS.forEach((urlKey) => {
                if (urlState[urlKey] &&
                    JSON.stringify(urlState[urlKey]) !== JSON.stringify(prevUrlState[urlKey])) {
                    if (urlKey === constants_1.CONSTANTS.kqlQuery) {
                        constants_1.LOCATION_KEYS.forEach((queryLocation) => {
                            if (!!urlState[constants_1.CONSTANTS.kqlQuery][queryLocation] &&
                                JSON.stringify(urlState[constants_1.CONSTANTS.kqlQuery][queryLocation]) !==
                                    JSON.stringify(prevUrlState[constants_1.CONSTANTS.kqlQuery][queryLocation])) {
                                this.replaceStateInLocation(urlState[constants_1.CONSTANTS.kqlQuery][queryLocation], constants_1.CONSTANTS.kqlQuery);
                            }
                        });
                    }
                    else {
                        this.replaceStateInLocation(urlState[urlKey], urlKey);
                    }
                }
            });
        }
        else if (location.pathname !== prevLocation.pathname) {
            this.handleInitialize(location);
        }
    }
    componentWillMount() {
        const { location } = this.props;
        this.handleInitialize(location);
    }
}
exports.UrlStateContainerLifecycle = UrlStateContainerLifecycle;
const makeMapStateToProps = () => {
    const getInputsSelector = store_1.inputsSelectors.inputsSelector();
    const getHostsFilterQueryAsKuery = store_1.hostsSelectors.hostsFilterQueryAsKuery();
    const getNetworkFilterQueryAsKuery = store_1.networkSelectors.networkFilterQueryAsKuery();
    const mapStateToProps = (state) => {
        const inputState = getInputsSelector(state);
        const { linkTo: globalLinkTo, timerange: globalTimerange } = inputState.global;
        const { linkTo: timelineLinkTo, timerange: timelineTimerange } = inputState.timeline;
        const kqlQueryInitialState = {
            [constants_1.CONSTANTS.hostsDetails]: {
                filterQuery: getHostsFilterQueryAsKuery(state, store_1.hostsModel.HostsType.details),
                queryLocation: constants_1.CONSTANTS.hostsDetails,
                type: store_1.hostsModel.HostsType.details,
            },
            [constants_1.CONSTANTS.hostsPage]: {
                filterQuery: getHostsFilterQueryAsKuery(state, store_1.hostsModel.HostsType.page),
                queryLocation: constants_1.CONSTANTS.hostsPage,
                type: store_1.hostsModel.HostsType.page,
            },
            [constants_1.CONSTANTS.networkDetails]: {
                filterQuery: getNetworkFilterQueryAsKuery(state, store_1.networkModel.NetworkType.details),
                queryLocation: constants_1.CONSTANTS.networkDetails,
                type: store_1.networkModel.NetworkType.details,
            },
            [constants_1.CONSTANTS.networkPage]: {
                filterQuery: getNetworkFilterQueryAsKuery(state, store_1.networkModel.NetworkType.page),
                queryLocation: constants_1.CONSTANTS.networkPage,
                type: store_1.networkModel.NetworkType.page,
            },
        };
        return {
            urlState: {
                [constants_1.CONSTANTS.timerange]: {
                    global: {
                        [constants_1.CONSTANTS.timerange]: globalTimerange,
                        linkTo: globalLinkTo,
                    },
                    timeline: {
                        [constants_1.CONSTANTS.timerange]: timelineTimerange,
                        linkTo: timelineLinkTo,
                    },
                },
                [constants_1.CONSTANTS.kqlQuery]: kqlQueryInitialState,
            },
        };
    };
    return mapStateToProps;
};
exports.UrlStateContainer = redux_1.compose(react_router_dom_1.withRouter, react_redux_1.connect(makeMapStateToProps, {
    setAbsoluteTimerange: actions_1.inputsActions.setAbsoluteRangeDatePicker,
    setHostsKql: actions_1.hostsActions.applyHostsFilterQuery,
    setNetworkKql: actions_1.networkActions.applyNetworkFilterQuery,
    setRelativeTimerange: actions_1.inputsActions.setRelativeRangeDatePicker,
    toggleTimelineLinkTo: actions_1.inputsActions.toggleTimelineLinkTo,
}))(UrlStateContainerLifecycle);
