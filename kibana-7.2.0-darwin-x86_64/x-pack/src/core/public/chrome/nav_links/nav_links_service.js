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
const lodash_1 = require("lodash");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const nav_link_1 = require("./nav_link");
class NavLinksService {
    constructor() {
        this.stop$ = new rxjs_1.ReplaySubject(1);
    }
    start({ application, basePath }) {
        const navLinks$ = new rxjs_1.BehaviorSubject(new Map(application.availableApps.map(app => [
            app.id,
            new nav_link_1.NavLinkWrapper({
                ...app,
                // Either rootRoute or appUrl must be defined.
                baseUrl: relativeToAbsolute(basePath.addToPath((app.rootRoute || app.appUrl))),
            }),
        ])));
        const forceAppSwitcherNavigation$ = new rxjs_1.BehaviorSubject(false);
        return {
            /**
             * Get an observable for a sorted list of navlinks.
             */
            getNavLinks$: () => {
                return navLinks$.pipe(operators_1.map(sortNavLinks), operators_1.takeUntil(this.stop$));
            },
            /**
             * Get the state of a navlink at this point in time.
             * @param id
             */
            get(id) {
                const link = navLinks$.value.get(id);
                return link && link.properties;
            },
            /**
             * Get the current state of all navlinks.
             */
            getAll() {
                return sortNavLinks(navLinks$.value);
            },
            /**
             * Check whether or not a navlink exists.
             * @param id
             */
            has(id) {
                return navLinks$.value.has(id);
            },
            /**
             * Remove all navlinks except the one matching the given id.
             * NOTE: this is not reversible.
             * @param id
             */
            showOnly(id) {
                if (!this.has(id)) {
                    return;
                }
                navLinks$.next(new Map([...navLinks$.value.entries()].filter(([linkId]) => linkId === id)));
            },
            /**
             * Update the navlink for the given id with the updated attributes.
             * Returns the updated navlink or `undefined` if it does not exist.
             * @param id
             * @param values
             */
            update(id, values) {
                if (!this.has(id)) {
                    return;
                }
                navLinks$.next(new Map([...navLinks$.value.entries()].map(([linkId, link]) => {
                    return [linkId, link.id === id ? link.update(values) : link];
                })));
                return this.get(id);
            },
            /**
             * Enable forced navigation mode, which will trigger a page refresh
             * when a nav link is clicked and only the hash is updated. This is only
             * necessary when rendering the status page in place of another app, as
             * links to that app will set the current URL and change the hash, but
             * the routes for the correct are not loaded so nothing will happen.
             * https://github.com/elastic/kibana/pull/29770
             *
             * Used only by status_page plugin
             */
            enableForcedAppSwitcherNavigation() {
                forceAppSwitcherNavigation$.next(true);
            },
            /**
             * An observable of the forced app switcher state.
             */
            getForceAppSwitcherNavigation$() {
                return forceAppSwitcherNavigation$.asObservable();
            },
        };
    }
    stop() {
        this.stop$.next();
    }
}
exports.NavLinksService = NavLinksService;
function sortNavLinks(navLinks) {
    return lodash_1.sortBy([...navLinks.values()].map(link => link.properties), 'order');
}
function relativeToAbsolute(url) {
    // convert all link urls to absolute urls
    const a = document.createElement('a');
    a.setAttribute('href', url);
    return a.href;
}
