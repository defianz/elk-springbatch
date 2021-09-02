"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTree = (state) => state.file.tree;
exports.lastRequestPathSelector = (state) => state.symbol.lastRequestPath || '';
exports.structureSelector = (state) => {
    const pathname = exports.lastRequestPathSelector(state);
    const symbols = state.symbol.structureTree[pathname];
    return symbols || [];
};
exports.refUrlSelector = (state) => {
    const payload = state.editor.refPayload;
    if (payload) {
        const { line, character } = payload.position;
        return `${payload.textDocument.uri}!L${line}:${character}`;
    }
    return undefined;
};
exports.fileSelector = (state) => state.file.file;
exports.searchScopeSelector = (state) => state.search.scope;
exports.repoUriSelector = (state) => {
    const { resource, org, repo } = state.route.match.params;
    return `${resource}/${org}/${repo}`;
};
exports.routeSelector = (state) => state.route.match;
exports.statusSelector = (state, repoUri) => {
    return state.status.status[repoUri];
};
exports.allStatusSelector = (state) => state.status.status;
exports.currentPathSelector = (state) => state.route.match.params.path;
exports.treeCommitsSelector = (state) => {
    const path = exports.currentPathSelector(state);
    if (path === '') {
        return state.file.commits;
    }
    else {
        return state.file.treeCommits[path];
    }
};
exports.hasMoreCommitsSelector = (state) => {
    const path = exports.currentPathSelector(state);
    const isLoading = state.file.loadingCommits;
    if (isLoading) {
        return false;
    }
    if (state.file.commitsFullyLoaded[path]) {
        return false;
    }
    const commits = path === '' ? state.file.commits : state.file.treeCommits[path];
    if (!commits) {
        // To avoid infinite loops in component `InfiniteScroll`,
        // here we set hasMore to false before we receive the first batch.
        return false;
    }
    return true;
};
function find(tree, paths) {
    if (paths.length === 0) {
        return tree;
    }
    const [p, ...rest] = paths;
    if (tree.children) {
        const child = tree.children.find((c) => c.name === p);
        if (child) {
            return find(child, rest);
        }
    }
    return null;
}
exports.currentTreeSelector = (state) => {
    const tree = exports.getTree(state);
    const path = exports.currentPathSelector(state) || '';
    return find(tree, path.split('/'));
};
exports.createTreeSelector = (path) => (state) => {
    const tree = exports.getTree(state);
    return find(tree, path.split('/'));
};
exports.currentRepoSelector = (state) => state.repository.currentRepository;
exports.repoScopeSelector = (state) => state.search.searchOptions.repoScope;
exports.urlQueryStringSelector = (state) => state.route.match.location.search;
