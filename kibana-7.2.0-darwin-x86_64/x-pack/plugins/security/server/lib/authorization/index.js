"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("./actions");
exports.Actions = actions_1.Actions;
var service_1 = require("./service");
exports.createAuthorizationService = service_1.createAuthorizationService;
var disable_ui_capabilities_1 = require("./disable_ui_capabilities");
exports.disableUICapabilitesFactory = disable_ui_capabilities_1.disableUICapabilitesFactory;
var api_authorization_1 = require("./api_authorization");
exports.initAPIAuthorization = api_authorization_1.initAPIAuthorization;
var app_authorization_1 = require("./app_authorization");
exports.initAppAuthorization = app_authorization_1.initAppAuthorization;
var privilege_serializer_1 = require("./privilege_serializer");
exports.PrivilegeSerializer = privilege_serializer_1.PrivilegeSerializer;
// @ts-ignore
var register_privileges_with_cluster_1 = require("./register_privileges_with_cluster");
exports.registerPrivilegesWithCluster = register_privileges_with_cluster_1.registerPrivilegesWithCluster;
var resource_serializer_1 = require("./resource_serializer");
exports.ResourceSerializer = resource_serializer_1.ResourceSerializer;
var validate_feature_privileges_1 = require("./validate_feature_privileges");
exports.validateFeaturePrivileges = validate_feature_privileges_1.validateFeaturePrivileges;
