"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const lodash_1 = require("lodash");
const types_1 = require("../../../../../xpack_main/types");
class UIActions {
    constructor(versionNumber) {
        this.prefix = `ui:${versionNumber}:`;
    }
    get all() {
        return `${this.prefix}*`;
    }
    get allNavLinks() {
        return `${this.prefix}navLinks/*`;
    }
    get allCatalogueEntries() {
        return `${this.prefix}catalogue/*`;
    }
    get allManagmentLinks() {
        return `${this.prefix}management/*`;
    }
    get(featureId, ...uiCapabilityParts) {
        if (!featureId || !lodash_1.isString(featureId)) {
            throw new Error('featureId is required and must be a string');
        }
        if (!uiCapabilityParts || !Array.isArray(uiCapabilityParts)) {
            throw new Error('uiCapabilityParts is required and must be an array');
        }
        if (uiCapabilityParts.length === 0 ||
            uiCapabilityParts.findIndex(part => !part || !lodash_1.isString(part) || !types_1.uiCapabilitiesRegex.test(part)) >= 0) {
            throw new Error(`UI capabilities are required, and must all be strings matching the pattern ${types_1.uiCapabilitiesRegex}`);
        }
        return `${this.prefix}${featureId}/${uiCapabilityParts.join('/')}`;
    }
}
exports.UIActions = UIActions;
