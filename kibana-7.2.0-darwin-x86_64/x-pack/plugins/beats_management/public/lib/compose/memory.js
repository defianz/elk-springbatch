"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("ui/autoload/all");
// @ts-ignore: path dynamic for kibana
const management_1 = require("ui/management");
// @ts-ignore: path dynamic for kibana
const modules_1 = require("ui/modules");
// @ts-ignore: path dynamic for kibana
const routes_1 = tslib_1.__importDefault(require("ui/routes"));
const config_schemas_1 = require("../../../common/config_schemas");
const config_schemas_translations_map_1 = require("../../../common/config_schemas_translations_map");
// @ts-ignore: path dynamic for kibana
const memory_beats_adapter_1 = require("../adapters/beats/memory_beats_adapter");
const kibana_framework_adapter_1 = require("../adapters/framework/kibana_framework_adapter");
const memory_tags_adapter_1 = require("../adapters/tags/memory_tags_adapter");
const memory_tokens_adapter_1 = require("../adapters/tokens/memory_tokens_adapter");
const beats_1 = require("../beats");
const configuration_blocks_1 = require("../configuration_blocks");
const framework_1 = require("../framework");
const tags_1 = require("../tags");
const memory_1 = require("./../adapters/elasticsearch/memory");
const elasticsearch_1 = require("./../elasticsearch");
const onKibanaReady = modules_1.uiModules.get('kibana').run;
function compose(mockIsKueryValid, mockKueryToEsQuery, suggestions) {
    const esAdapter = new memory_1.MemoryElasticsearchAdapter(mockIsKueryValid, mockKueryToEsQuery, suggestions);
    const elasticsearchLib = new elasticsearch_1.ElasticsearchLib(esAdapter);
    const configBlocks = new configuration_blocks_1.ConfigBlocksLib({}, config_schemas_translations_map_1.translateConfigSchema(config_schemas_1.configBlockSchemas));
    const tags = new tags_1.TagsLib(new memory_tags_adapter_1.MemoryTagsAdapter([]), elasticsearchLib);
    const tokens = new memory_tokens_adapter_1.MemoryTokensAdapter();
    const beats = new beats_1.BeatsLib(new memory_beats_adapter_1.MemoryBeatsAdapter([]), elasticsearchLib);
    const pluginUIModule = modules_1.uiModules.get('app/beats_management');
    const framework = new framework_1.FrameworkLib(new kibana_framework_adapter_1.KibanaFrameworkAdapter(pluginUIModule, management_1.management, routes_1.default, () => '', onKibanaReady, null, '7.0.0'));
    const libs = {
        framework,
        elasticsearch: elasticsearchLib,
        tags,
        tokens,
        beats,
        configBlocks,
    };
    return libs;
}
exports.compose = compose;
