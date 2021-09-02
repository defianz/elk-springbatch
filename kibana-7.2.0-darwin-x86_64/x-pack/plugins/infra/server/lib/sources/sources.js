"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const runtimeTypes = tslib_1.__importStar(require("io-ts"));
const PathReporter_1 = require("io-ts/lib/PathReporter");
const framework_1 = require("../adapters/framework");
const defaults_1 = require("./defaults");
const errors_1 = require("./errors");
const saved_object_mappings_1 = require("./saved_object_mappings");
const types_1 = require("./types");
class InfraSources {
    constructor(libs) {
        this.libs = libs;
        this.internalSourceConfigurations = new Map();
    }
    async getSourceConfiguration(request, sourceId) {
        const staticDefaultSourceConfiguration = await this.getStaticDefaultSourceConfiguration();
        const savedSourceConfiguration = await this.getInternalSourceConfiguration(sourceId)
            .then(internalSourceConfiguration => ({
            id: sourceId,
            version: undefined,
            updatedAt: undefined,
            origin: 'internal',
            configuration: mergeSourceConfiguration(staticDefaultSourceConfiguration, internalSourceConfiguration),
        }))
            .catch(err => err instanceof errors_1.NotFoundError
            ? this.getSavedSourceConfiguration(request, sourceId).then(result => ({
                ...result,
                configuration: mergeSourceConfiguration(staticDefaultSourceConfiguration, result.configuration),
            }))
            : Promise.reject(err))
            .catch(err => this.libs.savedObjects.SavedObjectsClient.errors.isNotFoundError(err)
            ? Promise.resolve({
                id: sourceId,
                version: undefined,
                updatedAt: undefined,
                origin: 'fallback',
                configuration: staticDefaultSourceConfiguration,
            })
            : Promise.reject(err));
        return savedSourceConfiguration;
    }
    async getAllSourceConfigurations(request) {
        const staticDefaultSourceConfiguration = await this.getStaticDefaultSourceConfiguration();
        const savedSourceConfigurations = await this.getAllSavedSourceConfigurations(request);
        return savedSourceConfigurations.map(savedSourceConfiguration => ({
            ...savedSourceConfiguration,
            configuration: mergeSourceConfiguration(staticDefaultSourceConfiguration, savedSourceConfiguration.configuration),
        }));
    }
    async createSourceConfiguration(request, sourceId, source) {
        const staticDefaultSourceConfiguration = await this.getStaticDefaultSourceConfiguration();
        const newSourceConfiguration = mergeSourceConfiguration(staticDefaultSourceConfiguration, source);
        const createdSourceConfiguration = convertSavedObjectToSavedSourceConfiguration(await this.libs.savedObjects
            .getScopedSavedObjectsClient(request[framework_1.internalInfraFrameworkRequest])
            .create(saved_object_mappings_1.infraSourceConfigurationSavedObjectType, types_1.pickSavedSourceConfiguration(newSourceConfiguration), { id: sourceId }));
        return {
            ...createdSourceConfiguration,
            configuration: mergeSourceConfiguration(staticDefaultSourceConfiguration, createdSourceConfiguration.configuration),
        };
    }
    async deleteSourceConfiguration(request, sourceId) {
        await this.libs.savedObjects
            .getScopedSavedObjectsClient(request[framework_1.internalInfraFrameworkRequest])
            .delete(saved_object_mappings_1.infraSourceConfigurationSavedObjectType, sourceId);
    }
    async updateSourceConfiguration(request, sourceId, sourceProperties) {
        const staticDefaultSourceConfiguration = await this.getStaticDefaultSourceConfiguration();
        const { configuration, version } = await this.getSourceConfiguration(request, sourceId);
        const updatedSourceConfigurationAttributes = mergeSourceConfiguration(configuration, sourceProperties);
        const updatedSourceConfiguration = convertSavedObjectToSavedSourceConfiguration(await this.libs.savedObjects
            .getScopedSavedObjectsClient(request[framework_1.internalInfraFrameworkRequest])
            .update(saved_object_mappings_1.infraSourceConfigurationSavedObjectType, sourceId, types_1.pickSavedSourceConfiguration(updatedSourceConfigurationAttributes), {
            version,
        }));
        return {
            ...updatedSourceConfiguration,
            configuration: mergeSourceConfiguration(staticDefaultSourceConfiguration, updatedSourceConfiguration.configuration),
        };
    }
    async defineInternalSourceConfiguration(sourceId, sourceProperties) {
        this.internalSourceConfigurations.set(sourceId, sourceProperties);
    }
    async getInternalSourceConfiguration(sourceId) {
        const internalSourceConfiguration = this.internalSourceConfigurations.get(sourceId);
        if (!internalSourceConfiguration) {
            throw new errors_1.NotFoundError(`Failed to load internal source configuration: no configuration "${sourceId}" found.`);
        }
        return internalSourceConfiguration;
    }
    async getStaticDefaultSourceConfiguration() {
        const staticConfiguration = await this.libs.configuration.get();
        const staticSourceConfiguration = runtimeTypes
            .type({
            sources: runtimeTypes.type({
                default: types_1.StaticSourceConfigurationRuntimeType,
            }),
        })
            .decode(staticConfiguration)
            .map(({ sources: { default: defaultConfiguration } }) => defaultConfiguration)
            .getOrElse({});
        return mergeSourceConfiguration(defaults_1.defaultSourceConfiguration, staticSourceConfiguration);
    }
    async getSavedSourceConfiguration(request, sourceId) {
        const savedObjectsClient = this.libs.savedObjects.getScopedSavedObjectsClient(request[framework_1.internalInfraFrameworkRequest]);
        const savedObject = await savedObjectsClient.get(saved_object_mappings_1.infraSourceConfigurationSavedObjectType, sourceId);
        return convertSavedObjectToSavedSourceConfiguration(savedObject);
    }
    async getAllSavedSourceConfigurations(request) {
        const savedObjectsClient = this.libs.savedObjects.getScopedSavedObjectsClient(request[framework_1.internalInfraFrameworkRequest]);
        const savedObjects = await savedObjectsClient.find({
            type: saved_object_mappings_1.infraSourceConfigurationSavedObjectType,
        });
        return savedObjects.saved_objects.map(convertSavedObjectToSavedSourceConfiguration);
    }
}
exports.InfraSources = InfraSources;
const mergeSourceConfiguration = (first, ...others) => others.reduce((previousSourceConfiguration, currentSourceConfiguration) => ({
    ...previousSourceConfiguration,
    ...currentSourceConfiguration,
    fields: {
        ...previousSourceConfiguration.fields,
        ...currentSourceConfiguration.fields,
    },
}), first);
const convertSavedObjectToSavedSourceConfiguration = (savedObject) => types_1.SourceConfigurationSavedObjectRuntimeType.decode(savedObject)
    .map(savedSourceConfiguration => ({
    id: savedSourceConfiguration.id,
    version: savedSourceConfiguration.version,
    updatedAt: savedSourceConfiguration.updated_at,
    origin: 'stored',
    configuration: savedSourceConfiguration.attributes,
}))
    .getOrElseL(errors => {
    throw new Error(PathReporter_1.failure(errors).join('\n'));
});
