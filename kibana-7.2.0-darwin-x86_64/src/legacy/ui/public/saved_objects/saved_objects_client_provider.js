"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SavedObjectsClientProvider = SavedObjectsClientProvider;

var _chrome = _interopRequireDefault(require("../chrome"));

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
// Provide an angular wrapper around savedObjectClient so all actions get resolved in an Angular Promise
// If you do not need the promise to execute in an angular digest cycle then you should not use this
// and get savedObjectClient directly from chrome.
function SavedObjectsClientProvider(Promise) {
  var savedObjectsClient = _chrome.default.getSavedObjectsClient();

  return {
    create: function create() {
      return Promise.resolve(savedObjectsClient.create.apply(savedObjectsClient, arguments));
    },
    bulkCreate: function bulkCreate() {
      return Promise.resolve(savedObjectsClient.bulkCreate.apply(savedObjectsClient, arguments));
    },
    delete: function _delete() {
      return Promise.resolve(savedObjectsClient.delete.apply(savedObjectsClient, arguments));
    },
    find: function find() {
      return Promise.resolve(savedObjectsClient.find.apply(savedObjectsClient, arguments));
    },
    get: function get() {
      return Promise.resolve(savedObjectsClient.get.apply(savedObjectsClient, arguments));
    },
    bulkGet: function bulkGet() {
      return Promise.resolve(savedObjectsClient.bulkGet.apply(savedObjectsClient, arguments));
    },
    update: function update() {
      return Promise.resolve(savedObjectsClient.update.apply(savedObjectsClient, arguments));
    }
  };
}