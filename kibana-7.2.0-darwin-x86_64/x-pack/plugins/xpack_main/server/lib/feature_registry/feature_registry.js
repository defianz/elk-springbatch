"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const joi_1 = tslib_1.__importDefault(require("joi"));
const lodash_1 = require("lodash");
// Each feature gets its own property on the UICapabilities object,
// but that object has a few built-in properties which should not be overwritten.
const prohibitedFeatureIds = ['catalogue', 'management', 'navLinks'];
const featurePrivilegePartRegex = /^[a-zA-Z0-9_-]+$/;
const managementSectionIdRegex = /^[a-zA-Z0-9_-]+$/;
exports.uiCapabilitiesRegex = /^[a-zA-Z0-9:_-]+$/;
const managementSchema = joi_1.default.object().pattern(managementSectionIdRegex, joi_1.default.array().items(joi_1.default.string().regex(exports.uiCapabilitiesRegex)));
const catalogueSchema = joi_1.default.array().items(joi_1.default.string().regex(exports.uiCapabilitiesRegex));
const privilegeSchema = joi_1.default.object({
    management: managementSchema,
    catalogue: catalogueSchema,
    api: joi_1.default.array().items(joi_1.default.string()),
    app: joi_1.default.array().items(joi_1.default.string()),
    savedObject: joi_1.default.object({
        all: joi_1.default.array()
            .items(joi_1.default.string())
            .required(),
        read: joi_1.default.array()
            .items(joi_1.default.string())
            .required(),
    }).required(),
    ui: joi_1.default.array()
        .items(joi_1.default.string().regex(exports.uiCapabilitiesRegex))
        .required(),
});
const schema = joi_1.default.object({
    id: joi_1.default.string()
        .regex(featurePrivilegePartRegex)
        .invalid(...prohibitedFeatureIds)
        .required(),
    name: joi_1.default.string().required(),
    validLicenses: joi_1.default.array().items(joi_1.default.string().valid('basic', 'standard', 'gold', 'platinum')),
    icon: joi_1.default.string(),
    description: joi_1.default.string(),
    navLinkId: joi_1.default.string().regex(exports.uiCapabilitiesRegex),
    app: joi_1.default.array()
        .items(joi_1.default.string())
        .required(),
    management: managementSchema,
    catalogue: catalogueSchema,
    privileges: joi_1.default.object({
        all: privilegeSchema,
        read: privilegeSchema,
    }).required(),
    privilegesTooltip: joi_1.default.string(),
    reserved: joi_1.default.object({
        privilege: privilegeSchema.required(),
        description: joi_1.default.string().required(),
    }),
});
class FeatureRegistry {
    constructor() {
        this.locked = false;
        this.features = {};
    }
    register(feature) {
        if (this.locked) {
            throw new Error(`Features are locked, can't register new features`);
        }
        validateFeature(feature);
        if (feature.id in this.features) {
            throw new Error(`Feature with id ${feature.id} is already registered.`);
        }
        const featureCopy = lodash_1.cloneDeep(feature);
        this.features[feature.id] = applyAutomaticPrivilegeGrants(featureCopy);
    }
    getAll() {
        this.locked = true;
        return lodash_1.cloneDeep(Object.values(this.features));
    }
}
exports.FeatureRegistry = FeatureRegistry;
function validateFeature(feature) {
    const validateResult = joi_1.default.validate(feature, schema);
    if (validateResult.error) {
        throw validateResult.error;
    }
    // the following validation can't be enforced by the Joi schema, since it'd require us looking "up" the object graph for the list of valid value, which they explicitly forbid.
    const { app = [], management = {}, catalogue = [] } = feature;
    const privilegeEntries = [...Object.entries(feature.privileges)];
    if (feature.reserved) {
        privilegeEntries.push(['reserved', feature.reserved.privilege]);
    }
    privilegeEntries.forEach(([privilegeId, privilegeDefinition]) => {
        if (!privilegeDefinition) {
            throw new Error('Privilege definition may not be null or undefined');
        }
        const unknownAppEntries = lodash_1.difference(privilegeDefinition.app || [], app);
        if (unknownAppEntries.length > 0) {
            throw new Error(`Feature privilege ${feature.id}.${privilegeId} has unknown app entries: ${unknownAppEntries.join(', ')}`);
        }
        const unknownCatalogueEntries = lodash_1.difference(privilegeDefinition.catalogue || [], catalogue);
        if (unknownCatalogueEntries.length > 0) {
            throw new Error(`Feature privilege ${feature.id}.${privilegeId} has unknown catalogue entries: ${unknownCatalogueEntries.join(', ')}`);
        }
        Object.entries(privilegeDefinition.management || {}).forEach(([managementSectionId, managementEntry]) => {
            if (!management[managementSectionId]) {
                throw new Error(`Feature privilege ${feature.id}.${privilegeId} has unknown management section: ${managementSectionId}`);
            }
            const unknownSectionEntries = lodash_1.difference(managementEntry, management[managementSectionId]);
            if (unknownSectionEntries.length > 0) {
                throw new Error(`Feature privilege ${feature.id}.${privilegeId} has unknown management entries for section ${managementSectionId}: ${unknownSectionEntries.join(', ')}`);
            }
        });
    });
}
function applyAutomaticPrivilegeGrants(feature) {
    const { all: allPrivilege, read: readPrivilege } = feature.privileges;
    const reservedPrivilege = feature.reserved ? feature.reserved.privilege : null;
    applyAutomaticAllPrivilegeGrants(allPrivilege, reservedPrivilege);
    applyAutomaticReadPrivilegeGrants(readPrivilege);
    return feature;
}
function applyAutomaticAllPrivilegeGrants(...allPrivileges) {
    allPrivileges.forEach(allPrivilege => {
        if (allPrivilege) {
            allPrivilege.savedObject.all = lodash_1.uniq([...allPrivilege.savedObject.all, 'telemetry']);
            allPrivilege.savedObject.read = lodash_1.uniq([...allPrivilege.savedObject.read, 'config', 'url']);
        }
    });
}
function applyAutomaticReadPrivilegeGrants(...readPrivileges) {
    readPrivileges.forEach(readPrivilege => {
        if (readPrivilege) {
            readPrivilege.savedObject.read = lodash_1.uniq([...readPrivilege.savedObject.read, 'config', 'url']);
        }
    });
}
