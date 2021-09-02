"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const prop_types_1 = tslib_1.__importDefault(require("prop-types"));
const recompose_1 = require("recompose");
const workpad_shortcuts_1 = require("./workpad_shortcuts");
const element_handler_creators_1 = require("../../lib/element_handler_creators");
exports.WorkpadShortcuts = recompose_1.compose(recompose_1.withHandlers(element_handler_creators_1.groupHandlerCreators), recompose_1.withHandlers(element_handler_creators_1.layerHandlerCreators), recompose_1.withHandlers(element_handler_creators_1.basicHandlerCreators), recompose_1.withHandlers(element_handler_creators_1.clipboardHandlerCreators))(workpad_shortcuts_1.WorkpadShortcuts);
exports.WorkpadShortcuts.propTypes = {
    pageId: prop_types_1.default.string.isRequired,
    selectedNodes: prop_types_1.default.arrayOf(prop_types_1.default.object),
    elementLayer: prop_types_1.default.func.isRequired,
    insertNodes: prop_types_1.default.func.isRequired,
    removeNodes: prop_types_1.default.func.isRequired,
    selectToplevelNodes: prop_types_1.default.func.isRequired,
    commit: prop_types_1.default.func.isRequired,
};
