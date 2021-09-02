"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseObject = void 0;

var _angular = _interopRequireDefault(require("angular"));

var _lodash = _interopRequireDefault(require("lodash"));

var _risonNode = _interopRequireDefault(require("rison-node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BaseObject =
/*#__PURE__*/
function () {
  // Set the attributes or default to an empty object
  function BaseObject() {
    var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, BaseObject);

    // Set the attributes or default to an empty object
    _lodash.default.assign(this, attributes);
  }

  _createClass(BaseObject, [{
    key: "toObject",
    value: function toObject() {
      // return just the data.
      return _lodash.default.omit(this, function (value, key) {
        return key.charAt(0) === '$' || key.charAt(0) === '_' || _lodash.default.isFunction(value);
      });
    }
  }, {
    key: "toRISON",
    value: function toRISON() {
      // Use Angular to remove the private vars, and JSON.stringify to serialize
      return _risonNode.default.encode(JSON.parse(_angular.default.toJson(this)));
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.toObject();
    }
  }]);

  return BaseObject;
}();

exports.BaseObject = BaseObject;