"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const immer_1 = tslib_1.__importDefault(require("immer"));
const redux_actions_1 = require("redux-actions");
const model_1 = require("../../model");
const commit_1 = require("../../model/commit");
const actions_1 = require("../actions");
const initialState = {
    tree: {
        name: '',
        path: '',
        children: undefined,
        type: model_1.FileTreeItemType.Directory,
    },
    openedPaths: [],
    notFoundDirs: [],
    fileTreeLoadingPaths: [''],
    branches: [],
    tags: [],
    commits: [],
    treeCommits: {},
    isNotFound: false,
    loadingCommits: false,
    commitsFullyLoaded: {},
};
function mergeNode(a, b) {
    const childrenMap = {};
    if (a.children) {
        a.children.forEach(child => {
            childrenMap[child.name] = child;
        });
    }
    if (b.children) {
        b.children.forEach(childB => {
            const childA = childrenMap[childB.name];
            if (childA) {
                childrenMap[childB.name] = mergeNode(childA, childB);
            }
            else {
                childrenMap[childB.name] = childB;
            }
        });
    }
    return {
        ...a,
        ...b,
        children: Object.values(childrenMap).sort(model_1.sortFileTree),
    };
}
function getPathOfTree(tree, paths) {
    let child = tree;
    for (const p of paths) {
        if (child && child.children) {
            child = child.children.find(c => c.name === p);
        }
        else {
            return null;
        }
    }
    return child;
}
exports.getPathOfTree = getPathOfTree;
exports.file = redux_actions_1.handleActions({
    [String(actions_1.fetchRepoTree)]: (state, action) => immer_1.default(state, draft => {
        // @ts-ignore
        draft.fileTreeLoadingPaths.push(action.payload.path);
    }),
    [String(actions_1.fetchRepoTreeSuccess)]: (state, action) => immer_1.default(state, (draft) => {
        draft.notFoundDirs = draft.notFoundDirs.filter(dir => dir !== action.payload.path);
        draft.fileTreeLoadingPaths = draft.fileTreeLoadingPaths.filter(p => p !== action.payload.path && p !== '');
        const { tree, path, withParents } = action.payload;
        if (withParents || path === '/' || path === '') {
            draft.tree = mergeNode(draft.tree, tree);
        }
        else {
            const parentsPath = path.split('/');
            const lastPath = parentsPath.pop();
            const parent = getPathOfTree(draft.tree, parentsPath);
            if (parent) {
                parent.children = parent.children || [];
                const idx = parent.children.findIndex(c => c.name === lastPath);
                if (idx >= 0) {
                    parent.children[idx] = tree;
                }
                else {
                    parent.children.push(tree);
                }
            }
        }
    }),
    [String(actions_1.fetchRootRepoTreeSuccess)]: (state, action) => immer_1.default(state, (draft) => {
        draft.fileTreeLoadingPaths = draft.fileTreeLoadingPaths.filter(p => p !== '/' && p !== '');
        draft.tree = mergeNode(draft.tree, action.payload);
    }),
    [String(actions_1.fetchRootRepoTreeFailed)]: (state, action) => immer_1.default(state, (draft) => {
        draft.fileTreeLoadingPaths = draft.fileTreeLoadingPaths.filter(p => p !== '/' && p !== '');
    }),
    [String(actions_1.dirNotFound)]: (state, action) => immer_1.default(state, (draft) => {
        draft.notFoundDirs.push(action.payload);
    }),
    [String(actions_1.resetRepoTree)]: (state) => immer_1.default(state, (draft) => {
        draft.tree = initialState.tree;
        draft.openedPaths = initialState.openedPaths;
    }),
    [String(actions_1.fetchRepoTreeFailed)]: (state, action) => immer_1.default(state, draft => {
        draft.fileTreeLoadingPaths = draft.fileTreeLoadingPaths.filter(p => p !== action.payload.path && p !== '');
    }),
    [String(actions_1.openTreePath)]: (state, action) => immer_1.default(state, (draft) => {
        let path = action.payload;
        const openedPaths = state.openedPaths;
        const pathSegs = path.split('/');
        while (!openedPaths.includes(path)) {
            draft.openedPaths.push(path);
            pathSegs.pop();
            if (pathSegs.length <= 0) {
                break;
            }
            path = pathSegs.join('/');
        }
    }),
    [String(actions_1.closeTreePath)]: (state, action) => immer_1.default(state, (draft) => {
        const path = action.payload;
        const isSubFolder = (p) => p.startsWith(path + '/');
        draft.openedPaths = state.openedPaths.filter(p => !(p === path || isSubFolder(p)));
    }),
    [String(actions_1.fetchRepoCommitsSuccess)]: (state, action) => immer_1.default(state, draft => {
        draft.commits = action.payload;
        draft.loadingCommits = false;
    }),
    [String(actions_1.fetchMoreCommits)]: (state, action) => immer_1.default(state, draft => {
        draft.loadingCommits = true;
    }),
    [String(actions_1.fetchRepoBranchesSuccess)]: (state, action) => immer_1.default(state, (draft) => {
        const references = action.payload;
        draft.tags = references.filter(r => r.type === commit_1.ReferenceType.TAG);
        draft.branches = references.filter(r => r.type !== commit_1.ReferenceType.TAG);
    }),
    [String(actions_1.fetchFileSuccess)]: (state, action) => immer_1.default(state, draft => {
        draft.file = action.payload;
        draft.isNotFound = false;
    }),
    [String(actions_1.fetchFileFailed)]: (state, action) => immer_1.default(state, draft => {
        draft.file = undefined;
    }),
    [String(actions_1.fetchDirectorySuccess)]: (state, action) => immer_1.default(state, draft => {
        draft.opendir = action.payload;
    }),
    [String(actions_1.fetchDirectory)]: (state, action) => immer_1.default(state, draft => {
        draft.opendir = undefined;
    }),
    [String(actions_1.setNotFound)]: (state, action) => immer_1.default(state, draft => {
        draft.isNotFound = action.payload;
    }),
    [String(actions_1.routeChange)]: (state, action) => immer_1.default(state, draft => {
        draft.isNotFound = false;
    }),
    [String(actions_1.fetchTreeCommits)]: (state) => immer_1.default(state, draft => {
        draft.loadingCommits = true;
    }),
    [String(actions_1.fetchTreeCommitsFailed)]: (state) => immer_1.default(state, draft => {
        draft.loadingCommits = false;
    }),
    [String(actions_1.fetchTreeCommitsSuccess)]: (state, action) => immer_1.default(state, draft => {
        const { path, commits, append } = action.payload;
        if (path === '' || path === '/') {
            if (commits.length === 0) {
                draft.commitsFullyLoaded[''] = true;
            }
            else if (append) {
                draft.commits = draft.commits.concat(commits);
            }
            else {
                draft.commits = commits;
            }
        }
        else {
            if (commits.length === 0) {
                draft.commitsFullyLoaded[path] = true;
            }
            else if (append) {
                draft.treeCommits[path] = draft.treeCommits[path].concat(commits);
            }
            else {
                draft.treeCommits[path] = commits;
            }
        }
        draft.loadingCommits = false;
    }),
}, initialState);
