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
const events_1 = require("events");
/**
 * @callback viewShouldShowFunc
 * @param {object} adapters - A list of adapters to check whether or not this view
 *    should be shown for.
 * @returns {boolean} true - if this view should be shown for the given adapters.
 */
/**
 * A registry that will hold inspector views.
 */
class InspectorViewRegistry extends events_1.EventEmitter {
    constructor() {
        super(...arguments);
        this.views = [];
    }
    /**
     * Register a new inspector view to the registry. Check the README.md in the
     * inspector directory for more information of the object format to register
     * here. This will also emit a 'change' event on the registry itself.
     *
     * @param {InspectorViewDescription} view - The view description to add to the registry.
     */
    register(view) {
        if (!view) {
            return;
        }
        this.views.push(view);
        // Keep registry sorted by the order property
        this.views.sort((a, b) => (a.order || Number.MAX_VALUE) - (b.order || Number.MAX_VALUE));
        this.emit('change');
    }
    /**
     * Retrieve all views currently registered with the registry.
     * @returns {InspectorViewDescription[]} A by `order` sorted list of all registered
     *    inspector views.
     */
    getAll() {
        return this.views;
    }
    /**
     * Retrieve all registered views, that want to be visible for the specified adapters.
     * @param {object} adapters - an adapter configuration
     * @returns {InspectorViewDescription[]} All inespector view descriptions visible
     *    for the specific adapters.
     */
    getVisible(adapters) {
        if (!adapters) {
            return [];
        }
        return this.views.filter(view => !view.shouldShow || view.shouldShow(adapters));
    }
}
exports.InspectorViewRegistry = InspectorViewRegistry;
/**
 * The global view registry. In the long run this should be solved by a registry
 * system introduced by the new platform instead, to not keep global state like that.
 */
const viewRegistry = new InspectorViewRegistry();
exports.viewRegistry = viewRegistry;
