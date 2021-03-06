"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var elasticsearch_privileges_1 = require("./es/elasticsearch_privileges");
exports.ElasticsearchPrivileges = elasticsearch_privileges_1.ElasticsearchPrivileges;
var kibana_privileges_region_1 = require("./kibana/kibana_privileges_region");
exports.KibanaPrivilegesRegion = kibana_privileges_region_1.KibanaPrivilegesRegion;
