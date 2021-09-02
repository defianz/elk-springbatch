"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const get_client_shield_1 = require("../../../../../server/lib/get_client_shield");
const constants_1 = require("../../../common/constants");
const actions_1 = require("./actions");
const check_privileges_1 = require("./check_privileges");
const check_privileges_dynamically_1 = require("./check_privileges_dynamically");
const mode_1 = require("./mode");
const privileges_1 = require("./privileges");
function createAuthorizationService(server, securityXPackFeature, xpackMainPlugin, spaces) {
    const shieldClient = get_client_shield_1.getClient(server);
    const config = server.config();
    const actions = actions_1.actionsFactory(config);
    const application = `${constants_1.APPLICATION_PREFIX}${config.get('kibana.index')}`;
    const checkPrivilegesWithRequest = check_privileges_1.checkPrivilegesWithRequestFactory(actions, application, shieldClient);
    const checkPrivilegesDynamicallyWithRequest = check_privileges_dynamically_1.checkPrivilegesDynamicallyWithRequestFactory(checkPrivilegesWithRequest, spaces);
    const mode = mode_1.authorizationModeFactory(securityXPackFeature);
    const privileges = privileges_1.privilegesFactory(actions, xpackMainPlugin);
    return {
        actions,
        application,
        checkPrivilegesWithRequest,
        checkPrivilegesDynamicallyWithRequest,
        mode,
        privileges,
    };
}
exports.createAuthorizationService = createAuthorizationService;
