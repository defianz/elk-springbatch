"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateBounds = calculateBounds;
exports.getTime = getTime;

var _datemath = _interopRequireDefault(require("@elastic/datemath"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function calculateBounds(timeRange) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return {
    min: _datemath.default.parse(timeRange.from, {
      forceNow: options.forceNow
    }),
    max: _datemath.default.parse(timeRange.to, {
      roundUp: true,
      forceNow: options.forceNow
    })
  };
}

function getTime(indexPattern, timeRange, forceNow) {
  if (!indexPattern) {
    // in CI, we sometimes seem to fail here.
    return;
  }

  var timefield = indexPattern.fields.find(function (field) {
    return field.name === indexPattern.timeFieldName;
  });

  if (!timefield) {
    return;
  }

  var bounds = calculateBounds(timeRange, {
    forceNow: forceNow
  });

  if (!bounds) {
    return;
  }

  var filter = {
    range: _defineProperty({}, timefield.name, {
      format: 'strict_date_optional_time'
    })
  };

  if (bounds.min) {
    filter.range[timefield.name].gte = bounds.min.toISOString();
  }

  if (bounds.max) {
    filter.range[timefield.name].lte = bounds.max.toISOString();
  }

  return filter;
}