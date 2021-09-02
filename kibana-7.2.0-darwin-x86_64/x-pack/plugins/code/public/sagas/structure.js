"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const redux_saga_1 = require("redux-saga");
const effects_1 = require("redux-saga/effects");
const lsp_client_1 = require("../../common/lsp_client");
const actions_1 = require("../actions");
const lsp_error_codes_1 = require("../../common/lsp_error_codes");
const language_server_1 = require("../actions/language_server");
const symbol_utils_1 = require("../utils/symbol_utils");
const STRUCTURE_TREE_POLLING_INTERVAL_SEC = 3;
const SPECIAL_SYMBOL_NAME = '{...}';
const SPECIAL_CONTAINER_NAME = '';
const sortSymbol = (a, b) => {
    const lineDiff = a.location.range.start.line - b.location.range.start.line;
    if (lineDiff === 0) {
        return a.location.range.start.character - b.location.range.start.character;
    }
    else {
        return lineDiff;
    }
};
const generateStructureTree = symbols => {
    const structureTree = [];
    function findContainer(tree, containerName) {
        if (containerName === undefined) {
            return undefined;
        }
        const result = tree.find((s) => {
            return symbol_utils_1.matchContainerName(containerName, s.name);
        });
        if (result) {
            return result;
        }
        else {
            // TODO: Use Array.flat once supported
            const subTree = tree.reduce((s, t) => (t.members ? s.concat(t.members) : s), []);
            if (subTree.length > 0) {
                return findContainer(subTree, containerName);
            }
            else {
                return undefined;
            }
        }
    }
    symbols
        .sort(sortSymbol)
        .forEach((s, index, arr) => {
        let container;
        /**
         * For Enum class in Java, the container name and symbol name that LSP gives are special.
         * For more information, see https://github.com/elastic/codesearch/issues/580
         */
        if (s.containerName === SPECIAL_CONTAINER_NAME) {
            container = _.findLast(arr.slice(0, index), (sy) => sy.name === SPECIAL_SYMBOL_NAME);
        }
        else {
            container = findContainer(structureTree, s.containerName);
        }
        if (container) {
            if (!container.path) {
                container.path = container.name;
            }
            if (container.members) {
                container.members.push({ ...s, path: `${container.path}/${s.name}` });
            }
            else {
                container.members = [{ ...s, path: `${container.path}/${s.name}` }];
            }
        }
        else {
            structureTree.push({ ...s, path: s.name });
        }
    });
    return structureTree;
};
function requestStructure(uri) {
    const lspClient = new lsp_client_1.LspRestClient('/api/code/lsp');
    const lspMethods = new lsp_client_1.TextDocumentMethods(lspClient);
    return lspMethods.documentSymbol.send({
        textDocument: {
            uri: uri || '',
        },
    });
}
function* beginPollingSymbols(action) {
    try {
        const pollingTaskId = yield effects_1.fork(pollingSaga, action);
        yield effects_1.take([String(actions_1.loadStructureSuccess), String(actions_1.loadStructureFailed)]);
        yield effects_1.cancel(pollingTaskId);
    }
    catch (err) {
        yield effects_1.put(actions_1.loadStructureFailed(err));
    }
}
function* watchLoadStructure() {
    yield effects_1.takeEvery(String(actions_1.loadStructure), beginPollingSymbols);
}
exports.watchLoadStructure = watchLoadStructure;
function* pollingSaga(action) {
    while (true) {
        try {
            const data = yield effects_1.call(requestStructure, `git:/${action.payload}`);
            const structureTree = generateStructureTree(data);
            yield effects_1.put(actions_1.loadStructureSuccess({ path: action.payload, data, structureTree }));
        }
        catch (e) {
            if (e.code && e.code === lsp_error_codes_1.ServerNotInitialized) {
                yield effects_1.put(language_server_1.languageServerInitializing());
                yield redux_saga_1.delay(STRUCTURE_TREE_POLLING_INTERVAL_SEC * 1000);
            }
            else {
                yield effects_1.put(actions_1.loadStructureFailed(e));
            }
        }
    }
}
