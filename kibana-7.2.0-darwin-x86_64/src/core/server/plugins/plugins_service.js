"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PluginsService = void 0;

var _operators = require("rxjs/operators");

var _discovery = require("./discovery");

var _plugins_config = require("./plugins_config");

var _plugins_system = require("./plugins_system");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// eslint-disable-line @typescript-eslint/no-empty-interface

/** @internal */
class PluginsService {
  constructor(coreContext) {
    this.coreContext = coreContext;

    _defineProperty(this, "log", void 0);

    _defineProperty(this, "pluginsSystem", void 0);

    _defineProperty(this, "config$", void 0);

    this.log = coreContext.logger.get('plugins-service');
    this.pluginsSystem = new _plugins_system.PluginsSystem(coreContext);
    this.config$ = coreContext.configService.atPath('plugins').pipe((0, _operators.map)(rawConfig => new _plugins_config.PluginsConfig(rawConfig, coreContext.env)));
  }

  async setup(deps) {
    this.log.debug('Setting up plugins service');
    const config = await this.config$.pipe((0, _operators.first)()).toPromise();
    const {
      error$,
      plugin$
    } = (0, _discovery.discover)(config, this.coreContext);
    await this.handleDiscoveryErrors(error$);
    await this.handleDiscoveredPlugins(plugin$);

    if (!config.initialize || this.coreContext.env.isDevClusterMaster) {
      this.log.info('Plugin initialization disabled.');
      return {
        contracts: new Map(),
        uiPlugins: this.pluginsSystem.uiPlugins()
      };
    }

    return {
      contracts: await this.pluginsSystem.setupPlugins(deps),
      uiPlugins: this.pluginsSystem.uiPlugins()
    };
  }

  async start(deps) {
    this.log.debug('Plugins service starts plugins');
    const contracts = await this.pluginsSystem.startPlugins(deps);
    return {
      contracts
    };
  }

  async stop() {
    this.log.debug('Stopping plugins service');
    await this.pluginsSystem.stopPlugins();
  }

  async handleDiscoveryErrors(error$) {
    // At this stage we report only errors that can occur when new platform plugin
    // manifest is present, otherwise we can't be sure that the plugin is for the new
    // platform and let legacy platform to handle it.
    const errorTypesToReport = [_discovery.PluginDiscoveryErrorType.IncompatibleVersion, _discovery.PluginDiscoveryErrorType.InvalidManifest];
    const errors = await error$.pipe((0, _operators.filter)(error => errorTypesToReport.includes(error.type)), (0, _operators.tap)(pluginError => this.log.error(pluginError)), (0, _operators.toArray)()).toPromise();

    if (errors.length > 0) {
      throw new Error(`Failed to initialize plugins:${errors.map(err => `\n\t${err.message}`).join('')}`);
    }
  }

  async handleDiscoveredPlugins(plugin$) {
    const pluginEnableStatuses = new Map();
    await plugin$.pipe((0, _operators.mergeMap)(async plugin => {
      const schema = plugin.getConfigSchema();

      if (schema) {
        await this.coreContext.configService.setSchema(plugin.configPath, schema);
      }

      const isEnabled = await this.coreContext.configService.isEnabledAtPath(plugin.configPath);

      if (pluginEnableStatuses.has(plugin.name)) {
        throw new Error(`Plugin with id "${plugin.name}" is already registered!`);
      }

      pluginEnableStatuses.set(plugin.name, {
        plugin,
        isEnabled
      });
    })).toPromise();

    for (const [pluginName, {
      plugin,
      isEnabled
    }] of pluginEnableStatuses) {
      if (this.shouldEnablePlugin(pluginName, pluginEnableStatuses)) {
        this.pluginsSystem.addPlugin(plugin);
      } else if (isEnabled) {
        this.log.info(`Plugin "${pluginName}" has been disabled since some of its direct or transitive dependencies are missing or disabled.`);
      } else {
        this.log.info(`Plugin "${pluginName}" is disabled.`);
      }
    }

    this.log.debug(`Discovered ${pluginEnableStatuses.size} plugins.`);
  }

  shouldEnablePlugin(pluginName, pluginEnableStatuses) {
    const pluginInfo = pluginEnableStatuses.get(pluginName);
    return pluginInfo !== undefined && pluginInfo.isEnabled && pluginInfo.plugin.requiredPlugins.every(dependencyName => this.shouldEnablePlugin(dependencyName, pluginEnableStatuses));
  }

}

exports.PluginsService = PluginsService;