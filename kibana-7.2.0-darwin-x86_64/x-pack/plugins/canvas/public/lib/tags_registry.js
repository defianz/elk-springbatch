"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@kbn/interpreter/common");
const tag_1 = require("./tag");
class TagRegistry extends common_1.Registry {
    wrapper(obj) {
        return new tag_1.Tag(obj);
    }
}
exports.tagsRegistry = new TagRegistry();
