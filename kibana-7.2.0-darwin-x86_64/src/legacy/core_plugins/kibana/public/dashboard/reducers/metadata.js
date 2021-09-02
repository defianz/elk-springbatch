"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.metadataReducer = void 0;

var _actions = require("../actions");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var updateTitle = function updateTitle(metadata, title) {
  return _objectSpread({}, metadata, {
    title: title
  });
};

var updateDescription = function updateDescription(metadata, description) {
  return _objectSpread({}, metadata, {
    description: description
  });
};

var metadataReducer = function metadataReducer() {
  var metadata = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    description: '',
    title: ''
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actions.MetadataActionTypeKeys.UPDATE_TITLE:
      return updateTitle(metadata, action.payload);

    case _actions.MetadataActionTypeKeys.UPDATE_DESCRIPTION:
      return updateDescription(metadata, action.payload);

    default:
      return metadata;
  }
};

exports.metadataReducer = metadataReducer;