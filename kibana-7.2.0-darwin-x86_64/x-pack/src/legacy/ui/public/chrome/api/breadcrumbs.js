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
let newPlatformChrome;
function __newPlatformSetup__(instance) {
    if (newPlatformChrome) {
        throw new Error('ui/chrome/api/breadcrumbs is already initialized');
    }
    newPlatformChrome = instance;
}
exports.__newPlatformSetup__ = __newPlatformSetup__;
function createBreadcrumbsApi(chrome) {
    let currentBreadcrumbs = [];
    // reset breadcrumbSetSinceRouteChange any time the breadcrumbs change, even
    // if it was done directly through the new platform
    newPlatformChrome.getBreadcrumbs$().subscribe({
        next(nextBreadcrumbs) {
            currentBreadcrumbs = nextBreadcrumbs;
        },
    });
    return {
        breadcrumbs: {
            /**
             * Get an observerable that emits the current list of breadcrumbs
             * and emits each update to the breadcrumbs
             */
            get$() {
                return newPlatformChrome.getBreadcrumbs$();
            },
            /**
             * Replace the set of breadcrumbs with a new set
             */
            set(newBreadcrumbs) {
                newPlatformChrome.setBreadcrumbs(newBreadcrumbs);
            },
            /**
             * Add a breadcrumb to the end of the list of breadcrumbs
             */
            push(breadcrumb) {
                newPlatformChrome.setBreadcrumbs([...currentBreadcrumbs, breadcrumb]);
            },
            /**
             * Filter the current set of breadcrumbs with a function. Works like Array#filter()
             */
            filter(fn) {
                newPlatformChrome.setBreadcrumbs(currentBreadcrumbs.filter(fn));
            },
            /**
             * Remove last element of the breadcrumb
             */
            pop() {
                newPlatformChrome.setBreadcrumbs(currentBreadcrumbs.slice(0, -1));
            },
        },
    };
}
function initBreadcrumbsApi(chrome, internals) {
    const { breadcrumbs } = createBreadcrumbsApi(chrome);
    chrome.breadcrumbs = breadcrumbs;
}
exports.initBreadcrumbsApi = initBreadcrumbsApi;
