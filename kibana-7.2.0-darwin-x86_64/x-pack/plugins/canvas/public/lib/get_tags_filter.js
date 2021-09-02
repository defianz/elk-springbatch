"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const lodash_1 = require("lodash");
const tag_1 = require("../components/tag");
const get_id_1 = require("./get_id");
const tags_registry_1 = require("./tags_registry");
// EUI helper function
// generates the FieldValueSelectionFilter object for EuiSearchBar for tag filtering
exports.getTagsFilter = (type) => {
    const uniqueTags = lodash_1.sortBy(Object.values(tags_registry_1.tagsRegistry.toJS()), 'name');
    return {
        type: 'field_value_selection',
        field: 'tag',
        name: 'Tags',
        multiSelect: true,
        options: uniqueTags.map(({ name, color }) => ({
            value: name,
            name,
            view: (react_1.default.createElement("div", null,
                react_1.default.createElement(tag_1.Tag, { key: get_id_1.getId('tag'), color: color, name: name, type: type }))),
        })),
    };
};
