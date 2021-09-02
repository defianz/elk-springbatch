"use strict";
/* tslint:disable */
/* eslint-disable */
/*
     * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
     * or more contributor license agreements. Licensed under the Elastic License;
     * you may not use this file except in compliance with the Elastic License.
     */
Object.defineProperty(exports, "__esModule", { value: true });
// ====================================================
// Enums
// ====================================================
var SortFieldNote;
(function (SortFieldNote) {
    SortFieldNote["updatedBy"] = "updatedBy";
    SortFieldNote["updated"] = "updated";
})(SortFieldNote = exports.SortFieldNote || (exports.SortFieldNote = {}));
var Direction;
(function (Direction) {
    Direction["asc"] = "asc";
    Direction["desc"] = "desc";
})(Direction = exports.Direction || (exports.Direction = {}));
var LastEventIndexKey;
(function (LastEventIndexKey) {
    LastEventIndexKey["hostDetails"] = "hostDetails";
    LastEventIndexKey["hosts"] = "hosts";
    LastEventIndexKey["ipDetails"] = "ipDetails";
    LastEventIndexKey["network"] = "network";
})(LastEventIndexKey = exports.LastEventIndexKey || (exports.LastEventIndexKey = {}));
var HostsFields;
(function (HostsFields) {
    HostsFields["hostName"] = "hostName";
    HostsFields["lastSeen"] = "lastSeen";
})(HostsFields = exports.HostsFields || (exports.HostsFields = {}));
var DomainsFields;
(function (DomainsFields) {
    DomainsFields["domainName"] = "domainName";
    DomainsFields["direction"] = "direction";
    DomainsFields["bytes"] = "bytes";
    DomainsFields["packets"] = "packets";
    DomainsFields["uniqueIpCount"] = "uniqueIpCount";
})(DomainsFields = exports.DomainsFields || (exports.DomainsFields = {}));
var FlowDirection;
(function (FlowDirection) {
    FlowDirection["uniDirectional"] = "uniDirectional";
    FlowDirection["biDirectional"] = "biDirectional";
})(FlowDirection = exports.FlowDirection || (exports.FlowDirection = {}));
var FlowTarget;
(function (FlowTarget) {
    FlowTarget["client"] = "client";
    FlowTarget["destination"] = "destination";
    FlowTarget["server"] = "server";
    FlowTarget["source"] = "source";
})(FlowTarget = exports.FlowTarget || (exports.FlowTarget = {}));
var NetworkDirectionEcs;
(function (NetworkDirectionEcs) {
    NetworkDirectionEcs["inbound"] = "inbound";
    NetworkDirectionEcs["outbound"] = "outbound";
    NetworkDirectionEcs["internal"] = "internal";
    NetworkDirectionEcs["external"] = "external";
    NetworkDirectionEcs["incoming"] = "incoming";
    NetworkDirectionEcs["outgoing"] = "outgoing";
    NetworkDirectionEcs["listening"] = "listening";
    NetworkDirectionEcs["unknown"] = "unknown";
})(NetworkDirectionEcs = exports.NetworkDirectionEcs || (exports.NetworkDirectionEcs = {}));
var TlsFields;
(function (TlsFields) {
    TlsFields["_id"] = "_id";
})(TlsFields = exports.TlsFields || (exports.TlsFields = {}));
var UsersFields;
(function (UsersFields) {
    UsersFields["name"] = "name";
    UsersFields["count"] = "count";
})(UsersFields = exports.UsersFields || (exports.UsersFields = {}));
var NetworkTopNFlowFields;
(function (NetworkTopNFlowFields) {
    NetworkTopNFlowFields["bytes"] = "bytes";
    NetworkTopNFlowFields["packets"] = "packets";
    NetworkTopNFlowFields["ipCount"] = "ipCount";
})(NetworkTopNFlowFields = exports.NetworkTopNFlowFields || (exports.NetworkTopNFlowFields = {}));
var NetworkDnsFields;
(function (NetworkDnsFields) {
    NetworkDnsFields["dnsName"] = "dnsName";
    NetworkDnsFields["queryCount"] = "queryCount";
    NetworkDnsFields["uniqueDomains"] = "uniqueDomains";
    NetworkDnsFields["dnsBytesIn"] = "dnsBytesIn";
    NetworkDnsFields["dnsBytesOut"] = "dnsBytesOut";
})(NetworkDnsFields = exports.NetworkDnsFields || (exports.NetworkDnsFields = {}));
var SortFieldTimeline;
(function (SortFieldTimeline) {
    SortFieldTimeline["title"] = "title";
    SortFieldTimeline["description"] = "description";
    SortFieldTimeline["updated"] = "updated";
    SortFieldTimeline["created"] = "created";
})(SortFieldTimeline = exports.SortFieldTimeline || (exports.SortFieldTimeline = {}));
