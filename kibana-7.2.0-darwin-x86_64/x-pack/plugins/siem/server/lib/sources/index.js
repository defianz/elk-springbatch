"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var configuration_1 = require("./configuration");
exports.ConfigurationSourcesAdapter = configuration_1.ConfigurationSourcesAdapter;
class Sources {
    constructor(adapter) {
        this.adapter = adapter;
    }
    async getConfiguration(sourceId) {
        const sourceConfigurations = await this.getAllConfigurations();
        const requestedSourceConfiguration = sourceConfigurations[sourceId];
        if (!requestedSourceConfiguration) {
            throw new Error(`Failed to find source '${sourceId}'`);
        }
        return requestedSourceConfiguration;
    }
    getAllConfigurations() {
        return this.adapter.getAll();
    }
}
exports.Sources = Sources;
