"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContextMenuPanel = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
var ContextMenuPanel =
/*#__PURE__*/
function () {
  function ContextMenuPanel(config) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, ContextMenuPanel);

    _defineProperty(this, "id", void 0);

    _defineProperty(this, "title", void 0);

    this.id = config.id;
    this.title = config.title;

    if (options.getContent) {
      this.getContent = options.getContent;
    }
  }
  /**
   * Optional, could be composed of actions instead of content.
   */


  _createClass(ContextMenuPanel, [{
    key: "getContent",
    value: function getContent(panelActionAPI) {
      return;
    }
  }]);

  return ContextMenuPanel;
}();

exports.ContextMenuPanel = ContextMenuPanel;