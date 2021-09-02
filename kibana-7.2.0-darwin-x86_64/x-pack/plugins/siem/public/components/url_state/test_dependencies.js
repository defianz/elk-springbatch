"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("../../store");
const constants_1 = require("./constants");
const pop = 'POP';
exports.filterQuery = {
    expression: 'host.name:"siem-es"',
    kind: 'kuery',
};
exports.serializedFilterQuery = {
    kuery: exports.filterQuery,
    serializedQuery: JSON.stringify({
        bool: { should: [{ match_phrase: { 'host.name': 'siem-es' } }], minimum_should_match: 1 },
    }),
};
const defaultLocation = {
    hash: '',
    pathname: '/network',
    search: '',
    state: '',
};
exports.mockHistory = {
    action: pop,
    block: jest.fn(),
    createHref: jest.fn(),
    go: jest.fn(),
    goBack: jest.fn(),
    goForward: jest.fn(),
    length: 2,
    listen: jest.fn(),
    location: defaultLocation,
    push: jest.fn(),
    replace: jest.fn(),
};
exports.defaultProps = {
    match: {
        isExact: true,
        params: '',
        path: '',
        url: '',
    },
    indexPattern: {
        fields: [
            {
                aggregatable: true,
                name: '@timestamp',
                searchable: true,
                type: 'date',
            },
        ],
        title: 'filebeat-*,packetbeat-*',
    },
    urlState: {
        [constants_1.CONSTANTS.timerange]: {
            global: {
                [constants_1.CONSTANTS.timerange]: {
                    from: 1558048243696,
                    fromStr: 'now-24h',
                    kind: 'relative',
                    to: 1558134643697,
                    toStr: 'now',
                },
                linkTo: ['timeline'],
            },
            timeline: {
                [constants_1.CONSTANTS.timerange]: {
                    from: 1558048243696,
                    fromStr: 'now-24h',
                    kind: 'relative',
                    to: 1558134643697,
                    toStr: 'now',
                },
                linkTo: ['global'],
            },
        },
        [constants_1.CONSTANTS.kqlQuery]: {
            [constants_1.CONSTANTS.hostsDetails]: {
                filterQuery: null,
                queryLocation: constants_1.CONSTANTS.hostsDetails,
                type: store_1.hostsModel.HostsType.details,
            },
            [constants_1.CONSTANTS.hostsPage]: {
                filterQuery: null,
                queryLocation: constants_1.CONSTANTS.hostsPage,
                type: store_1.hostsModel.HostsType.page,
            },
            [constants_1.CONSTANTS.networkDetails]: {
                filterQuery: null,
                queryLocation: constants_1.CONSTANTS.networkDetails,
                type: store_1.networkModel.NetworkType.details,
            },
            [constants_1.CONSTANTS.networkPage]: {
                filterQuery: null,
                queryLocation: constants_1.CONSTANTS.networkPage,
                type: store_1.networkModel.NetworkType.page,
            },
        },
    },
    setAbsoluteTimerange: jest.fn(),
    setHostsKql: jest.fn(),
    setNetworkKql: jest.fn(),
    setRelativeTimerange: jest.fn(),
    toggleTimelineLinkTo: jest.fn(),
    history: {
        ...exports.mockHistory,
        location: defaultLocation,
    },
    location: defaultLocation,
};
exports.getMockProps = (location = defaultLocation, kqlQueryKey = constants_1.CONSTANTS.networkPage, kqlQueryValue) => ({
    ...exports.defaultProps,
    urlState: {
        ...exports.defaultProps.urlState,
        [constants_1.CONSTANTS.kqlQuery]: {
            ...exports.defaultProps.urlState[constants_1.CONSTANTS.kqlQuery],
            [kqlQueryKey]: {
                ...exports.defaultProps.urlState[constants_1.CONSTANTS.kqlQuery][kqlQueryKey],
                filterQuery: kqlQueryValue,
            },
        },
    },
    history: {
        ...exports.mockHistory,
        location,
    },
    location,
});
exports.getMockPropsObj = ({ page, examplePath, namespaceLower, type }) => ({
    noSearch: {
        undefinedQuery: exports.getMockProps({
            hash: '',
            pathname: examplePath,
            search: '?_g=()',
            state: '',
        }, page, null),
        definedQuery: exports.getMockProps({
            hash: '',
            pathname: examplePath,
            search: '?_g=()',
            state: '',
        }, page, exports.filterQuery),
    },
    relativeTimeSearch: {
        undefinedQuery: exports.getMockProps({
            hash: '',
            pathname: examplePath,
            search: `?_g=()&kqlQuery=(filterQuery:(expression:'host.name:%22siem-es%22',kind:kuery),queryLocation:${page},type:${type})&timerange=(global:(linkTo:!(),timerange:(from:1558591200000,fromStr:now-1d%2Fd,kind:relative,to:1558677599999,toStr:now-1d%2Fd)),timeline:(linkTo:!(),timerange:(from:1558732849370,fromStr:now-15m,kind:relative,to:1558733749370,toStr:now)))`,
            state: '',
        }, page, null),
        definedQuery: exports.getMockProps({
            hash: '',
            pathname: examplePath,
            search: `?_g=()&kqlQuery=(filterQuery:(expression:'host.name:%22siem-es%22',kind:kuery),queryLocation:${page},type:${type})&timerange=(global:(linkTo:!(),timerange:(from:1558591200000,fromStr:now-1d%2Fd,kind:relative,to:1558677599999,toStr:now-1d%2Fd)),timeline:(linkTo:!(),timerange:(from:1558732849370,fromStr:now-15m,kind:relative,to:1558733749370,toStr:now)))`,
            state: '',
        }, page, exports.filterQuery),
    },
    absoluteTimeSearch: {
        undefinedQuery: exports.getMockProps({
            hash: '',
            pathname: examplePath,
            search: '?_g=()&timerange=(global:(linkTo:!(timeline),timerange:(from:1556736012685,kind:absolute,to:1556822416082)),timeline:(linkTo:!(global),timerange:(from:1556736012685,kind:absolute,to:1556822416082)))',
            state: '',
        }, page, null),
        definedQuery: exports.getMockProps({
            hash: '',
            pathname: examplePath,
            search: '?_g=()&timerange=(global:(linkTo:!(timeline),timerange:(from:1556736012685,kind:absolute,to:1556822416082)),timeline:(linkTo:!(global),timerange:(from:1556736012685,kind:absolute,to:1556822416082)))',
            state: '',
        }, page, exports.filterQuery),
    },
    oppositeQueryLocationSearch: {
        undefinedQuery: exports.getMockProps({
            hash: '',
            pathname: examplePath,
            search: `?_g=()&kqlQuery=(filterQuery:(expression:'host.name:%22siem-es%22',kind:kuery),queryLocation:${namespaceLower === 'hosts' ? 'network' : 'hosts'}.page,type:${type})&timerange=(global:(linkTo:!(),timerange:(from:1558591200000,fromStr:now-1d%2Fd,kind:relative,to:1558677599999,toStr:now-1d%2Fd)),timeline:(linkTo:!(),timerange:(from:1558732849370,fromStr:now-15m,kind:relative,to:1558733749370,toStr:now)))`,
            state: '',
        }, page, null),
    },
});
// silly that this needs to be an array and not an object
// https://jestjs.io/docs/en/api#testeachtable-name-fn-timeout
exports.testCases = [
    [
        /* page */ constants_1.CONSTANTS.networkPage,
        /* namespaceLower */ 'network',
        /* namespaceUpper */ 'Network',
        /* examplePath */ '/network',
        /* type */ store_1.networkModel.NetworkType.page,
    ],
    [
        /* page */ constants_1.CONSTANTS.hostsPage,
        /* namespaceLower */ 'hosts',
        /* namespaceUpper */ 'Hosts',
        /* examplePath */ '/hosts',
        /* type */ store_1.hostsModel.HostsType.page,
    ],
    [
        /* page */ constants_1.CONSTANTS.hostsDetails,
        /* namespaceLower */ 'hosts',
        /* namespaceUpper */ 'Hosts',
        /* examplePath */ '/hosts/siem-es',
        /* type */ store_1.hostsModel.HostsType.details,
    ],
    [
        /* page */ constants_1.CONSTANTS.networkDetails,
        /* namespaceLower */ 'network',
        /* namespaceUpper */ 'Network',
        /* examplePath */ '/network/ip/100.90.80',
        /* type */ store_1.networkModel.NetworkType.details,
    ],
];
