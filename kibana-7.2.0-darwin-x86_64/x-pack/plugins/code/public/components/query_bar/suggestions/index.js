"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./suggestions_provider"), exports);
tslib_1.__exportStar(require("./symbol_suggestions_provider"), exports);
tslib_1.__exportStar(require("./file_suggestions_provider"), exports);
tslib_1.__exportStar(require("./repository_suggestions_provider"), exports);
var AutocompleteSuggestionType;
(function (AutocompleteSuggestionType) {
    AutocompleteSuggestionType["SYMBOL"] = "symbol";
    AutocompleteSuggestionType["FILE"] = "file";
    AutocompleteSuggestionType["REPOSITORY"] = "repository";
})(AutocompleteSuggestionType = exports.AutocompleteSuggestionType || (exports.AutocompleteSuggestionType = {}));
