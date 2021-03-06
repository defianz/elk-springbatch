"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const SECTION_LABELS = tslib_1.__importStar(require("../sectionLabels"));
exports.ERROR_METADATA_SECTIONS = [
    {
        key: 'labels',
        label: SECTION_LABELS.LABELS,
        required: true
    },
    {
        key: 'http',
        label: SECTION_LABELS.HTTP
    },
    {
        key: 'host',
        label: SECTION_LABELS.HOST
    },
    {
        key: 'container',
        label: SECTION_LABELS.CONTAINER
    },
    {
        key: 'service',
        label: SECTION_LABELS.SERVICE
    },
    {
        key: 'process',
        label: SECTION_LABELS.PROCESS
    },
    {
        key: 'agent',
        label: SECTION_LABELS.AGENT
    },
    {
        key: 'url',
        label: SECTION_LABELS.URL
    },
    {
        key: 'user',
        label: SECTION_LABELS.USER,
        required: true
    },
    {
        key: 'error.custom',
        label: SECTION_LABELS.CUSTOM
    }
];
