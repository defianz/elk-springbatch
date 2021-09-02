"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CidrMask = void 0;

var _ipv4_address = _interopRequireDefault(require("./ipv4_address"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NUM_BITS = 32;

function throwError(mask) {
  throw Error('Invalid CIDR mask: ' + mask);
}

var CidrMask =
/*#__PURE__*/
function () {
  function CidrMask(mask) {
    _classCallCheck(this, CidrMask);

    _defineProperty(this, "initialAddress", void 0);

    _defineProperty(this, "prefixLength", void 0);

    var splits = mask.split('/');

    if (splits.length !== 2) {
      throwError(mask);
    }

    this.initialAddress = new _ipv4_address.default(splits[0]);
    this.prefixLength = Number(splits[1]);

    if (this.prefixLength < 1 || this.prefixLength > NUM_BITS) {
      throwError(mask);
    }
  }

  _createClass(CidrMask, [{
    key: "getRange",
    value: function getRange() {
      var variableBits = NUM_BITS - this.prefixLength; // eslint-disable-next-line no-bitwise

      var fromAddress = this.initialAddress.valueOf() >> variableBits << variableBits >>> 0; // >>> 0 coerces to unsigned

      var numAddresses = Math.pow(2, variableBits);
      return {
        from: new _ipv4_address.default(fromAddress).toString(),
        to: new _ipv4_address.default(fromAddress + numAddresses - 1).toString()
      };
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.initialAddress.toString() + '/' + this.prefixLength;
    }
  }]);

  return CidrMask;
}();

exports.CidrMask = CidrMask;