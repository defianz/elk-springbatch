"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SavedObjectsClient = void 0;

var _lodash = require("lodash");

var _url = require("url");

var _error_auto_create_index = require("../error_auto_create_index");

var _kfetch = require("../kfetch");

var _case_conversion = require("../utils/case_conversion");

var _simple_saved_object = require("./simple_saved_object");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var join = function join() {
  for (var _len = arguments.length, uriComponents = new Array(_len), _key = 0; _key < _len; _key++) {
    uriComponents[_key] = arguments[_key];
  }

  return uriComponents.filter(function (comp) {
    return Boolean(comp);
  }).map(encodeURIComponent).join('/');
};
/**
 * Interval that requests are batched for
 * @type {integer}
 */


var BATCH_INTERVAL = 100;
var API_BASE_URL = '/api/saved_objects/';
/**
 * The SavedObjectsClient class acts as a generic data fetcher
 * and data saver for saved objects regardless of type.
 *
 * If possible, this class should be used to load saved objects
 * instead of the SavedObjectLoader class which implements some
 * additional functionality.
 */

var SavedObjectsClient =
/*#__PURE__*/
function () {
  /**
   * Throttled processing of get requests into bulk requests at 100ms interval
   */
  function SavedObjectsClient() {
    var _this = this;

    _classCallCheck(this, SavedObjectsClient);

    _defineProperty(this, "processBatchQueue", (0, _lodash.throttle)(function () {
      var queue = (0, _lodash.cloneDeep)(_this.batchQueue);
      _this.batchQueue = [];

      _this.bulkGet(queue).then(function (_ref) {
        var savedObjects = _ref.savedObjects;
        queue.forEach(function (queueItem) {
          var foundObject = savedObjects.find(function (savedObject) {
            return savedObject.id === queueItem.id && savedObject.type === queueItem.type;
          });

          if (!foundObject) {
            return queueItem.resolve(_this.createSavedObject((0, _lodash.pick)(queueItem, ['id', 'type'])));
          }

          queueItem.resolve(foundObject);
        });
      }).catch(function (err) {
        queue.forEach(function (queueItem) {
          queueItem.reject(err);
        });
      });
    }, BATCH_INTERVAL, {
      leading: false
    }));

    _defineProperty(this, "batchQueue", void 0);

    _defineProperty(this, "create", function (type, attributes) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (!type || !attributes) {
        return Promise.reject(new Error('requires type and attributes'));
      }

      var path = _this.getPath([type, options.id]);

      var query = {
        overwrite: options.overwrite
      };

      var createRequest = _this.request({
        method: 'POST',
        path: path,
        query: query,
        body: {
          attributes: attributes,
          migrationVersion: options.migrationVersion,
          references: options.references
        }
      });

      return createRequest.then(function (resp) {
        return _this.createSavedObject(resp);
      }).catch(function (error) {
        if ((0, _error_auto_create_index.isAutoCreateIndexError)(error)) {
          (0, _error_auto_create_index.showAutoCreateIndexErrorPage)();
        }

        throw error;
      });
    });

    _defineProperty(this, "bulkCreate", function () {
      var objects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var path = _this.getPath(['_bulk_create']);

      var query = (0, _lodash.pick)(options, ['overwrite']);

      var request = _this.request({
        method: 'POST',
        path: path,
        query: query,
        body: objects
      });

      return request.then(function (resp) {
        resp.saved_objects = resp.saved_objects.map(function (d) {
          return _this.createSavedObject(d);
        });
        return (0, _case_conversion.keysToCamelCaseShallow)(resp);
      });
    });

    _defineProperty(this, "delete", function (type, id) {
      if (!type || !id) {
        return Promise.reject(new Error('requires type and id'));
      }

      return _this.request({
        method: 'DELETE',
        path: _this.getPath([type, id])
      });
    });

    _defineProperty(this, "find", function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var path = _this.getPath(['_find']);

      var query = (0, _case_conversion.keysToSnakeCaseShallow)(options);

      var request = _this.request({
        method: 'GET',
        path: path,
        query: query
      });

      return request.then(function (resp) {
        resp.saved_objects = resp.saved_objects.map(function (d) {
          return _this.createSavedObject(d);
        });
        return (0, _case_conversion.keysToCamelCaseShallow)(resp);
      });
    });

    _defineProperty(this, "get", function (type, id) {
      if (!type || !id) {
        return Promise.reject(new Error('requires type and id'));
      }

      return new Promise(function (resolve, reject) {
        _this.batchQueue.push({
          type: type,
          id: id,
          resolve: resolve,
          reject: reject
        });

        _this.processBatchQueue();
      });
    });

    _defineProperty(this, "bulkGet", function () {
      var objects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var path = _this.getPath(['_bulk_get']);

      var filteredObjects = objects.map(function (obj) {
        return (0, _lodash.pick)(obj, ['id', 'type']);
      });

      var request = _this.request({
        method: 'POST',
        path: path,
        body: filteredObjects
      });

      return request.then(function (resp) {
        resp.saved_objects = resp.saved_objects.map(function (d) {
          return _this.createSavedObject(d);
        });
        return (0, _case_conversion.keysToCamelCaseShallow)(resp);
      });
    });

    this.batchQueue = [];
  }
  /**
   * Persists an object
   *
   * @param {string} type
   * @param {object} [attributes={}]
   * @param {object} [options={}]
   * @property {string} [options.id] - force id on creation, not recommended
   * @property {boolean} [options.overwrite=false]
   * @property {object} [options.migrationVersion]
   * @returns
   */


  _createClass(SavedObjectsClient, [{
    key: "update",

    /**
     * Updates an object
     *
     * @param {string} type
     * @param {string} id
     * @param {object} attributes
     * @param {object} options
     * @prop {integer} options.version - ensures version matches that of persisted object
     * @prop {object} options.migrationVersion - The optional migrationVersion of this document
     * @returns
     */
    value: function update(type, id, attributes) {
      var _this2 = this;

      var _ref2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
          version = _ref2.version,
          migrationVersion = _ref2.migrationVersion,
          references = _ref2.references;

      if (!type || !id || !attributes) {
        return Promise.reject(new Error('requires type, id and attributes'));
      }

      var path = this.getPath([type, id]);
      var body = {
        attributes: attributes,
        migrationVersion: migrationVersion,
        references: references,
        version: version
      };
      var request = this.request({
        method: 'PUT',
        path: path,
        body: body
      });
      return request.then(function (resp) {
        return _this2.createSavedObject(resp);
      });
    }
  }, {
    key: "createSavedObject",
    value: function createSavedObject(options) {
      return new _simple_saved_object.SimpleSavedObject(this, options);
    }
  }, {
    key: "getPath",
    value: function getPath(path) {
      return (0, _url.resolve)(API_BASE_URL, join.apply(void 0, _toConsumableArray(path)));
    }
  }, {
    key: "request",
    value: function request(_ref3) {
      var method = _ref3.method,
          path = _ref3.path,
          query = _ref3.query,
          body = _ref3.body;

      if (method === 'GET' && body) {
        return Promise.reject(new Error('body not permitted for GET requests'));
      }

      return (0, _kfetch.kfetch)({
        method: method,
        pathname: path,
        query: query,
        body: JSON.stringify(body)
      });
    }
  }]);

  return SavedObjectsClient;
}();

exports.SavedObjectsClient = SavedObjectsClient;