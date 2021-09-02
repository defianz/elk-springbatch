"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aliases = exports.visTypeEnhancers = exports.interpreter = exports.visualize = exports.shareContextMenuExtensions = exports.search = exports.inspectorViews = exports.canvas = exports.home = exports.hacks = exports.docViews = exports.devTools = exports.indexManagement = exports.managementSections = exports.navbarExtensions = exports.chromeNavControls = exports.fieldFormatEditors = exports.fieldFormats = exports.contextMenuActions = exports.embeddableFactories = exports.savedObjectTypes = exports.autocompleteProviders = exports.visEditorTypes = exports.visRequestHandlers = exports.visResponseHandlers = exports.visTypes = void 0;

var _reduce = require("./reduce");

var _modify_reduce = require("./modify_reduce");

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 *  Reducer "preset" that merges named "first-class" appExtensions by
 *  converting them into objects and then concatenating the values of those objects
 *  @type {Function}
 */
const appExtension = (0, _modify_reduce.wrap)((0, _modify_reduce.mapSpec)((spec, type) => ({
  [type]: spec
})), (0, _modify_reduce.alias)('appExtensions'), _reduce.flatConcatValuesAtType); // plain extension groups produce lists of modules that will be required by the entry
// files to include extensions of specific types into specific apps

const visTypes = appExtension;
exports.visTypes = visTypes;
const visResponseHandlers = appExtension;
exports.visResponseHandlers = visResponseHandlers;
const visRequestHandlers = appExtension;
exports.visRequestHandlers = visRequestHandlers;
const visEditorTypes = appExtension;
exports.visEditorTypes = visEditorTypes;
const autocompleteProviders = appExtension;
exports.autocompleteProviders = autocompleteProviders;
const savedObjectTypes = appExtension;
exports.savedObjectTypes = savedObjectTypes;
const embeddableFactories = appExtension;
exports.embeddableFactories = embeddableFactories;
const contextMenuActions = appExtension;
exports.contextMenuActions = contextMenuActions;
const fieldFormats = appExtension;
exports.fieldFormats = fieldFormats;
const fieldFormatEditors = appExtension;
exports.fieldFormatEditors = fieldFormatEditors;
const chromeNavControls = appExtension;
exports.chromeNavControls = chromeNavControls;
const navbarExtensions = appExtension;
exports.navbarExtensions = navbarExtensions;
const managementSections = appExtension;
exports.managementSections = managementSections;
const indexManagement = appExtension;
exports.indexManagement = indexManagement;
const devTools = appExtension;
exports.devTools = devTools;
const docViews = appExtension;
exports.docViews = docViews;
const hacks = appExtension;
exports.hacks = hacks;
const home = appExtension;
exports.home = home;
const canvas = appExtension;
exports.canvas = canvas;
const inspectorViews = appExtension;
exports.inspectorViews = inspectorViews;
const search = appExtension;
exports.search = search;
const shareContextMenuExtensions = appExtension; // Add a visualize app extension that should be used for visualize specific stuff

exports.shareContextMenuExtensions = shareContextMenuExtensions;
const visualize = appExtension;
exports.visualize = visualize;
const interpreter = appExtension; // aliases visTypeEnhancers to the visTypes group

exports.interpreter = interpreter;
const visTypeEnhancers = (0, _modify_reduce.wrap)((0, _modify_reduce.alias)('visTypes'), appExtension); // adhoc extension groups can define new extension groups on the fly
// so that plugins could concat their own

exports.visTypeEnhancers = visTypeEnhancers;
const aliases = _reduce.flatConcatValuesAtType;
exports.aliases = aliases;