"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildPipeline = exports.getVisParams = exports.buildVislibDimensions = exports.buildPipelineVisFunction = exports.escapeString = exports.prepareString = exports.prepareJson = exports.getSchemas = void 0;

var _lodash = require("lodash");

var _date_histogram = require("ui/agg_types/buckets/date_histogram");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var vislibCharts = ['area', 'gauge', 'goal', 'heatmap', 'histogram', 'horizontal_bar', 'line'];

var getSchemas = function getSchemas(vis, timeRange) {
  var createFormat = function createFormat(agg) {
    var format = agg.params.field ? agg.params.field.format.toJSON() : {};
    var formats = {
      date_range: function date_range() {
        return {
          id: 'string'
        };
      },
      percentile_ranks: function percentile_ranks() {
        return {
          id: 'percent'
        };
      },
      count: function count() {
        return {
          id: 'number'
        };
      },
      cardinality: function cardinality() {
        return {
          id: 'number'
        };
      },
      date_histogram: function date_histogram() {
        return {
          id: 'date',
          params: {
            pattern: agg.buckets.getScaledDateFormat()
          }
        };
      },
      terms: function terms() {
        return {
          id: 'terms',
          params: _objectSpread({
            id: format.id,
            otherBucketLabel: agg.params.otherBucketLabel,
            missingBucketLabel: agg.params.missingBucketLabel
          }, format.params)
        };
      },
      range: function range() {
        return {
          id: 'range',
          params: _objectSpread({
            id: format.id
          }, format.params)
        };
      }
    };
    return formats[agg.type.name] ? formats[agg.type.name]() : format;
  };

  var createSchemaConfig = function createSchemaConfig(accessor, agg) {
    if (agg.type.name === 'date_histogram') {
      agg.params.timeRange = timeRange;
      (0, _date_histogram.setBounds)(agg, true);
    }

    var hasSubAgg = ['derivative', 'moving_avg', 'serial_diff', 'cumulative_sum', 'sum_bucket', 'avg_bucket', 'min_bucket', 'max_bucket'].includes(agg.type.name);
    var format = createFormat(hasSubAgg ? agg.params.customMetric || agg.aggConfigs.byId[agg.params.metricAgg] : agg);
    var params = {};

    if (agg.type.name === 'geohash_grid') {
      params.precision = agg.params.precision;
      params.useGeocentroid = agg.params.useGeocentroid;
    }

    return {
      accessor: accessor,
      format: format,
      params: params,
      aggType: agg.type.name
    };
  };

  var cnt = 0;
  var schemas = {
    metric: []
  };
  var responseAggs = vis.aggs.getResponseAggs().filter(function (agg) {
    return agg.enabled;
  });
  var isHierarchical = vis.isHierarchical();
  var metrics = responseAggs.filter(function (agg) {
    return agg.type.type === 'metrics';
  });
  responseAggs.forEach(function (agg) {
    if (!agg.enabled) {
      cnt++;
      return;
    }

    var skipMetrics = false;
    var schemaName = agg.schema ? agg.schema.name || agg.schema : null;

    if (_typeof(schemaName) === 'object') {
      schemaName = null;
    }

    if (!schemaName) {
      if (agg.type.name === 'geo_centroid') {
        schemaName = 'geo_centroid';
      } else {
        cnt++;
        return;
      }
    }

    if (schemaName === 'split') {
      schemaName = "split_".concat(agg.params.row ? 'row' : 'column');
      skipMetrics = responseAggs.length - metrics.length > 1;
    }

    if (!schemas[schemaName]) {
      schemas[schemaName] = [];
    }

    if (!isHierarchical || agg.type.type !== 'metrics') {
      schemas[schemaName].push(createSchemaConfig(cnt++, agg));
    }

    if (isHierarchical && (agg.type.type !== 'metrics' || metrics.length === responseAggs.length)) {
      metrics.forEach(function (metric) {
        var schemaConfig = createSchemaConfig(cnt++, metric);

        if (!skipMetrics) {
          schemas.metric.push(schemaConfig);
        }
      });
    }
  });
  return schemas;
};

