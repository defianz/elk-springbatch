"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
exports.monitorListQueryString = `
  query MonitorList($dateRangeStart: String!, $dateRangeEnd: String!, $filters: String) {
    monitorStatus: getMonitors(
      dateRangeStart: $dateRangeStart
      dateRangeEnd: $dateRangeEnd
      filters: $filters
    ) {
      monitors {
        id {
          key
          url
        }
        ping {
          timestamp
          container {
            id
          }
          kubernetes {
            pod {
              uid
            }
          }
          monitor {
            duration {
              us
            }
            id
            ip
            name
            status
          }
          observer {
            geo {
              location
              name
            }
          }
          url {
            domain
            full
          }
        }
        upSeries {
          x
          y
        }
        downSeries {
          x
          y
        }
      }
    }
  }
`;
exports.monitorListQuery = graphql_tag_1.default `
  ${exports.monitorListQueryString}
`;
