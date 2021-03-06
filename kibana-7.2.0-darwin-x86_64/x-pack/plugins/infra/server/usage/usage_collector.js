"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../graphql/types");
const KIBANA_REPORTING_TYPE = 'infraops';
class UsageCollector {
    static getUsageCollector(server) {
        const { collectorSet } = server.usage;
        return collectorSet.makeUsageCollector({
            type: KIBANA_REPORTING_TYPE,
            isReady: () => true,
            fetch: async () => {
                return this.getReport();
            },
        });
    }
    static countNode(nodeType) {
        const bucket = this.getBucket();
        this.maybeInitializeBucket(bucket);
        switch (nodeType) {
            case types_1.InfraNodeType.pod:
                this.counters[bucket].infraopsKubernetes += 1;
                break;
            case types_1.InfraNodeType.container:
                this.counters[bucket].infraopsDocker += 1;
                break;
            default:
                this.counters[bucket].infraopsHosts += 1;
        }
    }
    static countLogs() {
        const bucket = this.getBucket();
        this.maybeInitializeBucket(bucket);
        this.counters[bucket].logs += 1;
    }
    static getBucket() {
        const now = Math.floor(Date.now() / 1000);
        return now - (now % this.BUCKET_SIZE);
    }
    static maybeInitializeBucket(bucket) {
        if (!this.counters[bucket]) {
            this.counters[bucket] = {
                infraopsHosts: 0,
                infraopsDocker: 0,
                infraopsKubernetes: 0,
                logs: 0,
            };
        }
    }
    static getReport() {
        const keys = Object.keys(this.counters);
        // only keep the newest BUCKET_NUMBER buckets
        const cutoff = this.getBucket() - this.BUCKET_SIZE * (this.BUCKET_NUMBER - 1);
        keys.forEach(key => {
            if (parseInt(key, 10) < cutoff) {
                delete this.counters[key];
            }
        });
        // all remaining buckets are current
        const sums = Object.keys(this.counters).reduce((a, b) => {
            const key = parseInt(b, 10);
            return {
                infraopsHosts: a.infraopsHosts + this.counters[key].infraopsHosts,
                infraopsDocker: a.infraopsDocker + this.counters[key].infraopsDocker,
                infraopsKubernetes: a.infraopsKubernetes + this.counters[key].infraopsKubernetes,
                logs: a.logs + this.counters[key].logs,
            };
        }, {
            infraopsHosts: 0,
            infraopsDocker: 0,
            infraopsKubernetes: 0,
            logs: 0,
        });
        return {
            last_24_hours: {
                hits: {
                    infraops_hosts: sums.infraopsHosts,
                    infraops_docker: sums.infraopsDocker,
                    infraops_kubernetes: sums.infraopsKubernetes,
                    logs: sums.logs,
                },
            },
        };
    }
}
UsageCollector.counters = {};
UsageCollector.BUCKET_SIZE = 3600; // seconds in an hour
UsageCollector.BUCKET_NUMBER = 24; // report the last 24 hours
exports.UsageCollector = UsageCollector;
