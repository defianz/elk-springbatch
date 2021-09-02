"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
var NUM_BYTES = 4;
var BYTE_SIZE = 256;

function throwError(ipAddress) {
  throw Error('Invalid IPv4 address: ' + ipAddress);
}

function isIntegerInRange(integer, min, max) {
  return !isNaN(integer) && integer >= min && integer < max && integer % 1 === 0;
} // eslint-disable-next-line import/no-default-export


var Ipv4Address =
/*#__PURE__*/
function () {
  function Ipv4Address(ipAddress) {
    _classCallCheck(this, Ipv4Address);

    _defineProperty(this, "value", void 0);

    if (typeof ipAddress === 'string') {
      this.value = 0;
      var bytes = ipAddress.split('.');

      if (bytes.length !== NUM_BYTES) {
        throwError(ipAddress);
      }

      for (var i = 0; i < bytes.length; i++) {
        var byte = Number(bytes[i]);

        if (!isIntegerInRange(byte, 0, BYTE_SIZE)) {
          throwError(ipAddress);
        }

        this.value += Math.pow(BYTE_SIZE, NUM_BYTES - 1 - i) * byte;
      }
    } else {
      this.value = ipAddress;
    }

    if (!isIntegerInRange(this.value, 0, Math.pow(BYTE_SIZE, NUM_BYTES))) {
      throwError(ipAddress);
    }
  }

  _createClass(Ipv4Address, [{
    key: "toString",
    value: function toString() {
      var value = this.value;
      var bytes = [];

      for (var i = 0; i < NUM_BYTES; i++) {
        bytes.unshift(value % 256);
        value = Math.floor(value / 256);
      }

      return bytes.join('.');
    }
  }, {
    key: "valueOf",
    value: function valueOf() {
      return this.value;
    }
  }]);

  return Ipv4Address;
}();

exports.default = Ipv4Address;
module.exports = exports.default;