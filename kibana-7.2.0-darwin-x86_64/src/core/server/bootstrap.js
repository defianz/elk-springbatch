"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bootstrap = bootstrap;

var _chalk = _interopRequireDefault(require("chalk"));

var _cluster = require("cluster");

var _config = require("./config");

var _legacy = require("./legacy");

var _root = require("./root");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 *
 * @internal
 * @param param0 - options
 */
async function bootstrap({
  configs,
  cliArgs,
  applyConfigOverrides,
  features
}) {
  if (cliArgs.repl && !features.isReplModeSupported) {
    onRootShutdown('Kibana REPL mode can only be run in development mode.');
  }

  const env = _config.Env.createDefault({
    configs,
    cliArgs,
    isDevClusterMaster: _cluster.isMaster && cliArgs.dev && features.isClusterModeSupported
  });

  const rawConfigService = new _config.RawConfigService(env.configs, rawConfig => new _legacy.LegacyObjectToConfigAdapter(applyConfigOverrides(rawConfig)));
  rawConfigService.loadConfig();
  const root = new _root.Root(rawConfigService.getConfig$(), env, onRootShutdown);

  function shutdown(reason) {
    rawConfigService.stop();
    return root.shutdown(reason);
  }

  try {
    await root.setup();
    await root.start();
  } catch (err) {
    await shutdown(err);
  }

  if (cliArgs.optimize) {
    const cliLogger = root.logger.get('cli');
    cliLogger.info('Optimization done.');
    await shutdown();
  }

  process.on('SIGHUP', () => {
    const cliLogger = root.logger.get('cli');
    cliLogger.info('Reloading logging configuration due to SIGHUP.', {
      tags: ['config']
    });

    try {
      rawConfigService.reloadConfig();
    } catch (err) {
      return shutdown(err);
    }

    cliLogger.info('Reloaded logging configuration due to SIGHUP.', {
      tags: ['config']
    });
  });
  process.on('SIGINT', () => shutdown());
  process.on('SIGTERM', () => shutdown());
}

function onRootShutdown(reason) {
  if (reason !== undefined) {
    // There is a chance that logger wasn't configured properly and error that
    // that forced root to shut down could go unnoticed. To prevent this we always
    // mirror such fatal errors in standard output with `console.error`.
    // eslint-disable-next-line
    console.error(`\n${_chalk.default.white.bgRed(' FATAL ')} ${reason}\n`);
  }

  process.exit(reason === undefined ? 0 : reason.processExitCode || 1);
}