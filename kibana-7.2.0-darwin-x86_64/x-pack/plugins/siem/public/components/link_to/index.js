"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var link_to_1 = require("./link_to");
exports.LinkToPage = link_to_1.LinkToPage;
var redirect_to_overview_1 = require("./redirect_to_overview");
exports.getOverviewUrl = redirect_to_overview_1.getOverviewUrl;
exports.RedirectToOverviewPage = redirect_to_overview_1.RedirectToOverviewPage;
var redirect_to_hosts_1 = require("./redirect_to_hosts");
exports.getHostsUrl = redirect_to_hosts_1.getHostsUrl;
exports.RedirectToHostsPage = redirect_to_hosts_1.RedirectToHostsPage;
var redirect_to_network_1 = require("./redirect_to_network");
exports.getNetworkUrl = redirect_to_network_1.getNetworkUrl;
exports.RedirectToNetworkPage = redirect_to_network_1.RedirectToNetworkPage;
var redirect_to_timelines_1 = require("./redirect_to_timelines");
exports.getTimelinesUrl = redirect_to_timelines_1.getTimelinesUrl;
exports.RedirectToTimelinesPage = redirect_to_timelines_1.RedirectToTimelinesPage;
