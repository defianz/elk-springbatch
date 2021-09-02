"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const crypto_1 = tslib_1.__importDefault(require("crypto"));
const lib_1 = require("./lib");
exports.PLUGIN_ID = 'encrypted_saved_objects';
exports.CONFIG_PREFIX = `xpack.${exports.PLUGIN_ID}`;
class Plugin {
    constructor(log) {
        this.log = log;
    }
    setup(core, plugins) {
        let encryptionKey = core.config.encryptionKey;
        if (encryptionKey == null) {
            this.log.warn(`Generating a random key for ${exports.CONFIG_PREFIX}.encryptionKey. To be able ` +
                'to decrypt encrypted saved objects attributes after restart, please set ' +
                `${exports.CONFIG_PREFIX}.encryptionKey in kibana.yml`);
            encryptionKey = crypto_1.default.randomBytes(16).toString('hex');
        }
        const service = Object.freeze(new lib_1.EncryptedSavedObjectsService(encryptionKey, core.savedObjects.types, this.log, new lib_1.EncryptedSavedObjectsAuditLogger(plugins.audit)));
        // Register custom saved object client that will encrypt, decrypt and strip saved object
        // attributes where appropriate for any saved object repository request. We choose max possible
        // priority for this wrapper to allow all other wrappers to set proper `namespace` for the Saved
        // Object (e.g. wrapper registered by the Spaces plugin) before we encrypt attributes since
        // `namespace` is included into AAD.
        core.savedObjects.addScopedSavedObjectsClientWrapperFactory(Number.MAX_SAFE_INTEGER, ({ client: baseClient }) => new lib_1.EncryptedSavedObjectsClientWrapper({ baseClient, service }));
        const internalRepository = core.savedObjects.getSavedObjectsRepository(core.elasticsearch.getCluster('admin').callWithInternalUser);
        return {
            isEncryptionError: (error) => error instanceof lib_1.EncryptionError,
            registerType: (typeRegistration) => service.registerType(typeRegistration),
            getDecryptedAsInternalUser: async (type, id, options) => {
                const savedObject = await internalRepository.get(type, id, options);
                return {
                    ...savedObject,
                    attributes: await service.decryptAttributes({ type, id, namespace: options && options.namespace }, savedObject.attributes),
                };
            },
        };
    }
}
exports.Plugin = Plugin;
