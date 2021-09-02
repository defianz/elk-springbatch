"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PluginsSystem = void 0;

var _lodash = require("lodash");

var _plugin_context = require("./plugin_context");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @internal */
class PluginsSystem {
  // `satup`, the past-tense version of the noun `setup`.
  constructor(coreContext) {
    this.coreContext = coreContext;

    _defineProperty(this, "plugins", new Map());

    _defineProperty(this, "log", void 0);

    _defineProperty(this, "satupPlugins", []);

    this.log = coreContext.logger.get('plugins-system');
  }

  addPlugin(plugin) {
    this.plugins.set(plugin.name, plugin);
  }

  async setupPlugins(deps) {
    const contracts = new Map();

    if (this.plugins.size === 0) {
      return contracts;
    }

    const sortedPlugins = this.getTopologicallySortedPluginNames();
    this.log.info(`Setting up [${this.plugins.size}] plugins: [${[...sortedPlugins]}]`);

    for (const pluginName of sortedPlugins) {
      const plugin = this.plugins.get(pluginName);

      if (!plugin.includesServerPlugin) {
        continue;
      }

      this.log.debug(`Setting up plugin "${pluginName}"...`);
      const pluginDeps = new Set([...plugin.requiredPlugins, ...plugin.optionalPlugins]);
      const pluginDepContracts = Array.from(pluginDeps).reduce((depContracts, dependencyName) => {
        // Only set if present. Could be absent if plugin does not have server-side code or is a
        // missing optional dependency.
        if (contracts.has(dependencyName)) {
          depContracts[dependencyName] = contracts.get(dependencyName);
        }

        return depContracts;
      }, {});
      contracts.set(pluginName, (await plugin.setup((0, _plugin_context.createPluginSetupContext)(this.coreContext, deps, plugin), pluginDepContracts)));
      this.satupPlugins.push(pluginName);
    }

    return contracts;
  }

  async startPlugins(deps) {
    const contracts = new Map();

    if (this.satupPlugins.length === 0) {
      return contracts;
    }

    this.log.info(`Starting [${this.satupPlugins.length}] plugins: [${[...this.satupPlugins]}]`);

    for (const pluginName of this.satupPlugins) {
      this.log.debug(`Starting plugin "${pluginName}"...`);
      const plugin = this.plugins.get(pluginName);
      const pluginDeps = new Set([...plugin.requiredPlugins, ...plugin.optionalPlugins]);
      const pluginDepContracts = Array.from(pluginDeps).reduce((depContracts, dependencyName) => {
        // Only set if present. Could be absent if plugin does not have server-side code or is a
        // missing optional dependency.
        if (contracts.has(dependencyName)) {
          depContracts[dependencyName] = contracts.get(dependencyName);
        }

        return depContracts;
      }, {});
      contracts.set(pluginName, (await plugin.start((0, _plugin_context.createPluginStartContext)(this.coreContext, deps, plugin), pluginDepContracts)));
    }

    return contracts;
  }

  async stopPlugins() {
    if (this.plugins.size === 0 || this.satupPlugins.length === 0) {
      return;
    }

    this.log.info(`Stopping all plugins.`); // Stop plugins in the reverse order of when they were set up.

    while (this.satupPlugins.length > 0) {
      const pluginName = this.satupPlugins.pop();
      this.log.debug(`Stopping plugin "${pluginName}"...`);
      await this.plugins.get(pluginName).stop();
    }
  }
  /**
   * Get a Map of all discovered UI plugins in topological order.
   */


  uiPlugins() {
    const internal = new Map([...this.getTopologicallySortedPluginNames().keys()].filter(pluginName => this.plugins.get(pluginName).includesUiPlugin).map(pluginName => {
      const plugin = this.plugins.get(pluginName);
      return [pluginName, {
        id: pluginName,
        path: plugin.path,
        configPath: plugin.manifest.configPath,
        requiredPlugins: plugin.manifest.requiredPlugins,
        optionalPlugins: plugin.manifest.optionalPlugins
      }];
    }));
    const publicPlugins = new Map([...internal.entries()].map(([pluginName, plugin]) => [pluginName, (0, _lodash.pick)(plugin, ['id', 'configPath', 'requiredPlugins', 'optionalPlugins'])]));
    return {
      public: publicPlugins,
      internal
    };
  }
  /**
   * Gets topologically sorted plugin names that are registered with the plugin system.
   * Ordering is possible if and only if the plugins graph has no directed cycles,
   * that is, if it is a directed acyclic graph (DAG). If plugins cannot be ordered
   * an error is thrown.
   *
   * Uses Kahn's Algorithm to sort the graph.
   */


  getTopologicallySortedPluginNames() {
    // We clone plugins so we can remove handled nodes while we perform the
    // topological ordering. If the cloned graph is _not_ empty at the end, we
    // know we were not able to topologically order the graph. We exclude optional
    // dependencies that are not present in the plugins graph.
    const pluginsDependenciesGraph = new Map([...this.plugins.entries()].map(([pluginName, plugin]) => {
      return [pluginName, new Set([...plugin.requiredPlugins, ...plugin.optionalPlugins.filter(dependency => this.plugins.has(dependency))])];
    })); // First, find a list of "start nodes" which have no outgoing edges. At least
    // one such node must exist in a non-empty acyclic graph.

    const pluginsWithAllDependenciesSorted = [...pluginsDependenciesGraph.keys()].filter(pluginName => pluginsDependenciesGraph.get(pluginName).size === 0);
    const sortedPluginNames = new Set();

    while (pluginsWithAllDependenciesSorted.length > 0) {
      const sortedPluginName = pluginsWithAllDependenciesSorted.pop(); // We know this plugin has all its dependencies sorted, so we can remove it
      // and include into the final result.

      pluginsDependenciesGraph.delete(sortedPluginName);
      sortedPluginNames.add(sortedPluginName); // Go through the rest of the plugins and remove `sortedPluginName` from their
      // unsorted dependencies.

      for (const [pluginName, dependencies] of pluginsDependenciesGraph) {
        // If we managed delete `sortedPluginName` from dependencies let's check
        // whether it was the last one and we can mark plugin as sorted.
        if (dependencies.delete(sortedPluginName) && dependencies.size === 0) {
          pluginsWithAllDependenciesSorted.push(pluginName);
        }
      }
    }

    if (pluginsDependenciesGraph.size > 0) {
      const edgesLeft = JSON.stringify([...pluginsDependenciesGraph.entries()]);
      throw new Error(`Topological ordering of plugins did not complete, these edges could not be ordered: ${edgesLeft}`);
    }

    return sortedPluginNames;
  }

}

exports.PluginsSystem = PluginsSystem;