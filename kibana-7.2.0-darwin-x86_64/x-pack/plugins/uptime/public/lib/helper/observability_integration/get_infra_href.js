"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const add_base_path_1 = require("./add_base_path");
const build_href_1 = require("./build_href");
exports.getInfraContainerHref = (monitor, basePath) => build_href_1.buildHref(monitor, 'ping.container.id', containerId => add_base_path_1.addBasePath(basePath, `/app/infra#/link-to/container-detail/${encodeURIComponent(containerId)}`));
exports.getInfraKubernetesHref = (monitor, basePath) => build_href_1.buildHref(monitor, 'ping.kubernetes.pod.uid', uid => add_base_path_1.addBasePath(basePath, `/app/infra#/link-to/pod-detail/${encodeURIComponent(uid)}`));
exports.getInfraIpHref = (monitor, basePath) => build_href_1.buildHref(monitor, 'ping.monitor.ip', ip => {
    const expression = encodeURIComponent(`host.ip : ${ip}`);
    return add_base_path_1.addBasePath(basePath, `/app/infra#/infrastructure/inventory?waffleFilter=(expression:'${expression}',kind:kuery)`);
});
