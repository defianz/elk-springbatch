"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const react_1 = require("@storybook/react");
const react_2 = tslib_1.__importDefault(require("react"));
const tag_list_1 = require("../tag_list");
const mockTagRegistry = {
    tag1: {
        name: 'tag1',
        color: '#cc3b54',
    },
    tag2: {
        name: 'tag2',
        color: '#5bc149',
    },
    tag3: {
        name: 'tag3',
        color: '#fbc545',
    },
    tag4: {
        name: 'tag4',
        color: '#9b3067',
    },
    tag5: {
        name: 'tag5',
        color: '#1819bd',
    },
    tag6: {
        name: 'tag6',
        color: '#d41e93',
    },
    tag7: {
        name: 'tag7',
        color: '#3486d2',
    },
    tag8: {
        name: 'tag8',
        color: '#b870d8',
    },
    tag9: {
        name: 'tag9',
        color: '#f4a4a7',
    },
    tag10: {
        name: 'tag10',
        color: '#072d6d',
    },
};
const getTag = (name) => mockTagRegistry[name] || { name, color: '#666666' };
react_1.storiesOf('components/TagList', module)
    .add('empty list', () => react_2.default.createElement(tag_list_1.TagList, { getTag: getTag }))
    .add('with health tags', () => react_2.default.createElement(tag_list_1.TagList, { tags: ['tag1', 'tag4', 'tag6'], getTag: getTag }))
    .add('with badge tags', () => (react_2.default.createElement(tag_list_1.TagList, { tags: ['tag1', 'tag2', 'tag3'], getTag: getTag, tagType: "badge" })))
    .add('with lots of tags', () => (react_2.default.createElement(tag_list_1.TagList, { tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7', 'tag8', 'tag9', 'tag10'], getTag: getTag, tagType: "badge" })));
