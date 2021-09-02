"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const plugin_loader_1 = require("./plugin_loader");
/**
 * Lightweight wrapper around discovered plugin that is responsible for instantiating
 * plugin and dispatching proper context and dependencies into plugin's lifecycle hooks.
 *
 * @internal
 */
class PluginWrapper {
    constructor(discoveredPlugin, initializerContext) {
        this.discoveredPlugin = discoveredPlugin;
        this.initializerContext = initializerContext;
        this.name = discoveredPlugin.id;
        this.configPath = discoveredPlugin.configPath;
        this.requiredPlugins = discoveredPlugin.requiredPlugins;
        this.optionalPlugins = discoveredPlugin.optionalPlugins;
    }
    /**
     * Loads the plugin's bundle into the browser. Should be called in parallel with all plugins
     * using `Promise.all`. Must be called before `setup`.
     * @param addBasePath Function that adds the base path to a string for plugin bundle path.
     */
    async load(addBasePath) {
        this.initializer = await plugin_loader_1.loadPluginBundle(addBasePath, this.name);
    }
    /**
     * Instantiates plugin and calls `setup` function exposed by the plugin initializer.
     * @param setupContext Context that consists of various core services tailored specifically
     * for the `setup` lifecycle event.
     * @param plugins The dictionary where the key is the dependency name and the value
     * is the contract returned by the dependency's `setup` function.
     */
    async setup(setupContext, plugins) {
        this.instance = await this.createPluginInstance();
        return await this.instance.setup(setupContext, plugins);
    }
    /**
     * Calls `setup` function exposed by the initialized plugin.
     * @param startContext Context that consists of various core services tailored specifically
     * for the `start` lifecycle event.
     * @param plugins The dictionary where the key is the dependency name and the value
     * is the contract returned by the dependency's `start` function.
     */
    async start(startContext, plugins) {
        if (this.instance === undefined) {
            throw new Error(`Plugin "${this.name}" can't be started since it isn't set up.`);
        }
        return await this.instance.start(startContext, plugins);
    }
    /**
     * Calls optional `stop` function exposed by the plugin initializer.
     */
    stop() {
        if (this.instance === undefined) {
            throw new Error(`Plugin "${this.name}" can't be stopped since it isn't set up.`);
        }
        if (typeof this.instance.stop === 'function') {
            this.instance.stop();
        }
        this.instance = undefined;
    }
    async createPluginInstance() {
        if (this.initializer === undefined) {
            throw new Error(`Plugin "${this.name}" can't be setup since its bundle isn't loaded.`);
        }
        const instance = this.initializer(this.initializerContext);
        if (typeof instance.setup !== 'function') {
            throw new Error(`Instance of plugin "${this.name}" does not define "setup" function.`);
        }
        else if (typeof instance.start !== 'function') {
            throw new Error(`Instance of plugin "${this.name}" does not define "start" function.`);
        }
        return instance;
    }
}
exports.PluginWrapper = PluginWrapper;
