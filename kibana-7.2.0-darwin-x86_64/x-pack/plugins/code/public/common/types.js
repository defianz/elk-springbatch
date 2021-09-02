"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../model");
var PathTypes;
(function (PathTypes) {
    PathTypes["blob"] = "blob";
    PathTypes["tree"] = "tree";
    PathTypes["blame"] = "blame";
    PathTypes["commits"] = "commits";
})(PathTypes = exports.PathTypes || (exports.PathTypes = {}));
exports.SearchScopeText = {
    [model_1.SearchScope.DEFAULT]: 'Search Everything',
    [model_1.SearchScope.REPOSITORY]: 'Search Repositories',
    [model_1.SearchScope.SYMBOL]: 'Search Symbols',
    [model_1.SearchScope.FILE]: 'Search Files',
};
exports.SearchScopePlaceholderText = {
    [model_1.SearchScope.DEFAULT]: 'Type to find anything',
    [model_1.SearchScope.REPOSITORY]: 'Type to find repositories',
    [model_1.SearchScope.SYMBOL]: 'Type to find symbols',
    [model_1.SearchScope.FILE]: 'Type to find files',
};
