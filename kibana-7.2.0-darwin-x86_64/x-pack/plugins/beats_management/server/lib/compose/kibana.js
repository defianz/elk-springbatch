"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const constants_1 = require("../../../common/constants");
const plugin_1 = require("../../../common/constants/plugin");
const elasticsearch_beats_adapter_1 = require("../adapters/beats/elasticsearch_beats_adapter");
const elasticsearch_configuration_block_adapter_1 = require("../adapters/configuration_blocks/elasticsearch_configuration_block_adapter");
const kibana_database_adapter_1 = require("../adapters/database/kibana_database_adapter");
const elasticsearch_beat_events_adapter_1 = require("../adapters/events/elasticsearch_beat_events_adapter");
const kibana_framework_adapter_1 = require("../adapters/framework/kibana_framework_adapter");
const elasticsearch_tags_adapter_1 = require("../adapters/tags/elasticsearch_tags_adapter");
const elasticsearch_tokens_adapter_1 = require("../adapters/tokens/elasticsearch_tokens_adapter");
const beat_events_1 = require("../beat_events");
const beats_1 = require("../beats");
const configuration_blocks_1 = require("../configuration_blocks");
const tags_1 = require("../tags");
const tokens_1 = require("../tokens");
const framework_1 = require("./../framework");
function compose(server) {
    const framework = new framework_1.BackendFrameworkLib(new kibana_framework_adapter_1.KibanaBackendFrameworkAdapter(lodash_1.camelCase(constants_1.PLUGIN.ID), server, plugin_1.CONFIG_PREFIX));
    const database = new kibana_database_adapter_1.KibanaDatabaseAdapter(server.plugins.elasticsearch);
    const beatsAdapter = new elasticsearch_beats_adapter_1.ElasticsearchBeatsAdapter(database);
    const configAdapter = new elasticsearch_configuration_block_adapter_1.ElasticsearchConfigurationBlockAdapter(database);
    const tags = new tags_1.CMTagsDomain(new elasticsearch_tags_adapter_1.ElasticsearchTagsAdapter(database), configAdapter, beatsAdapter);
    const configurationBlocks = new configuration_blocks_1.ConfigurationBlocksLib(configAdapter, tags);
    const tokens = new tokens_1.CMTokensDomain(new elasticsearch_tokens_adapter_1.ElasticsearchTokensAdapter(database), {
        framework,
    });
    const beats = new beats_1.CMBeatsDomain(beatsAdapter, {
        tags,
        tokens,
        framework,
    });
    const beatEvents = new beat_events_1.BeatEventsLib(new elasticsearch_beat_events_adapter_1.ElasticsearchBeatEventsAdapter(database), beats);
    const libs = {
        beatEvents,
        framework,
        database,
        beats,
        tags,
        tokens,
        configurationBlocks,
    };
    return libs;
}
exports.compose = compose;
