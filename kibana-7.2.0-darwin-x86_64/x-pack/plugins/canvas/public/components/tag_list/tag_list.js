"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const react_1 = tslib_1.__importStar(require("react"));
const prop_types_1 = tslib_1.__importDefault(require("prop-types"));
const get_id_1 = require("../../lib/get_id");
const tag_1 = require("../tag");
exports.TagList = ({ tags = [], tagType = 'health', getTag }) => (react_1.default.createElement(react_1.Fragment, null, tags.length
    ? tags.map((tag) => {
        const { color, name } = getTag(tag);
        const id = get_id_1.getId('tag');
        return react_1.default.createElement(tag_1.Tag, { key: id, color: color, name: name, type: tagType });
    })
    : null));
exports.TagList.propTypes = {
    tags: prop_types_1.default.array,
    tagType: prop_types_1.default.oneOf(['health', 'badge']),
    getTag: prop_types_1.default.func.isRequired,
};
