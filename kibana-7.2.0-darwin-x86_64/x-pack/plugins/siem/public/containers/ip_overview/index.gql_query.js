"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
exports.ipOverviewQuery = graphql_tag_1.default `
  query GetIpOverviewQuery(
    $sourceId: ID!
    $filterQuery: String
    $ip: String!
    $defaultIndex: [String!]!
  ) {
    source(id: $sourceId) {
      id
      IpOverview(filterQuery: $filterQuery, ip: $ip, defaultIndex: $defaultIndex) {
        source {
          firstSeen
          lastSeen
          autonomousSystem {
            as_org
            asn
            ip
          }
          geo {
            continent_name
            city_name
            country_iso_code
            country_name
            location {
              lat
              lon
            }
            region_iso_code
            region_name
          }
        }
        destination {
          firstSeen
          lastSeen
          autonomousSystem {
            as_org
            asn
            ip
          }
          geo {
            continent_name
            city_name
            country_iso_code
            country_name
            location {
              lat
              lon
            }
            region_iso_code
            region_name
          }
        }
        host {
          architecture
          id
          ip
          mac
          name
          os {
            family
            name
            platform
            version
          }
          type
        }
      }
    }
  }
`;
