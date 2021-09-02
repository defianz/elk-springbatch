"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const add_base_path_1 = require("./add_base_path");
const build_href_1 = require("./build_href");
exports.getLoggingContainerHref = (monitor, basePath) => build_href_1.buildHref(monitor, 'ping.container.id', containerId => add_base_path_1.addBasePath(basePath, `/app/infra#/logs?logFilter=${encodeURI(`(expression:'container.id : ${containerId}',kind:kuery)`)}`));
exports.getLoggingKubernetesHref = (monitor, basePath) => build_href_1.buildHref(monitor, 'ping.kubernetes.pod.uid', podUID => add_base_path_1.addBasePath(basePath, `/app/infra#/logs?logFilter=${encodeURI(`(expression:'pod.uid : ${podUID}',kind:kuery)`)}`));
exports.getLoggingIpHref = (monitor, basePath) => build_href_1.buildHref(monitor, 'ping.monitor.ip', ip => add_base_path_1.addBasePath(basePath, `/app/infra#/logs?logFilter=(expression:'${encodeURIComponent(`host.ip : ${ip}`)}',kind:kuery)`));
