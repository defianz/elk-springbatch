"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const boom_1 = tslib_1.__importDefault(require("boom"));
const lodash_1 = require("lodash");
const is_reserved_space_1 = require("../../common/is_reserved_space");
class SpacesClient {
    constructor(auditLogger, debugLogger, authorization, callWithRequestSavedObjectRepository, config, internalSavedObjectRepository, request) {
        this.auditLogger = auditLogger;
        this.debugLogger = debugLogger;
        this.authorization = authorization;
        this.callWithRequestSavedObjectRepository = callWithRequestSavedObjectRepository;
        this.config = config;
        this.internalSavedObjectRepository = internalSavedObjectRepository;
        this.request = request;
    }
    async canEnumerateSpaces() {
        if (this.useRbac()) {
            const checkPrivileges = this.authorization.checkPrivilegesWithRequest(this.request);
            const { hasAllRequested } = await checkPrivileges.globally(this.authorization.actions.space.manage);
            this.debugLogger(`SpacesClient.canEnumerateSpaces, using RBAC. Result: ${hasAllRequested}`);
            return hasAllRequested;
        }
        // If not RBAC, then security isn't enabled and we can enumerate all spaces
        this.debugLogger(`SpacesClient.canEnumerateSpaces, NOT USING RBAC. Result: true`);
        return true;
    }
    async getAll() {
        if (this.useRbac()) {
            const { saved_objects } = await this.internalSavedObjectRepository.find({
                type: 'space',
                page: 1,
                perPage: this.config.get('xpack.spaces.maxSpaces'),
                sortField: 'name.keyword',
            });
            this.debugLogger(`SpacesClient.getAll(), using RBAC. Found ${saved_objects.length} spaces`);
            const spaces = saved_objects.map(this.transformSavedObjectToSpace);
            const spaceIds = spaces.map((space) => space.id);
            const checkPrivileges = this.authorization.checkPrivilegesWithRequest(this.request);
            const { username, spacePrivileges } = await checkPrivileges.atSpaces(spaceIds, this.authorization.actions.login);
            const authorized = Object.keys(spacePrivileges).filter(spaceId => {
                return spacePrivileges[spaceId][this.authorization.actions.login];
            });
            this.debugLogger(`SpacesClient.getAll(), authorized for ${authorized.length} spaces, derived from ES privilege check: ${JSON.stringify(spacePrivileges)}`);
            if (authorized.length === 0) {
                this.debugLogger(`SpacesClient.getAll(), using RBAC. returning 403/Forbidden. Not authorized for any spaces.`);
                this.auditLogger.spacesAuthorizationFailure(username, 'getAll');
                throw boom_1.default.forbidden();
            }
            this.auditLogger.spacesAuthorizationSuccess(username, 'getAll', authorized);
            const filteredSpaces = spaces.filter((space) => authorized.includes(space.id));
            this.debugLogger(`SpacesClient.getAll(), using RBAC. returning spaces: ${filteredSpaces
                .map(s => s.id)
                .join(',')}`);
            return filteredSpaces;
        }
        else {
            this.debugLogger(`SpacesClient.getAll(), NOT USING RBAC. querying all spaces`);
            const { saved_objects } = await this.callWithRequestSavedObjectRepository.find({
                type: 'space',
                page: 1,
                perPage: this.config.get('xpack.spaces.maxSpaces'),
                sortField: 'name.keyword',
            });
            this.debugLogger(`SpacesClient.getAll(), NOT USING RBAC. Found ${saved_objects.length} spaces.`);
            return saved_objects.map(this.transformSavedObjectToSpace);
        }
    }
    async get(id) {
        if (this.useRbac()) {
            await this.ensureAuthorizedAtSpace(id, this.authorization.actions.login, 'get', `Unauthorized to get ${id} space`);
        }
        const repository = this.useRbac()
            ? this.internalSavedObjectRepository
            : this.callWithRequestSavedObjectRepository;
        const savedObject = await repository.get('space', id);
        return this.transformSavedObjectToSpace(savedObject);
    }
    async create(space) {
        if (this.useRbac()) {
            this.debugLogger(`SpacesClient.create(), using RBAC. Checking if authorized globally`);
            await this.ensureAuthorizedGlobally(this.authorization.actions.space.manage, 'create', 'Unauthorized to create spaces');
            this.debugLogger(`SpacesClient.create(), using RBAC. Global authorization check succeeded`);
        }
        const repository = this.useRbac()
            ? this.internalSavedObjectRepository
            : this.callWithRequestSavedObjectRepository;
        const { total } = await repository.find({
            type: 'space',
            page: 1,
            perPage: 0,
        });
        if (total >= this.config.get('xpack.spaces.maxSpaces')) {
            throw boom_1.default.badRequest('Unable to create Space, this exceeds the maximum number of spaces set by the xpack.spaces.maxSpaces setting');
        }
        this.debugLogger(`SpacesClient.create(), using RBAC. Attempting to create space`);
        const attributes = lodash_1.omit(space, ['id', '_reserved']);
        const id = space.id;
        const createdSavedObject = await repository.create('space', attributes, { id });
        this.debugLogger(`SpacesClient.create(), created space object`);
        return this.transformSavedObjectToSpace(createdSavedObject);
    }
    async update(id, space) {
        if (this.useRbac()) {
            await this.ensureAuthorizedGlobally(this.authorization.actions.space.manage, 'update', 'Unauthorized to update spaces');
        }
        const repository = this.useRbac()
            ? this.internalSavedObjectRepository
            : this.callWithRequestSavedObjectRepository;
        const attributes = lodash_1.omit(space, 'id', '_reserved');
        await repository.update('space', id, attributes);
        const updatedSavedObject = await repository.get('space', id);
        return this.transformSavedObjectToSpace(updatedSavedObject);
    }
    async delete(id) {
        if (this.useRbac()) {
            await this.ensureAuthorizedGlobally(this.authorization.actions.space.manage, 'delete', 'Unauthorized to delete spaces');
        }
        const repository = this.useRbac()
            ? this.internalSavedObjectRepository
            : this.callWithRequestSavedObjectRepository;
        const existingSavedObject = await repository.get('space', id);
        if (is_reserved_space_1.isReservedSpace(this.transformSavedObjectToSpace(existingSavedObject))) {
            throw boom_1.default.badRequest('This Space cannot be deleted because it is reserved.');
        }
        await repository.delete('space', id);
        await repository.deleteByNamespace(id);
    }
    useRbac() {
        return this.authorization && this.authorization.mode.useRbacForRequest(this.request);
    }
    async ensureAuthorizedGlobally(action, method, forbiddenMessage) {
        const checkPrivileges = this.authorization.checkPrivilegesWithRequest(this.request);
        const { username, hasAllRequested } = await checkPrivileges.globally(action);
        if (hasAllRequested) {
            this.auditLogger.spacesAuthorizationSuccess(username, method);
            return;
        }
        else {
            this.auditLogger.spacesAuthorizationFailure(username, method);
            throw boom_1.default.forbidden(forbiddenMessage);
        }
    }
    async ensureAuthorizedAtSpace(spaceId, action, method, forbiddenMessage) {
        const checkPrivileges = this.authorization.checkPrivilegesWithRequest(this.request);
        const { username, hasAllRequested } = await checkPrivileges.atSpace(spaceId, action);
        if (hasAllRequested) {
            this.auditLogger.spacesAuthorizationSuccess(username, method, [spaceId]);
            return;
        }
        else {
            this.auditLogger.spacesAuthorizationFailure(username, method, [spaceId]);
            throw boom_1.default.forbidden(forbiddenMessage);
        }
    }
    transformSavedObjectToSpace(savedObject) {
        return {
            id: savedObject.id,
            ...savedObject.attributes,
        };
    }
}
exports.SpacesClient = SpacesClient;
