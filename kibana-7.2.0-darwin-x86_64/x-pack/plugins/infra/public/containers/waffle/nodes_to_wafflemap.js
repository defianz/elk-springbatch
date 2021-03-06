"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
const lodash_1 = require("lodash");
const type_guards_1 = require("./type_guards");
function createId(path) {
    return path.map(p => p.value).join('/');
}
exports.createId = createId;
function findOrCreateGroupWithNodes(groups, path) {
    const id = path.length === 0 ? '__all__' : createId(path);
    /**
     * If the group is going to be a top level group then we can just
     * look for the full id. Otherwise we need to find the parent group and
     * then look for the group in it's sub groups.
     */
    if (path.length === 2) {
        const parentId = lodash_1.first(path).value;
        const existingParentGroup = groups.find(g => g.id === parentId);
        if (type_guards_1.isWaffleMapGroupWithGroups(existingParentGroup)) {
            const existingSubGroup = existingParentGroup.groups.find(g => g.id === id);
            if (type_guards_1.isWaffleMapGroupWithNodes(existingSubGroup)) {
                return existingSubGroup;
            }
        }
    }
    const lastPath = lodash_1.last(path);
    const existingGroup = groups.find(g => g.id === id);
    if (type_guards_1.isWaffleMapGroupWithNodes(existingGroup)) {
        return existingGroup;
    }
    return {
        id,
        name: id === '__all__'
            ? i18n_1.i18n.translate('xpack.infra.nodesToWaffleMap.groupsWithNodes.allName', {
                defaultMessage: 'All',
            })
            : (lastPath && lastPath.label) || 'Unknown Group',
        count: 0,
        width: 0,
        squareSize: 0,
        nodes: [],
    };
}
function findOrCreateGroupWithGroups(groups, path) {
    const id = path.length === 0 ? '__all__' : createId(path);
    const lastPath = lodash_1.last(path);
    const existingGroup = groups.find(g => g.id === id);
    if (type_guards_1.isWaffleMapGroupWithGroups(existingGroup)) {
        return existingGroup;
    }
    return {
        id,
        name: id === '__all__'
            ? i18n_1.i18n.translate('xpack.infra.nodesToWaffleMap.groupsWithGroups.allName', {
                defaultMessage: 'All',
            })
            : (lastPath && lastPath.label) || 'Unknown Group',
        count: 0,
        width: 0,
        squareSize: 0,
        groups: [],
    };
}
function createWaffleMapNode(node) {
    const nodePathItem = lodash_1.last(node.path);
    if (!nodePathItem) {
        throw new Error('There must be at least one node path item');
    }
    return {
        pathId: node.path.map(p => p.value).join('/'),
        path: node.path,
        id: nodePathItem.value,
        ip: nodePathItem.ip,
        name: nodePathItem.label || nodePathItem.value,
        metric: node.metric,
    };
}
exports.createWaffleMapNode = createWaffleMapNode;
function withoutGroup(group) {
    return (subject) => {
        return subject.id !== group.id;
    };
}
function nodesToWaffleMap(nodes) {
    return nodes.reduce((groups, node) => {
        const waffleNode = createWaffleMapNode(node);
        if (node.path.length === 2) {
            const parentGroup = findOrCreateGroupWithNodes(groups, node.path.slice(0, node.path.length - 1));
            parentGroup.nodes.push(waffleNode);
            return groups.filter(withoutGroup(parentGroup)).concat([parentGroup]);
        }
        if (node.path.length === 3) {
            const parentGroup = findOrCreateGroupWithNodes(groups, node.path.slice(0, node.path.length - 1));
            parentGroup.nodes.push(waffleNode);
            const topGroup = findOrCreateGroupWithGroups(groups, node.path.slice(0, node.path.length - 2));
            topGroup.groups = topGroup.groups.filter(withoutGroup(parentGroup)).concat([parentGroup]);
            return groups.filter(withoutGroup(topGroup)).concat([topGroup]);
        }
        const allGroup = findOrCreateGroupWithNodes(groups, []);
        allGroup.nodes.push(waffleNode);
        return groups.filter(withoutGroup(allGroup)).concat([allGroup]);
    }, []);
}
exports.nodesToWaffleMap = nodesToWaffleMap;
