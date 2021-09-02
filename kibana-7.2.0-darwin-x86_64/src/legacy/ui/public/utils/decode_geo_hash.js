"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodeGeoHash = decodeGeoHash;
exports.geohashColumns = geohashColumns;

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
function decodeGeoHash(geohash) {
  var BITS = [16, 8, 4, 2, 1];
  var BASE32 = '0123456789bcdefghjkmnpqrstuvwxyz';
  var isEven = true;
  var lat = [];
  var lon = [];
  lat[0] = -90.0;
  lat[1] = 90.0;
  lon[0] = -180.0;
  lon[1] = 180.0;
  var latErr = 90.0;
  var lonErr = 180.0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = geohash[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var geohashEl = _step.value;
      var c = geohashEl.toString();
      var cd = BASE32.indexOf(c);

      for (var j = 0; j < 5; j++) {
        var mask = BITS[j];

        if (isEven) {
          lonErr = lonErr /= 2;
          refineInterval(lon, cd, mask);
        } else {
          latErr = latErr /= 2;
          refineInterval(lat, cd, mask);
        }

        isEven = !isEven;
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

  lat[2] = (lat[0] + lat[1]) / 2;
  lon[2] = (lon[0] + lon[1]) / 2;
  return {
    latitude: lat,
    longitude: lon
  };
}

function refineInterval(interval, cd, mask) {
  if (cd & mask) {
    /* eslint-disable-line */
    interval[0] = (interval[0] + interval[1]) / 2;
  } else {
    interval[1] = (interval[0] + interval[1]) / 2;
  }
}
/**
 * Get the number of geohash cells for a given precision
 *
 * @param {number} precision the geohash precision (1<=precision<=12).
 * @param {number} axis constant for the axis 0=lengthwise (ie. columns, along longitude), 1=heightwise (ie. rows, along latitude).
 * @returns {number} Number of geohash cells (rows or columns) at that precision
 */


function geohashCells(precision, axis) {
  var cells = 1;

  for (var i = 1; i <= precision; i += 1) {
    /* On odd precisions, rows divide by 4 and columns by 8. Vice-versa on even precisions */
    cells *= i % 2 === axis ? 4 : 8;
  }

  return cells;
}
/**
 * Get the number of geohash columns (world-wide) for a given precision
 * @param precision the geohash precision
 * @returns {number} the number of columns
 */


function geohashColumns(precision) {
  return geohashCells(precision, 0);
}