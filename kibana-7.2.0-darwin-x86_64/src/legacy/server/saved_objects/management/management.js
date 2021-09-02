"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SavedObjectsManagement = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
class SavedObjectsManagement {
  constructor(managementDefinition) {
    _defineProperty(this, "definition", void 0);

    this.definition = managementDefinition;
  }

  isImportAndExportable(type) {
    if (this.definition && this.definition.hasOwnProperty(type)) {
      return this.definition[type].isImportableAndExportable === true;
    }

    return false;
  }

  getDefaultSearchField(type) {
    if (this.definition && this.definition.hasOwnProperty(type)) {
      return this.definition[type].defaultSearchField;
    }
  }

  getIcon(type) {
    if (this.definition && this.definition.hasOwnProperty(type)) {
      return this.definition[type].icon;
    }
  }

  getTitle(savedObject) {
    const {
      type
    } = savedObject;

    if (this.definition && this.definition.hasOwnProperty(type) && this.definition[type].getTitle) {
      const {
        getTitle
      } = this.definition[type];

      if (getTitle) {
        return getTitle(savedObject);
      }
    }
  }

  getEditUrl(savedObject) {
    const {
      type
    } = savedObject;

    if (this.definition && this.definition.hasOwnProperty(type)) {
      const {
        getEditUrl
      } = this.definition[type];

      if (getEditUrl) {
        return getEditUrl(savedObject);
      }
    }
  }

  getInAppUrl(savedObject) {
    const {
      type
    } = savedObject;

    if (this.definition && this.definition.hasOwnProperty(type)) {
      const {
        getInAppUrl
      } = this.definition[type];

      if (getInAppUrl) {
        return getInAppUrl(savedObject);
      }
    }
  }

}

exports.SavedObjectsManagement = SavedObjectsManagement;