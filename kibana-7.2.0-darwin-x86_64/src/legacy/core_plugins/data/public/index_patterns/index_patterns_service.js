"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexPatternsService = void 0;

var _field = require("ui/index_patterns/_field.js");

var _field_list = require("ui/index_patterns/_field_list");

var _flatten_hit = require("ui/index_patterns/_flatten_hit");

var _get_computed_fields = require("ui/index_patterns/_get_computed_fields");

var _index_pattern = require("ui/index_patterns/_index_pattern");

var _fixtures = require("ui/index_patterns/fixtures");

var _index = require("ui/index_patterns/index");

var _load_default = _interopRequireDefault(require("ui/index_patterns/route_setup/load_default"));

var _static_utils = require("ui/index_patterns/static_utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Index Patterns Service
 *
 * The `setup` method of this service returns the public contract for
 * index patterns. Right now these APIs are simply imported from `ui/public`
 * and re-exported here. Once the index patterns code actually moves to
 * this plugin, the imports above can simply be updated to point to their
 * corresponding local directory.
 *
 * @internal
 */
var IndexPatternsService =
/*#__PURE__*/
function () {
  function IndexPatternsService() {
    _classCallCheck(this, IndexPatternsService);
  }

  _createClass(IndexPatternsService, [{
    key: "setup",
    value: function setup() {
      return {
        getRoutes: _index_pattern.getRoutes,
        IndexPatternProvider: _index_pattern.IndexPatternProvider,
        IndexPatternsApiClientProvider: _index.IndexPatternsApiClientProvider,
        IndexPatternsFlattenHitProvider: _flatten_hit.IndexPatternsFlattenHitProvider,
        IndexPatternsProvider: _index.IndexPatternsProvider,
        setupRouteWithDefaultPattern: _load_default.default,
        // only used in kibana/management
        validateIndexPattern: _index.validateIndexPattern,
        constants: {
          ILLEGAL_CHARACTERS: _index.ILLEGAL_CHARACTERS,
          CONTAINS_SPACES: _index.CONTAINS_SPACES,
          INDEX_PATTERN_ILLEGAL_CHARACTERS: _index.INDEX_PATTERN_ILLEGAL_CHARACTERS,
          INDEX_PATTERN_ILLEGAL_CHARACTERS_VISIBLE: _index.INDEX_PATTERN_ILLEGAL_CHARACTERS_VISIBLE
        },
        fields: {
          Field: _field.Field,
          FieldList: _field_list.FieldList,
          getComputedFields: _get_computed_fields.getComputedFields,
          getFromSavedObject: _static_utils.getFromSavedObject,
          isFilterable: _static_utils.isFilterable
        },
        fixtures: {
          mockFields: _fixtures.mockFields,
          mockIndexPattern: _fixtures.mockIndexPattern
        },
        ui: {
          IndexPatternSelect: _index.IndexPatternSelect
        }
      };
    }
  }, {
    key: "stop",
    value: function stop() {// nothing to do here yet
    }
  }]);

  return IndexPatternsService;
}();
/** @public */


exports.IndexPatternsService = IndexPatternsService;