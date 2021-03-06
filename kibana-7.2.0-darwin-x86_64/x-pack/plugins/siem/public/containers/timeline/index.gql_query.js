"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
exports.timelineQuery = graphql_tag_1.default `
  query GetTimelineQuery(
    $sourceId: ID!
    $fieldRequested: [String!]!
    $pagination: PaginationInput!
    $sortField: SortField!
    $filterQuery: String
    $defaultIndex: [String!]!
  ) {
    source(id: $sourceId) {
      id
      Timeline(
        fieldRequested: $fieldRequested
        pagination: $pagination
        sortField: $sortField
        filterQuery: $filterQuery
        defaultIndex: $defaultIndex
      ) {
        totalCount
        pageInfo {
          endCursor {
            value
            tiebreaker
          }
          hasNextPage
        }
        edges {
          node {
            _id
            _index
            data {
              field
              value
            }
            ecs {
              _id
              _index
              timestamp
              message
              system {
                auth {
                  ssh {
                    signature
                    method
                  }
                }
                audit {
                  package {
                    arch
                    entity_id
                    name
                    size
                    summary
                    version
                  }
                }
              }
              event {
                action
                category
                created
                dataset
                duration
                end
                hash
                id
                kind
                module
                original
                outcome
                risk_score
                risk_score_norm
                severity
                start
                timezone
                type
              }
              auditd {
                result
                session
                data {
                  acct
                  terminal
                  op
                }
                summary {
                  actor {
                    primary
                    secondary
                  }
                  object {
                    primary
                    secondary
                    type
                  }
                  how
                  message_type
                  sequence
                }
              }
              file {
                path
                target_path
                extension
                type
                device
                inode
                uid
                owner
                gid
                group
                mode
                size
                mtime
                ctime
              }
              host {
                id
                name
                ip
              }
              source {
                bytes
                ip
                packets
                port
                geo {
                  continent_name
                  country_name
                  country_iso_code
                  city_name
                  region_iso_code
                  region_name
                }
              }
              destination {
                bytes
                ip
                packets
                port
                geo {
                  continent_name
                  country_name
                  country_iso_code
                  city_name
                  region_iso_code
                  region_name
                }
              }
              geo {
                region_name
                country_iso_code
              }
              suricata {
                eve {
                  proto
                  flow_id
                  alert {
                    signature
                    signature_id
                  }
                }
              }
              network {
                bytes
                community_id
                direction
                packets
                protocol
                transport
              }
              http {
                version
                request {
                  method
                  body {
                    bytes
                    content
                  }
                  referrer
                }
                response {
                  status_code
                  body {
                    bytes
                    content
                  }
                }
              }
              tls {
                client_certificate {
                  fingerprint {
                    sha1
                  }
                }
                fingerprints {
                  ja3 {
                    hash
                  }
                }
                server_certificate {
                  fingerprint {
                    sha1
                  }
                }
              }
              url {
                original
                domain
                username
                password
              }
              user {
                name
              }
              process {
                pid
                name
                ppid
                args
                executable
                title
                working_directory
              }
              zeek {
                session_id
                connection {
                  local_resp
                  local_orig
                  missed_bytes
                  state
                  history
                }
                notice {
                  suppress_for
                  msg
                  note
                  sub
                  dst
                  dropped
                  peer_descr
                }
                dns {
                  AA
                  qclass_name
                  RD
                  qtype_name
                  rejected
                  qtype
                  query
                  trans_id
                  qclass
                  RA
                  TC
                }
                http {
                  resp_mime_types
                  trans_depth
                  status_msg
                  resp_fuids
                  tags
                }
                files {
                  session_ids
                  timedout
                  local_orig
                  tx_host
                  source
                  is_orig
                  overflow_bytes
                  sha1
                  duration
                  depth
                  analyzers
                  mime_type
                  rx_host
                  total_bytes
                  fuid
                  seen_bytes
                  missing_bytes
                  md5
                }
                ssl {
                  cipher
                  established
                  resumed
                  version
                }
              }
            }
          }
        }
      }
    }
  }
`;
