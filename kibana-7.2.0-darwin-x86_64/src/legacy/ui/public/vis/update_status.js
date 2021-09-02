"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUpdateStatus = getUpdateStatus;
exports.Status = void 0;

var _calculate_object_hash = require("./lib/calculate_object_hash");

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
var Status;
/**
 * Checks whether the hash of a specific key in the given oldStatus has changed
 * compared to the new valueHash passed.
 */

exports.Status = Status;

(function (Status) {
  Status["AGGS"] = "aggs";
  Status["DATA"] = "data";
  Status["PARAMS"] = "params";
  Status["RESIZE"] = "resize";
  Status["TIME"] = "time";
  Status["UI_STATE"] = "uiState";
})(Status || (exports.Status = Status = {}));

function hasHashChanged(valueHash, oldStatus, name) {
  var oldHash = oldStatus[name];
  return oldHash !== valueHash;
}

function hasSizeChanged(size, oldSize) {
  if (!oldSize) {
    return true;
  }

  return oldSize.width !== size.width || oldSize.height !== size.height;
}

function getUpdateStatus() {
  var requiresUpdateStatus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var obj = arguments.length > 1 ? arguments[1] : undefined;
  var param = arguments.length > 2 ? arguments[2] : undefined;
  var status = {}; // If the vis type doesn't need update status, skip all calculations

  if (requiresUpdateStatus.length === 0) {
    return status;
  }

  if (!obj._oldStatus) {
    obj._oldStatus = {};
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = requiresUpdateStatus[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var requiredStatus = _step.value;
      var hash = void 0; // Calculate all required status updates for this visualization

      switch (requiredStatus) {
        case Status.AGGS:
          hash = (0, _calculate_object_hash.calculateObjectHash)(param.vis.aggs);
          status.aggs = hasHashChanged(hash, obj._oldStatus, 'aggs');
          obj._oldStatus.aggs = hash;
          break;

        case Status.DATA:
          hash = (0, _calculate_object_hash.calculateObjectHash)(param.visData);
          status.data = hasHashChanged(hash, obj._oldStatus, 'data');
          obj._oldStatus.data = hash;
          break;

        case Status.PARAMS:
          hash = (0, _calculate_object_hash.calculateObjectHash)(param.vis.params);
          status.params = hasHashChanged(hash, obj._oldStatus, 'param');
          obj._oldStatus.param = hash;
          break;

        case Status.RESIZE:
          var _width = param.vis.size ? param.vis.size[0] : 0;

          var _height = param.vis.size ? param.vis.size[1] : 0;

          var size = {
            width: _width,
            height: _height
          };
          status.resize = hasSizeChanged(size, obj._oldStatus.resize);
          obj._oldStatus.resize = size;
          break;

        case Status.TIME:
          var timeRange = param.vis.filters && param.vis.filters.timeRange;
          hash = (0, _calculate_object_hash.calculateObjectHash)(timeRange);
          status.time = hasHashChanged(hash, obj._oldStatus, 'time');
          obj._oldStatus.time = hash;
          break;

        case Status.UI_STATE:
          hash = (0, _calculate_object_hash.calculateObjectHash)(param.uiState);
          status.uiState = hasHashChanged(hash, obj._oldStatus, 'uiState');
          obj._oldStatus.uiState = hash;
          break;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return status;
}