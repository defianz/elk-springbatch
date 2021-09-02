"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var elasticsearch_adapter_1 = require("./elasticsearch_adapter");
exports.ElasticsearchIndexFieldAdapter = elasticsearch_adapter_1.ElasticsearchIndexFieldAdapter;
class IndexFields {
    constructor(adapter) {
        this.adapter = adapter;
    }
    async getFields(request, defaultIndex) {
        return this.adapter.getIndexFields(request, defaultIndex);
    }
}
exports.IndexFields = IndexFields;
