"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const elasticsearch_fieldnames_1 = require("../../../../../common/elasticsearch_fieldnames");
const DiscoverLink_1 = require("./DiscoverLink");
function getDiscoverQuery(error, kuery) {
    const serviceName = error.service.name;
    const groupId = error.error.grouping_key;
    let query = `${elasticsearch_fieldnames_1.SERVICE_NAME}:"${serviceName}" AND ${elasticsearch_fieldnames_1.ERROR_GROUP_ID}:"${groupId}"`;
    if (kuery) {
        query += ` AND ${kuery}`;
    }
    return {
        _a: {
            interval: 'auto',
            query: {
                language: 'lucene',
                query
            },
            sort: { '@timestamp': 'desc' }
        }
    };
}
const DiscoverErrorLink = ({ error, kuery, children }) => {
    return (react_1.default.createElement(DiscoverLink_1.DiscoverLink, { query: getDiscoverQuery(error, kuery), children: children }));
};
exports.DiscoverErrorLink = DiscoverErrorLink;
