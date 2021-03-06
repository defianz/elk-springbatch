"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
// @ts-ignore not typed yet
const xpack_info_1 = require("plugins/xpack_main/services/xpack_info");
require("ui/autoload/all");
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
// @ts-ignore not typed yet
const management_1 = require("ui/management");
const routes_1 = tslib_1.__importDefault(require("ui/routes"));
const config_schemas_1 = require("../../../common/config_schemas");
const config_schemas_translations_map_1 = require("../../../common/config_schemas_translations_map");
const index_names_1 = require("../../../common/constants/index_names");
const rest_beats_adapter_1 = require("../adapters/beats/rest_beats_adapter");
const rest_config_blocks_adapter_1 = require("../adapters/configuration_blocks/rest_config_blocks_adapter");
const rest_1 = require("../adapters/elasticsearch/rest");
const kibana_framework_adapter_1 = require("../adapters/framework/kibana_framework_adapter");
const axios_rest_api_adapter_1 = require("../adapters/rest_api/axios_rest_api_adapter");
const rest_tags_adapter_1 = require("../adapters/tags/rest_tags_adapter");
const rest_tokens_adapter_1 = require("../adapters/tokens/rest_tokens_adapter");
const beats_1 = require("../beats");
const configuration_blocks_1 = require("../configuration_blocks");
const elasticsearch_1 = require("../elasticsearch");
const tags_1 = require("../tags");
const plugin_1 = require("./../../../common/constants/plugin");
const framework_1 = require("./../framework");
// A super early spot in kibana loading that we can use to hook before most other things
const onKibanaReady = chrome_1.default.dangerouslyGetActiveInjector;
function compose() {
    const api = new axios_rest_api_adapter_1.AxiosRestAPIAdapter(chrome_1.default.getXsrfToken(), chrome_1.default.getBasePath());
    const esAdapter = new rest_1.RestElasticsearchAdapter(api, index_names_1.INDEX_NAMES.BEATS);
    const elasticsearchLib = new elasticsearch_1.ElasticsearchLib(esAdapter);
    const configBlocks = new configuration_blocks_1.ConfigBlocksLib(new rest_config_blocks_adapter_1.RestConfigBlocksAdapter(api), config_schemas_translations_map_1.translateConfigSchema(config_schemas_1.configBlockSchemas));
    const tags = new tags_1.TagsLib(new rest_tags_adapter_1.RestTagsAdapter(api), elasticsearchLib);
    const tokens = new rest_tokens_adapter_1.RestTokensAdapter(api);
    const beats = new beats_1.BeatsLib(new rest_beats_adapter_1.RestBeatsAdapter(api), elasticsearchLib);
    const framework = new framework_1.FrameworkLib(new kibana_framework_adapter_1.KibanaFrameworkAdapter(lodash_1.camelCase(plugin_1.PLUGIN.ID), management_1.management, routes_1.default, chrome_1.default.getBasePath, onKibanaReady, xpack_info_1.XPackInfoProvider, chrome_1.default.getKibanaVersion()));
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
