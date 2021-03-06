"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
exports.pingsSchema = graphql_tag_1.default `
  schema {
    query: Query
  }

  type PingResults {
    total: UnsignedInteger!
    pings: [Ping!]!
  }

  type Query {
    "Get a list of all recorded pings for all monitors"
    allPings(
      "Optional: the direction to sort by. Accepts 'asc' and 'desc'. Defaults to 'desc'."
      sort: String
      "Optional: the number of results to return."
      size: Int
      "Optional: the monitor ID filter."
      monitorId: String
      "Optional: the check status to filter by."
      status: String
      "The lower limit of the date range."
      dateRangeStart: String!
      "The upper limit of the date range."
      dateRangeEnd: String!
      "Optional: agent location to filter by."
      location: String
    ): PingResults!

    "Gets the number of documents in the target index"
    getDocCount: DocCount!
  }

  type ContainerImage {
    name: String
    tag: String
  }

  type Container {
    id: String
    image: ContainerImage
    name: String
    runtime: String
  }

  type DocCount {
    count: UnsignedInteger!
  }

  "The monitor's status for a ping"
  type Duration {
    us: UnsignedInteger
  }

  type StatusCode {
    status_code: Int
  }

  "An agent for recording a beat"
  type Beat {
    hostname: String
    name: String
    timezone: String
    type: String
  }

  type Docker {
    id: String
    image: String
    name: String
  }

  type ECS {
    version: String
  }

  type Error {
    code: Int
    message: String
    type: String
  }

  type OS {
    family: String
    kernel: String
    platform: String
    version: String
    name: String
    build: String
  }

  "Geolocation data added via processors to enrich events."
  type Geo {
    "Name of the city in which the agent is running."
    city_name: String
    "The name of the continent on which the agent is running."
    continent_name: String
    "ISO designation for the agent's country."
    country_iso_code: String
    "The name of the agent's country."
    country_name: String
    "The lat/long of the agent."
    location: String
    "A name for the host's location, e.g. 'us-east-1' or 'LAX'."
    name: String
    "ISO designation of the agent's region."
    region_iso_code: String
    "Name of the region hosting the agent."
    region_name: String
  }

  type Host {
    architecture: String
    id: String
    hostname: String
    ip: String
    mac: String
    name: String
    os: OS
  }

  type HttpRTT {
    content: Duration
    response_header: Duration
    total: Duration
    validate: Duration
    validate_body: Duration
    write_request: Duration
  }

  type HTTP {
    response: StatusCode
    rtt: HttpRTT
    url: String
  }

  type ICMP {
    requests: Int
    rtt: Int
  }

  type KubernetesContainer {
    image: String
    name: String
  }

  type KubernetesNode {
    name: String
  }

  type KubernetesPod {
    name: String
    uid: String
  }

  type Kubernetes {
    container: KubernetesContainer
    namespace: String
    node: KubernetesNode
    pod: KubernetesPod
  }

  type MetaCloud {
    availability_zone: String
    instance_id: String
    instance_name: String
    machine_type: String
    project_id: String
    provider: String
    region: String
  }

  type Meta {
    cloud: MetaCloud
  }

  type Monitor {
    duration: Duration
    host: String
    "The id of the monitor"
    id: String
    "The IP pinged by the monitor"
    ip: String
    "The name of the protocol being monitored"
    name: String
    "The protocol scheme of the monitored host"
    scheme: String
    "The status of the monitored host"
    status: String
    "The type of host being monitored"
    type: String
    check_group: String
  }

  "Metadata added by a proccessor, which is specified in its configuration."
  type Observer {
    "Geolocation data for the agent."
    geo: Geo
  }

  type Resolve {
    host: String
    ip: String
    rtt: Duration
  }

  type RTT {
    connect: Duration
    handshake: Duration
    validate: Duration
  }

  type Socks5 {
    rtt: RTT
  }

  type Summary {
    up: Int
    down: Int
  }

  type TCP {
    port: Int
    rtt: RTT
  }

  type TLS {
    certificate_not_valid_after: String
    certificate_not_valid_before: String
    certificates: String
    rtt: RTT
  }

  type URL {
    full: String
    scheme: String
    domain: String
    port: Int
    path: String
    query: String
  }

  "A request sent from a monitor to a host"
  type Ping {
    "The timestamp of the ping's creation"
    timestamp: String!
    "Milliseconds from the timestamp to the current time"
    millisFromNow: String
    "The agent that recorded the ping"
    beat: Beat
    container: Container
    docker: Docker
    ecs: ECS
    error: Error
    host: Host
    http: HTTP
    icmp: ICMP
    kubernetes: Kubernetes
    meta: Meta
    monitor: Monitor
    observer: Observer
    resolve: Resolve
    socks5: Socks5
    summary: Summary
    tags: String
    tcp: TCP
    tls: TLS
    url: URL
  }
`;
