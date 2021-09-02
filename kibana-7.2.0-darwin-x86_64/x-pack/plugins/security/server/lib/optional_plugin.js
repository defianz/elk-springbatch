"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function createOptionalPlugin(config, configPrefix, plugins, pluginId) {
    return new Proxy({}, {
        get(obj, prop) {
            const isEnabled = config.get(`${configPrefix}.enabled`);
            if (prop === 'isEnabled') {
                return isEnabled;
            }
            if (!plugins[pluginId] && isEnabled) {
                throw new Error(`Plugin accessed before it's available`);
            }
            if (!plugins[pluginId] && !isEnabled) {
                throw new Error(`Plugin isn't enabled, check isEnabled before using`);
            }
            return plugins[pluginId][prop];
        },
    });
}
exports.createOptionalPlugin = createOptionalPlugin;
