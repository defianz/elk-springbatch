"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimpleSavedObject = void 0;

var _lodash = require("lodash");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class is a very simple wrapper for SavedObjects loaded from the server.
 *
 * It provides basic functionality for updating/deleting/etc. saved objects but
 * doesn't include any type-specific implementations.
 *
 * For more sophisiticated use cases, the SavedObject class implements additional functions
 */
var SimpleSavedObject =
/*#__PURE__*/
function () {
  // We want to use the same interface this class had in JS
  // eslint-disable-next-line variable-name
  function SimpleSavedObject(client, _ref) {
    var id = _ref.id,
        type = _ref.type,
        version = _ref.version,
        attributes = _ref.attributes,
        error = _ref.error,
        references = _ref.references,
        migrationVersion = _ref.migrationVersion;

    _classCallCheck(this, SimpleSavedObject);

    this.client = client;

    _defineProperty(this, "attributes", void 0);

    _defineProperty(this, "_version", void 0);

    _defineProperty(this, "id", void 0);

    _defineProperty(this, "type", void 0);

    _defineProperty(this, "migrationVersion", void 0);

    _defineProperty(this, "error", void 0);

    _defineProperty(this, "references", void 0);

    this.id = id;
    this.type = type;
    this.attributes = attributes || {};
    this.references = references || [];
    this._version = version;
    this.migrationVersion = migrationVersion;

    if (error) {
      this.error = error;
    }
  }

  _createClass(SimpleSavedObject, [{
    key: "get",
    value: function get(key) {
      return (0, _lodash.get)(this.attributes, key);
    }
  }, {
    key: "set",
    value: function set(key, value) {
      return (0, _lodash.set)(this.attributes, key, value);
    }
  }, {
    key: "has",
    value: function has(key) {
      return (0, _lodash.has)(this.attributes, key);
    }
  }, {
    key: "save",
    value: function save() {
      if (this.id) {
        return this.client.update(this.type, this.id, this.attributes, {
          migrationVersion: this.migrationVersion,
          references: this.references
        });
      } else {
        return this.client.create(this.type, this.attributes, {
          migrationVersion: this.migrationVersion,
          references: this.references
        });
      }
    }
  }, {
    key: "delete",
    value: function _delete() {
      return this.client.delete(this.type, this.id);
    }
  }]);

  return SimpleSavedObject;
}();

exports.SimpleSavedObject = SimpleSavedObject;