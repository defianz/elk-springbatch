"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("./api");
const app_1 = require("./app");
const saved_object_1 = require("./saved_object");
const space_1 = require("./space");
const ui_1 = require("./ui");
/** Actions are used to create the "actions" that are associated with Elasticsearch's
 * application privileges, and are used to perform the authorization checks implemented
 * by the various `checkPrivilegesWithRequest` derivatives
 */
class Actions {
    constructor(versionNumber) {
        this.versionNumber = versionNumber;
        /**
         * The allHack action is used to differentiate the `all` privilege from the `read` privilege
         * for those applications which register the same set of actions for both privileges. This is a
         * temporary hack until we remove this assumption in the role management UI
         */
        this.allHack = 'allHack:';
        this.api = new api_1.ApiActions(this.versionNumber);
        this.app = new app_1.AppActions(this.versionNumber);
        this.login = 'login:';
        this.savedObject = new saved_object_1.SavedObjectActions(this.versionNumber);
        this.space = new space_1.SpaceActions(this.versionNumber);
        this.ui = new ui_1.UIActions(this.versionNumber);
        this.version = `version:${this.versionNumber}`;
    }
}
exports.Actions = Actions;
function actionsFactory(config) {
    const version = config.get('pkg.version');
    if (typeof version !== 'string') {
        throw new Error('version should be a string');
    }
    if (version === '') {
        throw new Error(`version can't be an empty string`);
    }
    return new Actions(version);
}
exports.actionsFactory = actionsFactory;
