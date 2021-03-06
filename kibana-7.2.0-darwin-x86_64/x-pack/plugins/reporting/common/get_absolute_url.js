"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const url_1 = tslib_1.__importDefault(require("url"));
// @ts-ignore
const once_per_server_1 = require("../server/lib/once_per_server");
function getAbsoluteUrlFn(server) {
    const config = server.config();
    return function getAbsoluteUrl({ basePath = config.get('server.basePath'), hash = '', path = '/app/kibana', search = '', } = {}) {
        return url_1.default.format({
            protocol: config.get('xpack.reporting.kibanaServer.protocol') || server.info.protocol,
            hostname: config.get('xpack.reporting.kibanaServer.hostname') || config.get('server.host'),
            port: config.get('xpack.reporting.kibanaServer.port') || config.get('server.port'),
            pathname: basePath + path,
            hash,
            search,
        });
    };
}
exports.getAbsoluteUrlFactory = once_per_server_1.oncePerServer(getAbsoluteUrlFn);
