"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var auditbeat_1 = require("./auditbeat");
exports.auditbeatSchema = auditbeat_1.auditbeatSchema;
var filebeat_1 = require("./filebeat");
exports.filebeatSchema = filebeat_1.filebeatSchema;
var packetbeat_1 = require("./packetbeat");
exports.packetbeatSchema = packetbeat_1.packetbeatSchema;
var winlogbeat_1 = require("./winlogbeat");
exports.winlogbeatSchema = winlogbeat_1.winlogbeatSchema;
var ecs_1 = require("./ecs");
exports.ecsSchema = ecs_1.ecsSchema;
exports.extraSchemaField = {
    _id: {
        description: 'Each document has an _id that uniquely identifies it',
        example: 'Y-6TfmcB0WOhS6qyMv3s',
        footnote: '',
        group: 1,
        level: 'core',
        name: '_id',
        required: true,
        type: 'keyword',
    },
    _index: {
        description: 'An index is like a ‘database’ in a relational database. It has a mapping which defines multiple types. An index is a logical namespace which maps to one or more primary shards and can have zero or more replica shards.',
        example: 'auditbeat-8.0.0-2019.02.19-000001',
        footnote: '',
        group: 1,
        level: 'core',
        name: '_index',
        required: true,
        type: 'keyword',
    },
};
exports.baseCategoryFields = ['@timestamp', 'labels', 'message', 'tags'];
