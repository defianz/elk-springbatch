"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createVisualizeEditUrl = createVisualizeEditUrl;
exports.VisualizeConstants = void 0;

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
var VisualizeConstants = {
  LANDING_PAGE_PATH: '/visualize',
  WIZARD_STEP_1_PAGE_PATH: '/visualize/new',
  WIZARD_STEP_2_PAGE_PATH: '/visualize/new/configure',
  CREATE_PATH: '/visualize/create',
  EDIT_PATH: '/visualize/edit'
};
exports.VisualizeConstants = VisualizeConstants;

function createVisualizeEditUrl(id) {
  return "".concat(VisualizeConstants.EDIT_PATH, "/").concat(id);
}