exports.getSchemas = getSchemas;

var prepareJson = function prepareJson(variable, data) {
  return "".concat(variable, "='").concat(JSON.stringify(data).replace(/\\/g, "\\\\").replace(/'/g, "\\'"), "' ");
};

exports.prepareJson = prepareJson;

var prepareString = function prepareString(variable, data) {
  return "".concat(variable, "='").concat(escapeString(data), "' ");
};

exports.prepareString = prepareString;

var escapeString = function escapeString(data) {
  return data.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
};

exports.escapeString = escapeString;
var buildPipelineVisFunction = {
  vega: function vega(visState) {
    return "vega ".concat(prepareString('spec', visState.params.spec));
  },
  input_control_vis: function input_control_vis(visState) {
    return "input_control_vis ".concat(prepareJson('visConfig', visState.params));
  },
  metrics: function metrics(visState, schemas) {
    var uiState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var paramsJson = prepareJson('params', visState.params);
    var uiStateJson = prepareJson('uiState', uiState);
    return "tsvb ".concat(paramsJson, " ").concat(uiStateJson);
  },
  timelion: function timelion(visState) {
    var expression = prepareString('expression', visState.params.expression);
    var interval = prepareString('interval', visState.params.interval);
    return "timelion_vis ".concat(expression).concat(interval);
  },
  markdown: function markdown(visState) {
    var _visState$params = visState.params,
        markdown = _visState$params.markdown,
        fontSize = _visState$params.fontSize,
        openLinksInNewTab = _visState$params.openLinksInNewTab;
    var escapedMarkdown = escapeString(markdown);
    var expr = "markdownvis '".concat(escapedMarkdown, "' ");

    if (fontSize) {
      expr += " fontSize=".concat(fontSize, " ");
    }

    if (openLinksInNewTab) {
      expr += "openLinksInNewTab=".concat(openLinksInNewTab, " ");
    }

    return expr;
  },
  table: function table(visState, schemas) {
    var visConfig = _objectSpread({}, visState.params, buildVisConfig.table(schemas, visState.params));

    return "kibana_table ".concat(prepareJson('visConfig', visConfig));
  },
  metric: function metric(visState, schemas) {
    var visConfig = _objectSpread({}, visState.params, buildVisConfig.metric(schemas));

    return "kibana_metric ".concat(prepareJson('visConfig', visConfig));
  },
  tagcloud: function tagcloud(visState, schemas) {
    var _visState$params2 = visState.params,
        scale = _visState$params2.scale,
        orientation = _visState$params2.orientation,
        minFontSize = _visState$params2.minFontSize,
        maxFontSize = _visState$params2.maxFontSize,
        showLabel = _visState$params2.showLabel;

    var _buildVisConfig$tagcl = buildVisConfig.tagcloud(schemas),
        metric = _buildVisConfig$tagcl.metric,
        bucket = _buildVisConfig$tagcl.bucket;

    var expr = "tagcloud metric={visdimension ".concat(metric.accessor, "} ");

    if (scale) {
      expr += "scale='".concat(scale, "' ");
    }

    if (orientation) {
      expr += "orientation='".concat(orientation, "' ");
    }

    if (minFontSize) {
      expr += "minFontSize=".concat(minFontSize, " ");
    }

    if (maxFontSize) {
      expr += "maxFontSize=".concat(maxFontSize, " ");
    }

    if (showLabel) {
      expr += "showLabel=".concat(showLabel, " ");
    }

    if (bucket) {
      expr += " bucket={visdimension ".concat(bucket.accessor, " ");

      if (bucket.format) {
        expr += "format=".concat(bucket.format.id, " ");
        expr += prepareJson('formatParams', bucket.format.params);
      }

      expr += '} ';
    }

    return expr;
  },
  region_map: function region_map(visState, schemas) {
    var visConfig = _objectSpread({}, visState.params, buildVisConfig.region_map(schemas));

    return "regionmap ".concat(prepareJson('visConfig', visConfig));
  },
  tile_map: function tile_map(visState, schemas) {
    var visConfig = _objectSpread({}, visState.params, buildVisConfig.tile_map(schemas));

    return "tilemap ".concat(prepareJson('visConfig', visConfig));
  },
  pie: function pie(visState, schemas) {
    var visConfig = _objectSpread({}, visState.params, buildVisConfig.pie(schemas));

    return "kibana_pie ".concat(prepareJson('visConfig', visConfig));
  }
};
exports.buildPipelineVisFunction = buildPipelineVisFunction;
var buildVisConfig = {
  table: function table(schemas) {
    var visParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var visConfig = {};
    var metrics = schemas.metric;
    var buckets = schemas.bucket || [];
    visConfig.dimensions = {
      metrics: metrics,
      buckets: buckets,
      splitRow: schemas.split_row,
      splitColumn: schemas.split_column
    };

    if (visParams.showMetricsAtAllLevels === false && visParams.showPartialRows === true) {
      // Handle case where user wants to see partial rows but not metrics at all levels.
      // This requires calculating how many metrics will come back in the tabified response,
      // and removing all metrics from the dimensions except the last set.
      var metricsPerBucket = metrics.length / buckets.length;
      visConfig.dimensions.metrics.splice(0, metricsPerBucket * buckets.length - metricsPerBucket);
    }

    return visConfig;
  },
  metric: function metric(schemas) {
    var visConfig = {
      dimensions: {}
    };
    visConfig.dimensions.metrics = schemas.metric;

    if (schemas.group) {
      visConfig.dimensions.bucket = schemas.group[0];
    }

    return visConfig;
  },
  tagcloud: function tagcloud(schemas) {
    var visConfig = {};
    visConfig.metric = schemas.metric[0];

    if (schemas.segment) {
      visConfig.bucket = schemas.segment[0];
    }

    return visConfig;
  },
  region_map: function region_map(schemas) {
    var visConfig = {};
    visConfig.metric = schemas.metric[0];

    if (schemas.segment) {
      visConfig.bucket = schemas.segment[0];
    }

    return visConfig;
  },
  tile_map: function tile_map(schemas) {
    var visConfig = {};
    visConfig.dimensions = {
      metric: schemas.metric[0],
      geohash: schemas.segment ? schemas.segment[0] : null,
      geocentroid: schemas.geo_centroid ? schemas.geo_centroid[0] : null
    };
    return visConfig;
  },
  pie: function pie(schemas) {
    var visConfig = {};
    visConfig.dimensions = {
      metric: schemas.metric[0],
      buckets: schemas.segment,
      splitRow: schemas.split_row,
      splitColumn: schemas.split_column
    };
    return visConfig;
  }
};

var buildVislibDimensions =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(vis, params) {
    var schemas, dimensions, xAgg, _xAgg$buckets$getInte, esUnit, esValue, intervalParam, output;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            schemas = getSchemas(vis, params.timeRange);
            dimensions = {
              x: schemas.segment ? schemas.segment[0] : null,
              y: schemas.metric,
              z: schemas.radius,
              width: schemas.width,
              series: schemas.group,
              splitRow: schemas.split_row,
              splitColumn: schemas.split_column
            };

            if (!schemas.segment) {
              _context.next = 19;
              break;
            }

            xAgg = vis.aggs.getResponseAggs()[dimensions.x.accessor];

            if (!(xAgg.type.name === 'date_histogram')) {
              _context.next = 12;
              break;
            }

            dimensions.x.params.date = true;
            _xAgg$buckets$getInte = xAgg.buckets.getInterval(), esUnit = _xAgg$buckets$getInte.esUnit, esValue = _xAgg$buckets$getInte.esValue;
            dimensions.x.params.interval = _moment.default.duration(esValue, esUnit);
            dimensions.x.params.format = xAgg.buckets.getScaledDateFormat();
            dimensions.x.params.bounds = xAgg.buckets.getBounds();
            _context.next = 19;
            break;

          case 12:
            if (!(xAgg.type.name === 'histogram')) {
              _context.next = 19;
              break;
            }

            intervalParam = xAgg.type.params.byName.interval;
            output = {
              params: {}
            };
            _context.next = 17;
            return intervalParam.modifyAggConfigOnSearchRequestStart(xAgg, params.searchSource);

          case 17:
            intervalParam.write(xAgg, output);
            dimensions.x.params.interval = output.params.interval;

          case 19:
            return _context.abrupt("return", dimensions);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function buildVislibDimensions(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // If not using the expression pipeline (i.e. visualize_data_loader), we need a mechanism to
// take a Vis object and decorate it with the necessary params (dimensions, bucket, metric, etc)


exports.buildVislibDimensions = buildVislibDimensions;

var getVisParams =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(vis, params) {
    var schemas, visConfig;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            schemas = getSchemas(vis, params.timeRange);
            visConfig = (0, _lodash.cloneDeep)(vis.params);

            if (!buildVisConfig[vis.type.name]) {
              _context2.next = 6;
              break;
            }

            visConfig = _objectSpread({}, visConfig, buildVisConfig[vis.type.name](schemas, visConfig));
            _context2.next = 10;
            break;

          case 6:
            if (!vislibCharts.includes(vis.type.name)) {
              _context2.next = 10;
              break;
            }

            _context2.next = 9;
            return buildVislibDimensions(vis, params);

          case 9:
            visConfig.dimensions = _context2.sent;

          case 10:
            return _context2.abrupt("return", visConfig);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getVisParams(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getVisParams = getVisParams;

var buildPipeline =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(vis, params) {
    var searchSource, indexPattern, query, filters, visState, uiState, pipeline, schemas, visConfig;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            searchSource = params.searchSource;
            indexPattern = vis.indexPattern;
            query = searchSource.getField('query');
            filters = searchSource.getField('filter');
            visState = vis.getCurrentState();
            uiState = vis.getUiState(); // context

            pipeline = "kibana | kibana_context ";

            if (query) {
              pipeline += prepareJson('query', query);
            }

            if (filters) {
              pipeline += prepareJson('filters', filters);
            }

            if (vis.savedSearchId) {
              pipeline += prepareString('savedSearchId', vis.savedSearchId);
            }

            pipeline += '| '; // request handler

            if (vis.type.requestHandler === 'courier') {
              pipeline += "esaggs\n    ".concat(prepareString('index', indexPattern.id), "\n    metricsAtAllLevels=").concat(vis.isHierarchical(), "\n    partialRows=").concat(vis.type.requiresPartialRows || vis.params.showPartialRows || false, "\n    ").concat(prepareJson('aggConfigs', visState.aggs), " | ");
            }

            schemas = getSchemas(vis, params.timeRange);

            if (!buildPipelineVisFunction[vis.type.name]) {
              _context3.next = 17;
              break;
            }

            pipeline += buildPipelineVisFunction[vis.type.name](visState, schemas, uiState);
            _context3.next = 27;
            break;

          case 17:
            if (!vislibCharts.includes(vis.type.name)) {
              _context3.next = 25;
              break;
            }

            visConfig = visState.params;
            _context3.next = 21;
            return buildVislibDimensions(vis, params);

          case 21:
            visConfig.dimensions = _context3.sent;
            pipeline += "vislib ".concat(prepareJson('visConfig', visState.params));
            _context3.next = 27;
            break;

          case 25:
            pipeline += "visualization type='".concat(vis.type.name, "'\n    ").concat(prepareJson('visConfig', visState.params), "\n    metricsAtAllLevels=").concat(vis.isHierarchical(), "\n    partialRows=").concat(vis.type.requiresPartialRows || vis.params.showPartialRows || false, " ");

            if (indexPattern) {
              pipeline += "".concat(prepareString('index', indexPattern.id));
            }

          case 27:
            return _context3.abrupt("return", pipeline);

          case 28:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function buildPipeline(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.buildPipeline = buildPipeline;