"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
exports.errorListQueryString = `
query ErrorList($dateRangeStart: String!, $dateRangeEnd: String!, $filters: String) {
  errorList: getErrorsList(
    dateRangeStart: $dateRangeStart
    dateRangeEnd: $dateRangeEnd
    filters: $filters
  ) {
    count
    latestMessage
    location
    monitorId
    name
    statusCode
    timestamp
    type
  }
}
`;
exports.errorListQuery = graphql_tag_1.default `
  ${exports.errorListQueryString}
`;
