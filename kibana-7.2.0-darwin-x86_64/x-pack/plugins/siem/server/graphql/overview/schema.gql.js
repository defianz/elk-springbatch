"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
exports.overviewSchema = graphql_tag_1.default `
  type OverviewNetworkData {
    auditbeatSocket: Float
    filebeatCisco: Float
    filebeatNetflow: Float
    filebeatPanw: Float
    filebeatSuricata: Float
    filebeatZeek: Float
    packetbeatDNS: Float
    packetbeatFlow: Float
    packetbeatTLS: Float
  }

  type OverviewHostData {
    auditbeatAuditd: Float
    auditbeatFIM: Float
    auditbeatLogin: Float
    auditbeatPackage: Float
    auditbeatProcess: Float
    auditbeatUser: Float
    filebeatSystemModule: Float
    winlogbeat: Float
  }

  extend type Source {
    OverviewNetwork(
      id: String
      timerange: TimerangeInput!
      filterQuery: String
      defaultIndex: [String!]!
    ): OverviewNetworkData
    OverviewHost(
      id: String
      timerange: TimerangeInput!
      filterQuery: String
      defaultIndex: [String!]!
    ): OverviewHostData
  }
`;
