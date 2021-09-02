"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const joi_1 = tslib_1.__importDefault(require("joi"));
class KibanaConfigurationAdapter {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(server) {
        if (!isServerWithConfig(server)) {
            throw new Error('Failed to find configuration on server.');
        }
        this.server = server;
    }
    async get() {
        const config = this.server.config();
        if (!isKibanaConfiguration(config)) {
            throw new Error('Failed to access configuration of server.');
        }
        const configuration = config.get('xpack.siem') || {};
        const configurationWithDefaults = {
            enabled: true,
            query: {
                partitionSize: 75,
                partitionFactor: 1.2,
                ...(configuration.query || {}),
            },
            sources: {},
            ...configuration,
        };
        // we assume this to be the configuration because Kibana would have already validated it
        return configurationWithDefaults;
    }
}
exports.KibanaConfigurationAdapter = KibanaConfigurationAdapter;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isServerWithConfig(maybeServer) {
    return (joi_1.default.validate(maybeServer, joi_1.default.object({
        config: joi_1.default.func().required(),
    }).unknown()).error === null);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isKibanaConfiguration(maybeConfiguration) {
    return (joi_1.default.validate(maybeConfiguration, joi_1.default.object({
        get: joi_1.default.func().required(),
    }).unknown()).error === null);
}
