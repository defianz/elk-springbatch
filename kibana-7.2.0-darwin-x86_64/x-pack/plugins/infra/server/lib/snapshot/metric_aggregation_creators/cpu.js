"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../../graphql/types");
const FIELDS = {
    [types_1.InfraNodeType.host]: 'system.cpu.user.pct',
    [types_1.InfraNodeType.pod]: 'kubernetes.pod.cpu.usage.node.pct',
    [types_1.InfraNodeType.container]: 'docker.cpu.total.pct',
};
exports.cpu = (nodeType) => {
    if (nodeType === types_1.InfraNodeType.host) {
        return {
            cpu_user: {
                avg: {
                    field: 'system.cpu.user.pct',
                },
            },
            cpu_system: {
                avg: {
                    field: 'system.cpu.system.pct',
                },
            },
            cpu_cores: {
                max: {
                    field: 'system.cpu.cores',
                },
            },
            cpu: {
                bucket_script: {
                    buckets_path: {
                        user: 'cpu_user',
                        system: 'cpu_system',
                        cores: 'cpu_cores',
                    },
                    script: {
                        source: '(params.user + params.system) / params.cores',
                        lang: 'painless',
                    },
                    gap_policy: 'skip',
                },
            },
        };
    }
    else {
        return {
            cpu: {
                avg: {
                    field: FIELDS[nodeType],
                },
            },
        };
    }
};
