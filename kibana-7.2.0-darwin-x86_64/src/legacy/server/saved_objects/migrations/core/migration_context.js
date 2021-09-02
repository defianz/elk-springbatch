"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.migrationContext = migrationContext;

var _build_active_mappings = require("./build_active_mappings");

var _elastic_index = require("./elastic_index");

var _migration_logger = require("./migration_logger");

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * The MigrationOpts interface defines the minimum set of data required
 * in order to properly migrate an index. MigrationContext expands this
 * with computed values and values from the index being migrated, and is
 * serves as a central blueprint for what migrations will end up doing.
 */

/**
 * Builds up an uber object which has all of the config options, settings,
 * and various info needed to migrate the source index.
 */
async function migrationContext(opts) {
  const {
    callCluster
  } = opts;
  const log = new _migration_logger.MigrationLogger(opts.log);
  const alias = opts.index;
  const source = createSourceContext((await (0, _elastic_index.fetchInfo)(callCluster, alias)), alias);
  const dest = createDestContext(source, alias, opts.mappingProperties);
  return {
    callCluster,
    alias,
    source,
    dest,
    log,
    batchSize: opts.batchSize,
    documentMigrator: opts.documentMigrator,
    pollInterval: opts.pollInterval,
    scrollDuration: opts.scrollDuration,
    serializer: opts.serializer,
    obsoleteIndexTemplatePattern: opts.obsoleteIndexTemplatePattern
  };
}

function createSourceContext(source, alias) {
  if (source.exists && source.indexName === alias) {
    return { ...source,
      indexName: nextIndexName(alias, alias)
    };
  }

  return source;
}

function createDestContext(source, alias, mappingProperties) {
  const activeMappings = (0, _build_active_mappings.buildActiveMappings)({
    properties: mappingProperties
  });
  return {
    aliases: {},
    exists: false,
    indexName: nextIndexName(source.indexName, alias),
    mappings: { ...activeMappings,
      properties: { ...source.mappings.properties,
        ...activeMappings.properties
      }
    }
  };
}
/**
 * Gets the next index name in a sequence, based on specified current index's info.
 * We're using a numeric counter to create new indices. So, `.kibana_1`, `.kibana_2`, etc
 * There are downsides to this, but it seemed like a simple enough approach.
 */


function nextIndexName(indexName, alias) {
  const indexSuffix = (indexName.match(/[\d]+$/) || [])[0];
  const indexNum = parseInt(indexSuffix, 10) || 0;
  return `${alias}_${indexNum + 1}`;
}