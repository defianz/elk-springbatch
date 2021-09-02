"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockDetailItemDataId = 'Y-6TfmcB0WOhS6qyMv3s';
exports.mockDetailItemData = [
    {
        category: '_id',
        description: 'Each document has an _id that uniquely identifies it',
        example: 'Y-6TfmcB0WOhS6qyMv3s',
        field: '_id',
        type: 'keyword',
        originalValue: 'pEMaMmkBUV60JmNWmWVi',
        values: ['pEMaMmkBUV60JmNWmWVi'],
    },
    {
        category: '_index',
        description: 'An index is like a ‘database’ in a relational database. It has a mapping which defines multiple types. An index is a logical namespace which maps to one or more primary shards and can have zero or more replica shards.',
        example: 'auditbeat-8.0.0-2019.02.19-000001',
        field: '_index',
        type: 'keyword',
        originalValue: 'filebeat-8.0.0-2019.02.19-000001',
        values: ['filebeat-8.0.0-2019.02.19-000001'],
    },
    {
        category: '_type',
        description: null,
        example: null,
        field: '_type',
        type: 'keyword',
        originalValue: '_doc',
        values: ['_doc'],
    },
    {
        category: '_score',
        description: null,
        example: null,
        field: '_score',
        type: 'long',
        originalValue: 1,
        values: ['1'],
    },
    {
        category: '@timestamp',
        description: 'Date/time when the event originated.For log events this is the date/time when the event was generated, and not when it was read.Required field for all events.',
        example: '2016-05-23T08:05:34.853Z',
        field: '@timestamp',
        type: 'date',
        originalValue: '2019-02-28T16:50:54.621Z',
        values: ['2019-02-28T16:50:54.621Z'],
    },
    {
        category: 'agent',
        description: 'Ephemeral identifier of this agent (if one exists).This id normally changes across restarts, but `agent.id` does not.',
        example: '8a4f500f',
        field: 'agent.ephemeral_id',
        type: 'keyword',
        originalValue: '9d391ef2-a734-4787-8891-67031178c641',
        values: ['9d391ef2-a734-4787-8891-67031178c641'],
    },
    {
        category: 'agent',
        description: null,
        example: null,
        field: 'agent.hostname',
        type: 'keyword',
        originalValue: 'siem-kibana',
        values: ['siem-kibana'],
    },
    {
        category: 'agent',
        description: 'Unique identifier of this agent (if one exists).Example: For Beats this would be beat.id.',
        example: '8a4f500d',
        field: 'agent.id',
        type: 'keyword',
        originalValue: '5de03d5f-52f3-482e-91d4-853c7de073c3',
        values: ['5de03d5f-52f3-482e-91d4-853c7de073c3'],
    },
    {
        category: 'agent',
        description: 'Type of the agent.The agent type stays always the same and should be given by the agent used. In case of Filebeat the agent would always be Filebeat also if two Filebeat instances are run on the same machine.',
        example: 'filebeat',
        field: 'agent.type',
        type: 'keyword',
        originalValue: 'filebeat',
        values: ['filebeat'],
    },
    {
        category: 'agent',
        description: 'Version of the agent.',
        example: '6.0.0-rc2',
        field: 'agent.version',
        type: 'keyword',
        originalValue: '8.0.0',
        values: ['8.0.0'],
    },
    {
        category: 'cloud',
        description: 'Availability zone in which this host is running.',
        example: 'us-east-1c',
        field: 'cloud.availability_zone',
        type: 'keyword',
        originalValue: 'projects/189716325846/zones/us-east1-b',
        values: ['projects/189716325846/zones/us-east1-b'],
    },
    {
        category: 'cloud',
        description: 'Instance ID of the host machine.',
        example: 'i-1234567890abcdef0',
        field: 'cloud.instance.id',
        type: 'keyword',
        originalValue: '5412578377715150143',
        values: ['5412578377715150143'],
    },
    {
        category: 'cloud',
        description: 'Instance name of the host machine.',
        example: null,
        field: 'cloud.instance.name',
        type: 'keyword',
        originalValue: 'siem-kibana',
        values: ['siem-kibana'],
    },
    {
        category: 'cloud',
        description: 'Machine type of the host machine.',
        example: 't2.medium',
        field: 'cloud.machine.type',
        type: 'keyword',
        originalValue: 'projects/189716325846/machineTypes/n1-standard-1',
        values: ['projects/189716325846/machineTypes/n1-standard-1'],
    },
    {
        category: 'cloud',
        description: null,
        example: null,
        field: 'cloud.project.id',
        type: 'keyword',
        originalValue: 'elastic-beats',
        values: ['elastic-beats'],
    },
    {
        category: 'cloud',
        description: 'Name of the cloud provider. Example values are ec2, gce, or digitalocean.',
        example: 'ec2',
        field: 'cloud.provider',
        type: 'keyword',
        originalValue: 'gce',
        values: ['gce'],
    },
    {
        category: 'destination',
        description: 'Bytes sent from the destination to the source.',
        example: '184',
        field: 'destination.bytes',
        type: 'long',
        originalValue: 584,
        values: ['584'],
    },
    {
        category: 'destination',
        description: 'IP address of the destination.Can be one or multiple IPv4 or IPv6 addresses.',
        example: null,
        field: 'destination.ip',
        type: 'ip',
        originalValue: '10.47.8.200',
        values: ['10.47.8.200'],
    },
    {
        category: 'destination',
        description: 'Packets sent from the destination to the source.',
        example: '12',
        field: 'destination.packets',
        type: 'long',
        originalValue: 4,
        values: ['4'],
    },
    {
        category: 'destination',
        description: 'Port of the destination.',
        example: null,
        field: 'destination.port',
        type: 'long',
        originalValue: 902,
        values: ['902'],
    },
];