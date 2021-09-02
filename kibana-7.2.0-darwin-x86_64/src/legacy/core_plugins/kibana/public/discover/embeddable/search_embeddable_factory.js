"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchEmbeddableFactory = void 0;

require("../doc_table");

var _capabilities = require("ui/capabilities");

var _i18n = require("@kbn/i18n");

var _embeddable = require("ui/embeddable");

var _search_embeddable = require("./search_embeddable");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var SearchEmbeddableFactory =
/*#__PURE__*/
function (_EmbeddableFactory) {
  _inherits(SearchEmbeddableFactory, _EmbeddableFactory);

  function SearchEmbeddableFactory($compile, $rootScope, searchLoader) {
    var _this;

    _classCallCheck(this, SearchEmbeddableFactory);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SearchEmbeddableFactory).call(this, {
      name: 'search',
      savedObjectMetaData: {
        name: _i18n.i18n.translate('kbn.discover.savedSearch.savedObjectName', {
          defaultMessage: 'Saved search'
        }),
        type: 'search',
        getIconForSavedObject: function getIconForSavedObject() {
          return 'search';
        }
      }
    }));
    _this.$compile = $compile;
    _this.$rootScope = $rootScope;
    _this.searchLoader = searchLoader;
    return _this;
  }

  _createClass(SearchEmbeddableFactory, [{
    key: "getEditPath",
    value: function getEditPath(panelId) {
      return this.searchLoader.urlFor(panelId);
    }
    /**
     *
     * @param {Object} panelMetadata. Currently just passing in panelState but it's more than we need, so we should
     * decouple this to only include data given to us from the embeddable when it's added to the dashboard. Generally
     * will be just the object id, but could be anything depending on the plugin.
     * @param onEmbeddableStateChanged
     * @return {Promise.<Embeddable>}
     */

  }, {
    key: "create",
    value: function create(_ref, onEmbeddableStateChanged) {
      var _this2 = this;

      var id = _ref.id;
      var editUrl = this.getEditPath(id);

      var editable = _capabilities.capabilities.get().discover.save; // can't change this to be async / awayt, because an Anglular promise is expected to be returned.


      return this.searchLoader.get(id).then(function (savedObject) {
        return new _search_embeddable.SearchEmbeddable({
          onEmbeddableStateChanged: onEmbeddableStateChanged,
          savedSearch: savedObject,
          editUrl: editUrl,
          editable: editable,
          $rootScope: _this2.$rootScope,
          $compile: _this2.$compile
        });
      });
    }
  }]);

  return SearchEmbeddableFactory;
}(_embeddable.EmbeddableFactory);

exports.SearchEmbeddableFactory = SearchEmbeddableFactory;