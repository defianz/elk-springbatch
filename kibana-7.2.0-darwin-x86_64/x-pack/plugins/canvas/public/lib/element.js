"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const default_header_png_1 = tslib_1.__importDefault(require("./default_header.png"));
const tags_registry_1 = require("./tags_registry");
class Element {
    constructor(config) {
        const { name, image, displayName, tags, expression, filter, help, width, height } = config;
        this.name = name;
        this.displayName = displayName || name;
        this.image = image || default_header_png_1.default;
        this.help = help || '';
        if (!config.expression) {
            throw new Error('Element types must have a default expression');
        }
        this.tags = tags || [];
        this.tags.forEach(tag => {
            if (!tags_registry_1.tagsRegistry.get(tag)) {
                tags_registry_1.tagsRegistry.register(() => ({ name: tag, color: '#666666' }));
            }
        });
        this.expression = expression;
        this.filter = filter;
        this.width = width || 500;
        this.height = height || 300;
    }
}
exports.Element = Element;
