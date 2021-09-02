"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class AbstractSuggestionsProvider {
    constructor() {
        this.MAX_SUGGESTIONS_PER_GROUP = 5;
    }
    async getSuggestions(query, scope, repoScope) {
        if (this.matchSearchScope(scope)) {
            return await this.fetchSuggestions(query, repoScope);
        }
        else {
            // This is an abstract class. Do nothing here. You should override this.
            return new Promise((resolve, reject) => {
                resolve({
                    type: _1.AutocompleteSuggestionType.SYMBOL,
                    total: 0,
                    hasMore: false,
                    suggestions: [],
                });
            });
        }
    }
    async fetchSuggestions(query, repoScope) {
        // This is an abstract class. Do nothing here. You should override this.
        return new Promise((resolve, reject) => {
            resolve({
                type: _1.AutocompleteSuggestionType.SYMBOL,
                total: 0,
                hasMore: false,
                suggestions: [],
            });
        });
    }
    matchSearchScope(scope) {
        return true;
    }
}
exports.AbstractSuggestionsProvider = AbstractSuggestionsProvider;
