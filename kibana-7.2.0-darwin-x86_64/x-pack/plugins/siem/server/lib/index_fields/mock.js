"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockAuditbeatIndexField = [
    {
        name: '@timestamp',
        searchable: true,
        type: 'date',
        aggregatable: true,
    },
    {
        name: 'agent.ephemeral_id',
        searchable: true,
        type: 'string',
        aggregatable: true,
    },
    {
        name: 'agent.name',
        searchable: true,
        type: 'string',
        aggregatable: true,
    },
    {
        name: 'agent.type',
        searchable: true,
        type: 'string',
        aggregatable: true,
    },
    {
        name: 'agent.version',
        searchable: true,
        type: 'string',
        aggregatable: true,
    },
];
exports.mockFilebeatIndexField = [
    {
        name: '@timestamp',
        searchable: true,
        type: 'date',
        aggregatable: true,
    },
    {
        name: 'agent.hostname',
        searchable: true,
        type: 'string',
        aggregatable: true,
    },
    {
        name: 'agent.name',
        searchable: true,
        type: 'string',
        aggregatable: true,
    },
    {
        name: 'agent.version',
        searchable: true,
        type: 'string',
        aggregatable: true,
    },
];
exports.mockPacketbeatIndexField = [
    {
        name: '@timestamp',
        searchable: true,
        type: 'date',
        aggregatable: true,
    },
    {
        name: 'agent.id',
        searchable: true,
        type: 'string',
        aggregatable: true,
    },
    {
        name: 'agent.type',
        searchable: true,
        type: 'string',
        aggregatable: true,
    },
];
