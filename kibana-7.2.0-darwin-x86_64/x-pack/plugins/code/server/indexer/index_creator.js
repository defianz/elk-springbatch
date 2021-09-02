"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const version_json_1 = tslib_1.__importDefault(require("./schema/version.json"));
/*
 * This IndexCreator deals with anything with elasticsearch index creation.
 */
class IndexCreator {
    constructor(client) {
        this.client = client;
        this.version = Number(version_json_1.default.codeIndexVersion);
    }
    async createIndex(request) {
        const body = {
            settings: request.settings,
            mappings: {
                // Apply the index version in the reserved _meta field of the index.
                _meta: {
                    version: this.version,
                },
                dynamic_templates: [
                    {
                        fieldDefaultNotAnalyzed: {
                            match: '*',
                            mapping: {
                                index: false,
                                norms: false,
                            },
                        },
                    },
                ],
                properties: request.schema,
            },
        };
        const exists = await this.client.indices.existsAlias({
            name: request.index,
        });
        if (!exists) {
            // Create the actual index first with the version as the index suffix number.
            await this.client.indices.create({
                index: `${request.index}-${this.version}`,
                body,
            });
            // Create the alias to point the index just created.
            await this.client.indices.putAlias({
                index: `${request.index}-${this.version}`,
                name: request.index,
            });
            return true;
        }
        return exists;
    }
}
exports.IndexCreator = IndexCreator;
