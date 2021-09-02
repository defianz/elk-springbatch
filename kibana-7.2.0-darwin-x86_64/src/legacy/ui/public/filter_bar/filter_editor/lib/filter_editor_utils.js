"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIndexPatternFromFilter = getIndexPatternFromFilter;
exports.getFieldFromFilter = getFieldFromFilter;
exports.getOperatorFromFilter = getOperatorFromFilter;
exports.getQueryDslFromFilter = getQueryDslFromFilter;
exports.getFilterableFields = getFilterableFields;
exports.getOperatorOptions = getOperatorOptions;
exports.getFilterParams = getFilterParams;
exports.validateParams = validateParams;
exports.isFilterValid = isFilterValid;
exports.buildFilter = buildFilter;
exports.buildCustomFilter = buildCustomFilter;

var _datemath = _interopRequireDefault(require("@elastic/datemath"));

var _esQuery = require("@kbn/es-query");

var _lodash = require("lodash");

var _static_utils = require("ui/index_patterns/static_utils");

var _ipv4_address = _interopRequireDefault(require("ui/utils/ipv4_address"));

var _filter_operators = require("./filter_operators");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function getIndexPatternFromFilter(filter, indexPatterns) {
  return indexPatterns.find(function (indexPattern) {
    return indexPattern.id === filter.meta.index;
  });
}

function getFieldFromFilter(filter, indexPattern) {
  return indexPattern.fields.find(function (field) {
    return field.name === filter.meta.key;
  });
}

function getOperatorFromFilter(filter) {
  return _filter_operators.FILTER_OPERATORS.find(function (operator) {
    return filter.meta.type === operator.type && filter.meta.negate === operator.negate;
  });
}

function getQueryDslFromFilter(filter) {
  return (0, _lodash.omit)(filter, ['$state', 'meta']);
}

function getFilterableFields(indexPattern) {
  return indexPattern.fields.filter(_static_utils.isFilterable);
}

function getOperatorOptions(field) {
  return _filter_operators.FILTER_OPERATORS.filter(function (operator) {
    return !operator.fieldTypes || operator.fieldTypes.includes(field.type);
  });
}

function getFilterParams(filter) {
  switch (filter.meta.type) {
    case 'phrase':
      return filter.meta.params.query;

    case 'phrases':
      return filter.meta.params;

    case 'range':
      return {
        from: filter.meta.params.gte,
        to: filter.meta.params.lt
      };
  }
}

function validateParams(params, type) {
  switch (type) {
    case 'date':
      var moment = typeof params === 'string' ? _datemath.default.parse(params) : null;
      return Boolean(typeof params === 'string' && moment && moment.isValid());

    case 'ip':
      try {
        return Boolean(new _ipv4_address.default(params));
      } catch (e) {
        return false;
      }

    default:
      return true;
  }
}

function isFilterValid(indexPattern, field, operator, params) {
  if (!indexPattern || !field || !operator) {
    return false;
  }

  switch (operator.type) {
    case 'phrase':
      return validateParams(params, field.type);

    case 'phrases':
      if (!Array.isArray(params) || !params.length) {
        return false;
      }

      return params.every(function (phrase) {
        return validateParams(phrase, field.type);
      });

    case 'range':
      if (_typeof(params) !== 'object') {
        return false;
      }

      return validateParams(params.from, field.type) || validateParams(params.to, field.type);

    case 'exists':
      return true;

    default:
      throw new Error("Unknown operator type: ".concat(operator.type));
  }
}

function buildFilter(indexPattern, field, operator, params, alias, store) {
  var filter = buildBaseFilter(indexPattern, field, operator, params);
  filter.meta.alias = alias;
  filter.meta.negate = operator.negate;
  filter.$state = {
    store: store
  };
  return filter;
}

function buildBaseFilter(indexPattern, field, operator, params) {
  switch (operator.type) {
    case 'phrase':
      return (0, _esQuery.buildPhraseFilter)(field, params, indexPattern);

    case 'phrases':
      return (0, _esQuery.buildPhrasesFilter)(field, params, indexPattern);

    case 'range':
      var newParams = {
        gte: params.from,
        lt: params.to
      };
      return (0, _esQuery.buildRangeFilter)(field, newParams, indexPattern);

    case 'exists':
      return (0, _esQuery.buildExistsFilter)(field, indexPattern);

    default:
      throw new Error("Unknown operator type: ".concat(operator.type));
  }
}

function buildCustomFilter(index, queryDsl, disabled, negate, alias, store) {
  var meta = {
    index: index,
    type: 'custom',
    disabled: disabled,
    negate: negate,
    alias: alias
  };

  var filter = _objectSpread({}, queryDsl, {
    meta: meta
  });

  filter.$state = {
    store: store
  };
  return filter;
}