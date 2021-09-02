"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTitle = exports.updateDescription = exports.MetadataActionTypeKeys = void 0;

var _reduxActions = require("redux-actions");

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

/* eslint-disable @typescript-eslint/no-empty-interface */
var MetadataActionTypeKeys;
exports.MetadataActionTypeKeys = MetadataActionTypeKeys;

(function (MetadataActionTypeKeys) {
  MetadataActionTypeKeys["UPDATE_DESCRIPTION"] = "UPDATE_DESCRIPTION";
  MetadataActionTypeKeys["UPDATE_TITLE"] = "UPDATE_TITLE";
})(MetadataActionTypeKeys || (exports.MetadataActionTypeKeys = MetadataActionTypeKeys = {}));

var updateDescription = (0, _reduxActions.createAction)(MetadataActionTypeKeys.UPDATE_DESCRIPTION);
exports.updateDescription = updateDescription;
var updateTitle = (0, _reduxActions.createAction)(MetadataActionTypeKeys.UPDATE_TITLE);
exports.updateTitle = updateTitle;