"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "SavedObjectsRepository", {
  enumerable: true,
  get: function () {
    return _repository.SavedObjectsRepository;
  }
});
Object.defineProperty(exports, "ScopedSavedObjectsClientProvider", {
  enumerable: true,
  get: function () {
    return _scoped_client_provider.ScopedSavedObjectsClientProvider;
  }
});
exports.errors = void 0;

var _repository = require("./repository");

var _scoped_client_provider = require("./scoped_client_provider");

var errors = _interopRequireWildcard(require("./errors"));

exports.errors = errors;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }