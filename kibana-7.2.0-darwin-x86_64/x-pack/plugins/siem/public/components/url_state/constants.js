"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const network_1 = require("../../store/network");
const hosts_1 = require("../../store/hosts");
var CONSTANTS;
(function (CONSTANTS) {
    CONSTANTS["hostsDetails"] = "hosts.details";
    CONSTANTS["hostsPage"] = "hosts.page";
    CONSTANTS["kqlQuery"] = "kqlQuery";
    CONSTANTS["networkDetails"] = "network.details";
    CONSTANTS["networkPage"] = "network.page";
    CONSTANTS["timerange"] = "timerange";
})(CONSTANTS = exports.CONSTANTS || (exports.CONSTANTS = {}));
exports.LOCATION_KEYS = [
    CONSTANTS.hostsDetails,
    CONSTANTS.hostsPage,
    CONSTANTS.networkDetails,
    CONSTANTS.networkPage,
];
exports.URL_STATE_KEYS = [CONSTANTS.kqlQuery, CONSTANTS.timerange];
exports.LOCATION_MAPPED_TO_MODEL = {
    [CONSTANTS.networkPage]: network_1.networkModel.NetworkType.page,
    [CONSTANTS.networkDetails]: network_1.networkModel.NetworkType.details,
    [CONSTANTS.hostsPage]: hosts_1.hostsModel.HostsType.page,
    [CONSTANTS.hostsDetails]: hosts_1.hostsModel.HostsType.details,
};
