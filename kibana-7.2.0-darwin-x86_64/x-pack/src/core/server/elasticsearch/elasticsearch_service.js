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
const operators_1 = require("rxjs/operators");
const cluster_client_1 = require("./cluster_client");
const elasticsearch_config_1 = require("./elasticsearch_config");
/** @internal */
class ElasticsearchService {
    constructor(coreContext) {
        this.coreContext = coreContext;
        this.log = coreContext.logger.get('elasticsearch-service');
        this.config$ = coreContext.configService
            .atPath('elasticsearch')
            .pipe(operators_1.map(rawConfig => new elasticsearch_config_1.ElasticsearchConfig(rawConfig)));
    }
    async setup() {
        this.log.debug('Setting up elasticsearch service');
        const clients$ = this.config$.pipe(operators_1.filter(() => {
            if (this.subscription !== undefined) {
                this.log.error('Clients cannot be changed after they are created');
                return false;
            }
            return true;
        }), operators_1.switchMap(config => new rxjs_1.Observable(subscriber => {
            this.log.debug(`Creating elasticsearch clients`);
            const coreClients = {
                config,
                adminClient: this.createClusterClient('admin', config),
                dataClient: this.createClusterClient('data', config),
            };
            subscriber.next(coreClients);
            return () => {
                this.log.debug(`Closing elasticsearch clients`);
                coreClients.adminClient.close();
                coreClients.dataClient.close();
            };
        })), operators_1.publishReplay(1));
        this.subscription = clients$.connect();
        return {
            legacy: { config$: clients$.pipe(operators_1.map(clients => clients.config)) },
            adminClient$: clients$.pipe(operators_1.map(clients => clients.adminClient)),
            dataClient$: clients$.pipe(operators_1.map(clients => clients.dataClient)),
            createClient: (type, clientConfig) => {
                return this.createClusterClient(type, clientConfig);
            },
        };
    }
    async start() { }
    async stop() {
        this.log.debug('Stopping elasticsearch service');
        if (this.subscription !== undefined) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }
    }
    createClusterClient(type, config) {
        return new cluster_client_1.ClusterClient(config, this.coreContext.logger.get('elasticsearch', type));
    }
}
exports.ElasticsearchService = ElasticsearchService;
