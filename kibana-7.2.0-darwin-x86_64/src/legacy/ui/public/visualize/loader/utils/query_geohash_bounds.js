"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryGeohashBounds = queryGeohashBounds;

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _notify = require("ui/notify");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Coordinate map visualization needs to be able to query for the latest geohash
 * bounds when a user clicks the "fit to data" map icon, which requires knowing
 * about global filters & queries. This logic has been extracted here so we can
 * keep `searchSource` out of the vis, but ultimately we need to design a
 * long-term solution for situations like this.
 *
 * TODO: Remove this as a part of elastic/kibana#30593
 */
function queryGeohashBounds(_x, _x2) {
  return _queryGeohashBounds.apply(this, arguments);
}

function _queryGeohashBounds() {
  _queryGeohashBounds = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(vis, params) {
    var agg, searchSource, _filters, _query, esResp;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            agg = vis.getAggConfig().find(function (a) {
              return (0, _lodash.get)(a, 'type.dslName') === 'geohash_grid';
            });

            if (!agg) {
              _context.next = 19;
              break;
            }

            searchSource = vis.searchSource.createChild();
            searchSource.setField('size', 0);
            searchSource.setField('aggs', function () {
              var geoBoundsAgg = vis.getAggConfig().createAggConfig({
                type: 'geo_bounds',
                enabled: true,
                params: {
                  field: agg.getField()
                },
                schema: 'metric'
              }, {
                addToAggConfigs: false
              });
              return {
                '1': geoBoundsAgg.toDsl()
              };
            });
            _filters = params.filters, _query = params.query;

            if (_filters) {
              searchSource.setField('filter', function () {
                var activeFilters = _toConsumableArray(_filters);

                var indexPattern = agg.getIndexPattern();
                var useTimeFilter = !!indexPattern.timeFieldName;

                if (useTimeFilter) {
                  activeFilters.push(vis.API.timeFilter.createFilter(indexPattern));
                }

                return activeFilters;
              });
            }

            if (_query) {
              searchSource.setField('query', _query);
            }

            _context.prev = 8;
            _context.next = 11;
            return searchSource.fetch();

          case 11:
            esResp = _context.sent;
            return _context.abrupt("return", (0, _lodash.get)(esResp, 'aggregations.1.bounds'));

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](8);

            _notify.toastNotifications.addDanger({
              title: _i18n.i18n.translate('common.ui.visualize.queryGeohashBounds.unableToGetBoundErrorTitle', {
                defaultMessage: 'Unable to get bounds'
              }),
              text: "".concat(_context.t0.message)
            });

            return _context.abrupt("return");

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[8, 15]]);
  }));
  return _queryGeohashBounds.apply(this, arguments);
}