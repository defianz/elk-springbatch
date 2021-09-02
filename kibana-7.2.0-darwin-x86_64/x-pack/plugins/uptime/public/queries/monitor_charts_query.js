"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
exports.monitorChartsQueryString = `
query MonitorCharts($dateRangeStart: String!, $dateRangeEnd: String!, $monitorId: String!, $location: String) {
  monitorChartsData: getMonitorChartsData(
    monitorId: $monitorId
    dateRangeStart: $dateRangeStart
    dateRangeEnd: $dateRangeEnd
    location: $location
  ) {
    durationArea {
      x
      yMin
      yMax
    }
    durationLine {
      x
      y
    }
    status {
      x
      up
      down
      total
    }
    statusMaxCount
    durationMaxValue
  }
}
`;
exports.monitorChartsQuery = graphql_tag_1.default `
  ${exports.monitorChartsQueryString}
`;
