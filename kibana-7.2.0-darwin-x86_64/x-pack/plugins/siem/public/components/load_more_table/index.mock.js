"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const empty_value_1 = require("../empty_value");
exports.mockData = {
    Hosts: {
        totalCount: 4,
        edges: [
            {
                host: {
                    _id: 'cPsuhGcB0WOhS6qyTKC0',
                    name: 'elrond.elstc.co',
                    os: 'Ubuntu',
                    version: '18.04.1 LTS (Bionic Beaver)',
                    firstSeen: '2018-12-06T15:40:53.319Z',
                },
                cursor: {
                    value: '98966fa2013c396155c460d35c0902be',
                },
            },
            {
                host: {
                    _id: 'KwQDiWcB0WOhS6qyXmrW',
                    name: 'siem-kibana',
                    os: 'Debian GNU/Linux',
                    version: '9 (stretch)',
                    firstSeen: '2018-12-07T14:12:38.560Z',
                },
                cursor: {
                    value: 'aa7ca589f1b8220002f2fc61c64cfbf1',
                },
            },
        ],
        pageInfo: {
            endCursor: {
                value: 'aa7ca589f1b8220002f2fc61c64cfbf1',
            },
            hasNextPage: true,
        },
    },
};
exports.getHostsColumns = () => [
    {
        field: 'node.host.name',
        name: 'Host',
        truncateText: false,
        hideForMobile: false,
        render: (name) => empty_value_1.getOrEmptyTagFromValue(name),
    },
    {
        field: 'node.host.firstSeen',
        name: 'First seen',
        truncateText: false,
        hideForMobile: false,
        render: (firstSeen) => empty_value_1.getOrEmptyTagFromValue(firstSeen),
    },
    {
        field: 'node.host.os',
        name: 'OS',
        truncateText: false,
        hideForMobile: false,
        render: (os) => empty_value_1.getOrEmptyTagFromValue(os),
    },
    {
        field: 'node.host.version',
        name: 'Version',
        truncateText: false,
        hideForMobile: false,
        render: (version) => empty_value_1.getOrEmptyTagFromValue(version),
    },
];
exports.sortedHosts = exports.getHostsColumns().map(h => ({ ...h, sortable: true }));
exports.rowItems = [
    {
        text: '2 rows',
        numberOfRow: 2,
    },
    {
        text: '5 rows',
        numberOfRow: 5,
    },
    {
        text: '10 rows',
        numberOfRow: 10,
    },
    {
        text: '20 rows',
        numberOfRow: 20,
    },
    {
        text: '50 rows',
        numberOfRow: 50,
    },
];
