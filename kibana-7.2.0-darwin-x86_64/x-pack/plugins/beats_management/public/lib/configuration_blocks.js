"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const js_yaml_1 = tslib_1.__importDefault(require("js-yaml"));
const lodash_1 = require("lodash");
class ConfigBlocksLib {
    constructor(adapter, configSchemas) {
        this.adapter = adapter;
        this.configSchemas = configSchemas;
        this.delete = this.adapter.delete.bind(this.adapter);
        this.upsert = async (blocks) => {
            return await this.adapter.upsert(this.userConfigsToJson(blocks));
        };
        this.getForTags = async (tagIds, page) => {
            const result = await this.adapter.getForTags(tagIds, page);
            result.list = this.jsonConfigToUserYaml(result.list);
            return result;
        };
    }
    jsonConfigToUserYaml(blocks) {
        // configuration_blocks yaml, JS cant read YAML so we parse it into JS,
        // because beats flattens all fields, and we need more structure.
        // we take tagConfigs, grab the config that applies here, render what we can into
        // an object, and the rest we assume to be the yaml string that goes
        // into the yaml editor...
        // NOTE: The perk of this, is that as we support more features via controls
        // vs yaml editing, it should "just work", and things that were in YAML
        // will now be in the UI forms...
        return blocks.map(block => {
            const { type, config } = block;
            const thisConfigSchema = this.configSchemas.find(conf => conf.id === type);
            const thisConfigBlockSchema = thisConfigSchema ? thisConfigSchema.configs : null;
            if (!thisConfigBlockSchema) {
                throw new Error('No config block schema ');
            }
            const knownConfigIds = thisConfigBlockSchema.map(schema => schema.id);
            const convertedConfig = knownConfigIds.reduce((blockObj, configKey, index) => {
                const unhydratedKey = knownConfigIds[index];
                lodash_1.set(blockObj, configKey, lodash_1.get(config, unhydratedKey));
                return blockObj;
            }, thisConfigSchema && thisConfigSchema.allowOtherConfigs
                ? { other: js_yaml_1.default.safeDump(lodash_1.omit(config, knownConfigIds)) }
                : {});
            // Workaround to empty object passed into dump resulting in this odd output
            if (convertedConfig.other && convertedConfig.other === '{}\n') {
                convertedConfig.other = '';
            }
            return {
                ...block,
                config: convertedConfig,
            };
        });
    }
    userConfigsToJson(blocks) {
        // configurations is the JS representation of the config yaml,
        // so here we take that JS and convert it into a YAML string.
        // we do so while also flattening "other" into the flat yaml beats expect
        return blocks.map(block => {
            const { type, config } = block;
            const thisConfigSchema = this.configSchemas.find(conf => conf.id === type);
            const thisConfigBlockSchema = thisConfigSchema ? thisConfigSchema.configs : null;
            if (!thisConfigBlockSchema) {
                throw new Error('No config block schema ');
            }
            const knownConfigIds = thisConfigBlockSchema
                .map((schema) => schema.id)
                .filter((id) => id !== 'other');
            const picked = this.pickDeep(config, knownConfigIds);
            let other = js_yaml_1.default.safeLoad(config.other || '{}');
            if (typeof other === 'string') {
                other = {
                    [other]: '',
                };
            }
            const convertedConfig = {
                ...other,
                ...picked,
            };
            return {
                ...block,
                config: convertedConfig,
            };
        });
    }
    pickDeep(obj, keys) {
        const copy = {};
        keys.forEach(key => {
            if (lodash_1.has(obj, key)) {
                const val = lodash_1.get(obj, key);
                lodash_1.set(copy, key, val);
            }
        });
        return copy;
    }
}
exports.ConfigBlocksLib = ConfigBlocksLib;
