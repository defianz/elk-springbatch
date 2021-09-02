"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractSearchClient {
    constructor(client, log) {
        this.client = client;
        this.log = log;
        this.RESULTS_PER_PAGE = 20;
    }
    // For the full search request.
    async search(req) {
        // This is the abstract implementation, you should override this function.
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
    // For the typeahead suggestions request.
    async suggest(req) {
        // This is the abstract implementation, you should override this function.
        // By default, return the same result as search function above.
        return this.search(req);
    }
    getResultsPerPage(req) {
        let resultsPerPage = this.RESULTS_PER_PAGE;
        if (req.resultsPerPage !== undefined) {
            resultsPerPage = req.resultsPerPage;
        }
        return resultsPerPage;
    }
}
exports.AbstractSearchClient = AbstractSearchClient;
