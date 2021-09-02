"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const recompose_1 = require("recompose");
const tags_registry_1 = require("../../lib/tags_registry");
const tag_list_1 = require("./tag_list");
exports.TagList = recompose_1.compose(recompose_1.withProps(() => ({
    getTag: (tag) => tags_registry_1.tagsRegistry.get(tag) || { name: tag, color: undefined },
})))(tag_list_1.TagList);
