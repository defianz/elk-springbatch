"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
function registerSnapshotsRoutes(router) {
    router.get('snapshots', exports.getAllHandler);
    router.get('snapshots/{repository}/{snapshot}', exports.getOneHandler);
}
exports.registerSnapshotsRoutes = registerSnapshotsRoutes;
exports.getAllHandler = async (req, callWithRequest) => {
    const repositoriesByName = await callWithRequest('snapshot.getRepository', {
        repository: '_all',
    });
    const repositoryNames = Object.keys(repositoriesByName);
    if (repositoryNames.length === 0) {
        return { snapshots: [], errors: [], repositories: [] };
    }
    const snapshots = [];
    const errors = {};
    const repositories = [];
    const fetchSnapshotsForRepository = async (repository) => {
        try {
            // If any of these repositories 504 they will cost the request significant time.
            const { snapshots: fetchedSnapshots, } = await callWithRequest('snapshot.get', {
                repository,
                snapshot: '_all',
                ignore_unavailable: true,
            });
            // Decorate each snapshot with the repository with which it's associated.
            fetchedSnapshots.forEach((snapshot) => {
                snapshots.push(lib_1.deserializeSnapshotDetails(repository, snapshot));
            });
            repositories.push(repository);
        }
        catch (error) {
            // These errors are commonly due to a misconfiguration in the repository or plugin errors,
            // which can result in a variety of 400, 404, and 500 errors.
            errors[repository] = error;
        }
    };
    await Promise.all(repositoryNames.map(fetchSnapshotsForRepository));
    return {
        snapshots,
        repositories,
        errors,
    };
};
exports.getOneHandler = async (req, callWithRequest) => {
    const { repository, snapshot } = req.params;
    const { snapshots } = await callWithRequest('snapshot.get', {
        repository,
        snapshot,
    });
    // If the snapshot is missing the endpoint will return a 404, so we'll never get to this point.
    return lib_1.deserializeSnapshotDetails(repository, snapshots[0]);
};
