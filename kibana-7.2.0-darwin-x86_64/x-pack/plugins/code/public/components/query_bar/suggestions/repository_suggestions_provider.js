"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const kfetch_1 = require("ui/kfetch");
const _1 = require(".");
const uri_util_1 = require("../../../../common/uri_util");
const model_1 = require("../../../../model");
class RepositorySuggestionsProvider extends _1.AbstractSuggestionsProvider {
    matchSearchScope(scope) {
        return scope === model_1.SearchScope.DEFAULT || scope === model_1.SearchScope.REPOSITORY;
    }
    async fetchSuggestions(query, repoScope) {
        try {
            const queryParams = { q: query };
            if (repoScope && repoScope.length > 0) {
                queryParams.repoScope = repoScope.join(',');
            }
            const res = await kfetch_1.kfetch({
                pathname: `/api/code/suggestions/repo`,
                method: 'get',
                query: queryParams,
            });
            const suggestions = Array.from(res.repositories)
                .slice(0, this.MAX_SUGGESTIONS_PER_GROUP)
                .map((repo) => {
                return {
                    description: repo.url,
                    end: 10,
                    start: 1,
                    text: uri_util_1.toRepoNameWithOrg(repo.uri),
                    tokenType: '',
                    selectUrl: `/${repo.uri}`,
                };
            });
            return {
                type: _1.AutocompleteSuggestionType.REPOSITORY,
                total: res.total,
                hasMore: res.total > this.MAX_SUGGESTIONS_PER_GROUP,
                suggestions,
            };
        }
        catch (error) {
            return {
                type: _1.AutocompleteSuggestionType.REPOSITORY,
                total: 0,
                hasMore: false,
                suggestions: [],
            };
        }
    }
}
exports.RepositorySuggestionsProvider = RepositorySuggestionsProvider;
