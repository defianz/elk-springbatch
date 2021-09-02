"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_wrappers_1 = require("../../../../../server/lib/create_router/error_wrappers");
const constants_1 = require("../../../common/constants");
const lib_1 = require("../../lib");
let isCloudEnabled = false;
let callWithInternalUser;
function registerRepositoriesRoutes(router, plugins) {
    isCloudEnabled = plugins.cloud.config.isCloudEnabled;
    callWithInternalUser = plugins.elasticsearch.getCluster('data').callWithInternalUser;
    router.get('repository_types', exports.getTypesHandler);
    router.get('repositories', exports.getAllHandler);
    router.get('repositories/{name}', exports.getOneHandler);
    router.get('repositories/{name}/verify', exports.getVerificationHandler);
    router.put('repositories', exports.createHandler);
    router.put('repositories/{name}', exports.updateHandler);
    router.delete('repositories/{names}', exports.deleteHandler);
}
exports.registerRepositoriesRoutes = registerRepositoriesRoutes;
exports.getManagedRepositoryName = async () => {
    const { persistent, transient, defaults } = await callWithInternalUser('cluster.getSettings', {
        filterPath: '*.*managed_repository',
        flatSettings: true,
        includeDefaults: true,
    });
    const { 'cluster.metadata.managed_repository': managedRepositoryName = undefined } = {
        ...defaults,
        ...persistent,
        ...transient,
    };
    return managedRepositoryName;
};
exports.getAllHandler = async (req, callWithRequest) => {
    const managedRepository = await exports.getManagedRepositoryName();
    const repositoriesByName = await callWithRequest('snapshot.getRepository', {
        repository: '_all',
    });
    const repositoryNames = Object.keys(repositoriesByName);
    const repositories = repositoryNames.map(name => {
        const { type = '', settings = {} } = repositoriesByName[name];
        return {
            name,
            type,
            settings: lib_1.deserializeRepositorySettings(settings),
        };
    });
    return { repositories, managedRepository };
};
exports.getOneHandler = async (req, callWithRequest) => {
    const { name } = req.params;
    const managedRepository = await exports.getManagedRepositoryName();
    const repositoryByName = await callWithRequest('snapshot.getRepository', { repository: name });
    const { snapshots } = await callWithRequest('snapshot.get', {
        repository: name,
        snapshot: '_all',
    }).catch(e => ({
        snapshots: null,
    }));
    if (repositoryByName[name]) {
        const { type = '', settings = {} } = repositoryByName[name];
        return {
            repository: {
                name,
                type,
                settings: lib_1.deserializeRepositorySettings(settings),
            },
            isManagedRepository: managedRepository === name,
            snapshots: {
                count: snapshots ? snapshots.length : null,
            },
        };
    }
    else {
        return {
            repository: {},
            snapshots: {},
        };
    }
};
exports.getVerificationHandler = async (req, callWithRequest) => {
    const { name } = req.params;
    const verificationResults = await callWithRequest('snapshot.verifyRepository', {
        repository: name,
    }).catch(e => ({
        valid: false,
        error: e.response ? JSON.parse(e.response) : e,
    }));
    return {
        verification: verificationResults.error
            ? verificationResults
            : {
                valid: true,
                response: verificationResults,
            },
    };
};
exports.getTypesHandler = async () => {
    // In ECE/ESS, do not enable the default types
    const types = isCloudEnabled ? [] : [...constants_1.DEFAULT_REPOSITORY_TYPES];
    // Call with internal user so that the requesting user does not need `monitoring` cluster
    // privilege just to see list of available repository types
    const plugins = await callWithInternalUser('cat.plugins', { format: 'json' });
    // Filter list of plugins to repository-related ones
    if (plugins && plugins.length) {
        const pluginNames = [...new Set(plugins.map(plugin => plugin.component))];
        pluginNames.forEach(pluginName => {
            if (constants_1.REPOSITORY_PLUGINS_MAP[pluginName]) {
                types.push(constants_1.REPOSITORY_PLUGINS_MAP[pluginName]);
            }
        });
    }
    return types;
};
exports.createHandler = async (req, callWithRequest) => {
    const { name = '', type = '', settings = {} } = req.payload;
    const conflictError = error_wrappers_1.wrapCustomError(new Error('There is already a repository with that name.'), 409);
    // Check that repository with the same name doesn't already exist
    try {
        const repositoryByName = await callWithRequest('snapshot.getRepository', { repository: name });
        if (repositoryByName[name]) {
            throw conflictError;
        }
    }
    catch (e) {
        // Rethrow conflict error but silently swallow all others
        if (e === conflictError) {
            throw e;
        }
    }
    // Otherwise create new repository
    return await callWithRequest('snapshot.createRepository', {
        repository: name,
        body: {
            type,
            settings: lib_1.serializeRepositorySettings(settings),
        },
        verify: false,
    });
};
exports.updateHandler = async (req, callWithRequest) => {
    const { name } = req.params;
    const { type = '', settings = {} } = req.payload;
    // Check that repository with the given name exists
    // If it doesn't exist, 404 will be thrown by ES and will be returned
    await callWithRequest('snapshot.getRepository', { repository: name });
    // Otherwise update repository
    return await callWithRequest('snapshot.createRepository', {
        repository: name,
        body: {
            type,
            settings: lib_1.serializeRepositorySettings(settings),
        },
        verify: false,
    });
};
exports.deleteHandler = async (req, callWithRequest) => {
    const { names } = req.params;
    const repositoryNames = names.split(',');
    const response = {
        itemsDeleted: [],
        errors: [],
    };
    await Promise.all(repositoryNames.map(name => {
        return callWithRequest('snapshot.deleteRepository', { repository: name })
            .then(() => response.itemsDeleted.push(name))
            .catch(e => response.errors.push({
            name,
            error: error_wrappers_1.wrapEsError(e),
        }));
    }));
    return response;
};
