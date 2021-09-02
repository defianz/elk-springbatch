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
const kfetch_1 = require("./kfetch");
var kfetch_2 = require("./kfetch");
exports.addInterceptor = kfetch_2.addInterceptor;
let http;
let kfetchInstance;
function __newPlatformSetup__(httpSetup) {
    if (http) {
        throw new Error('ui/kfetch already initialized with New Platform APIs');
    }
    http = httpSetup;
    kfetchInstance = kfetch_1.createKfetch(http);
}
exports.__newPlatformSetup__ = __newPlatformSetup__;
exports.kfetch = (options, kfetchOptions) => {
    return kfetchInstance(options, kfetchOptions);
};
