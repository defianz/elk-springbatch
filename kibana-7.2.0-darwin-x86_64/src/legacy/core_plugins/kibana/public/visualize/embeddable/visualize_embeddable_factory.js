"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisualizeEmbeddableFactory = void 0;

var _i18n = require("@kbn/i18n");

var _chrome = _interopRequireDefault(require("ui/chrome"));

var _embeddable = require("ui/embeddable");

var _loader = require("ui/visualize/loader");

var _capabilities = require("ui/capabilities");

var _visualize_embeddable = require("./visualize_embeddable");

var _disabled_lab_embeddable = require("./disabled_lab_embeddable");

var _get_index_pattern = require("./get_index_pattern");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VisualizeEmbeddableFactory =
/*#__PURE__*/
function (_EmbeddableFactory) {
  _inherits(VisualizeEmbeddableFactory, _EmbeddableFactory);

  function VisualizeEmbeddableFactory(savedVisualizations, config, visTypes) {
    var _this;

    _classCallCheck(this, VisualizeEmbeddableFactory);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VisualizeEmbeddableFactory).call(this, {
      name: 'visualization',
      savedObjectMetaData: {
        name: _i18n.i18n.translate('kbn.visualize.savedObjectName', {
          defaultMessage: 'Visualization'
        }),
        type: 'visualization',
        getIconForSavedObject: function getIconForSavedObject(savedObject) {
          return visTypes.byName[JSON.parse(savedObject.attributes.visState).type].icon || 'visualizeApp';
        },
        getTooltipForSavedObject: function getTooltipForSavedObject(savedObject) {
          var visType = visTypes.byName[JSON.parse(savedObject.attributes.visState).type].title;
          return "".concat(savedObject.attributes.title, " (").concat(visType, ")");
        },
        showSavedObject: function showSavedObject(savedObject) {
          if (_chrome.default.getUiSettingsClient().get('visualize:enableLabs')) {
            return true;
          }

          var typeName = JSON.parse(savedObject.attributes.visState).type;
          var visType = visTypes.byName[typeName];
          return visType.stage !== 'experimental';
        }
      }
    }));

    _defineProperty(_assertThisInitialized(_this), "savedVisualizations", void 0);

    _defineProperty(_assertThisInitialized(_this), "config", void 0);

    _this.config = config;
    _this.savedVisualizations = savedVisualizations;
    return _this;
  }

  _createClass(VisualizeEmbeddableFactory, [{
    key: "getEditPath",
    value: function getEditPath(panelId) {
      return this.savedVisualizations.urlFor(panelId);
    }
    /**
     *
     * @param {Object} panelMetadata. Currently just passing in panelState but it's more than we need, so we should
     * decouple this to only include data given to us from the embeddable when it's added to the dashboard. Generally
     * will be just the object id, but could be anything depending on the plugin.
     * @param {function} onEmbeddableStateChanged
     * @return {Promise.<{ metadata, onContainerStateChanged, render, destroy }>}
     */

  }, {
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(panelMetadata, onEmbeddableStateChanged) {
        var visId, editUrl, editable, loader, savedObject, isLabsEnabled, indexPattern, indexPatterns;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                visId = panelMetadata.id;
                editUrl = this.getEditPath(visId);
                editable = _capabilities.capabilities.get().visualize.save;
                _context.next = 5;
                return (0, _loader.getVisualizeLoader)();

              case 5:
                loader = _context.sent;
                _context.next = 8;
                return this.savedVisualizations.get(visId);

              case 8:
                savedObject = _context.sent;
                isLabsEnabled = this.config.get('visualize:enableLabs');

                if (!(!isLabsEnabled && savedObject.vis.type.stage === 'experimental')) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt("return", new _disabled_lab_embeddable.DisabledLabEmbeddable(savedObject.title));

              case 12:
                _context.next = 14;
                return (0, _get_index_pattern.getIndexPattern)(savedObject);

              case 14:
                indexPattern = _context.sent;
                indexPatterns = indexPattern ? [indexPattern] : [];
                return _context.abrupt("return", new _visualize_embeddable.VisualizeEmbeddable({
                  onEmbeddableStateChanged: onEmbeddableStateChanged,
                  savedVisualization: savedObject,
                  editUrl: editUrl,
                  editable: editable,
                  loader: loader,
                  indexPatterns: indexPatterns
                }));

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function create(_x, _x2) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }]);

  return VisualizeEmbeddableFactory;
}(_embeddable.EmbeddableFactory);

exports.VisualizeEmbeddableFactory = VisualizeEmbeddableFactory;