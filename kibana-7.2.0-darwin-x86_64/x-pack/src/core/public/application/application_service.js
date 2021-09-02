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
const rxjs_1 = require("rxjs");
const capabilities_1 = require("./capabilities");
/**
 * Service that is responsible for registering new applications.
 * @internal
 */
class ApplicationService {
    constructor() {
        this.apps$ = new rxjs_1.BehaviorSubject([]);
        this.legacyApps$ = new rxjs_1.BehaviorSubject([]);
        this.capabilities = new capabilities_1.CapabilitiesService();
    }
    setup() {
        return {
            registerApp: (app) => {
                this.apps$.next([...this.apps$.value, app]);
            },
            registerLegacyApp: (app) => {
                this.legacyApps$.next([...this.legacyApps$.value, app]);
            },
        };
    }
    async start({ basePath, injectedMetadata }) {
        this.apps$.complete();
        this.legacyApps$.complete();
        const apps = [...this.apps$.value, ...this.legacyApps$.value];
        const { capabilities, availableApps } = await this.capabilities.start({
            apps,
            basePath,
            injectedMetadata,
        });
        return {
            mount() { },
            capabilities,
            availableApps,
        };
    }
    stop() { }
}
exports.ApplicationService = ApplicationService;
