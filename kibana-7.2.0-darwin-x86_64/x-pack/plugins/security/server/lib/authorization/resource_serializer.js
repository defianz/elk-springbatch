"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.spaceResourcePrefix = `space:`;
class ResourceSerializer {
    static serializeSpaceResource(spaceId) {
        return `${exports.spaceResourcePrefix}${spaceId}`;
    }
    static deserializeSpaceResource(resource) {
        if (!this.isSerializedSpaceResource(resource)) {
            throw new Error(`Resource should have started with ${exports.spaceResourcePrefix}`);
        }
        return resource.slice(exports.spaceResourcePrefix.length);
    }
    static isSerializedSpaceResource(resource) {
        return resource.startsWith(exports.spaceResourcePrefix);
    }
}
exports.ResourceSerializer = ResourceSerializer;
