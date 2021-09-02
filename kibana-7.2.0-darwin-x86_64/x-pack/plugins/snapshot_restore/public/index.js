"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const plugin_1 = require("./plugin");
const shim_1 = require("./shim");
const { core, plugins } = shim_1.createShim();
const snapshotRestorePlugin = new plugin_1.Plugin();
snapshotRestorePlugin.start(core, plugins);
